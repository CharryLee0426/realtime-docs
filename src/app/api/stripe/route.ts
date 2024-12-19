import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import { api } from "../../../../convex/_generated/api";
import { stripe } from "@/lib/stripe";
import { DAY_IN_MS } from "@/app/constants/time";

const settingUrl = absoluteUrl("/");
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET() {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userSubscription = await convex.query(api.subscriptions.getSubscription, {ownerId: userId});

        // If the user has a valid subscription, redirect them to the Stripe billing portal
        const isValid = userSubscription?.stripePriceId && (userSubscription?.stripeCurrentPeriodEnd ?? 0) + DAY_IN_MS > Date.now();
        if (userSubscription && userSubscription.stripeCustomerId && isValid) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingUrl,
            });

            return new NextResponse(JSON.stringify({url: stripeSession.url}));
        }

        // If the user does not have a subscription, redirect them to the settings page
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingUrl,
            cancel_url: settingUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "AI Assistant Subscription",
                            description: "Unlock the full power of AI Assistant",
                        },
                        unit_amount: 499,
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId
            }
        });

        return new NextResponse(JSON.stringify({url: stripeSession.url}));
    } catch (error) {
        return new NextResponse(`Internal Server Error: ${error}`, { status: 500 });
    }
}