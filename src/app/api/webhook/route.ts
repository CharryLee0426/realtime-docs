import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error) {
        return new NextResponse(`Internal Error: ${error}`, { status: 500 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    // If the event is checkout.session.completed, create a subscription
    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        if (!session?.metadata?.userId) {
            return new NextResponse("userId is required", { status: 400 });
        }

        await convex.mutation(api.subscriptions.createSubscirption, {
            ownerId: session.metadata.userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            currentPeriodEnd: subscription.current_period_end * 1000,
        });
    }

    // If the event is invoice.payment_succeeded, update the subscription
    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        await convex.mutation(api.subscriptions.updateSubscription, {
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0].price.id,
            currentPeriodEnd: subscription.current_period_end * 1000,
        });
    }

    return new NextResponse(null, { status: 200 });
}