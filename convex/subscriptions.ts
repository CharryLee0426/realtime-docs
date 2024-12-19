import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

// For subscription, those apis are all public in order to
// allow stripe to call them. So authentication is finished
// in the API but not in the convex functions.
export const createSubscirption = mutation({
    args: {
        ownerId: v.string(),
        stripeCustomerId: v.string(),
        stripeSubscriptionId: v.string(),
        stripePriceId: v.string(),
        currentPeriodEnd: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("subscriptions", {
            ownerId: args.ownerId,
            stripeCustomerId: args.stripeCustomerId,
            stripeSubscriptionId: args.stripeSubscriptionId,
            stripePriceId: args.stripePriceId,
            stripeCurrentPeriodEnd: args.currentPeriodEnd,
        });
    },
});

export const getSubscription = query({
    args: {
        ownerId: v.string(),
    },
    handler: async (ctx, args) => {
        const subscription = await ctx.db
        .query("subscriptions")
        .withIndex("by_owner_id", (q) => q.eq("ownerId", args.ownerId))
        .order("desc")
        .first();

        return subscription;
    },
});

export const updateSubscription = mutation({
    args: {stripeSubscriptionId: v.string(), stripePriceId: v.string(), currentPeriodEnd: v.number()},
    handler: async (ctx, args) => {
        const subscription = await ctx.db
        .query("subscriptions")
        .withIndex("by_stripe_subscription_id", (q) => q.eq("stripeSubscriptionId", args.stripeSubscriptionId))
        .first();

        if (!subscription) {
            throw new ConvexError("Subscription not found");
        }

        return await ctx.db.patch(subscription._id, {
            stripePriceId: args.stripePriceId,
            stripeCurrentPeriodEnd: args.currentPeriodEnd,
        });
    }
})