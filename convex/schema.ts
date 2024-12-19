import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        initialContent: v.optional(v.string()),
        ownerId: v.string(),
        roomId: v.optional(v.string()),
        organizationId: v.optional(v.string()),
        isPreloaded: v.optional(v.boolean()),
    })
    .index("by_owner_id", ["ownerId"])
    .index("by_organization_id", ["organizationId"])
    .searchIndex("search_title", {
        searchField: "title",
        filterFields: ["ownerId", "organizationId"],
    }),

    chats: defineTable({
        ownerId: v.string(),
        documentId: v.string(),
        content: v.string(),
        role: v.string(),
    })
    .index("by_document_id", ["documentId"])
    .index("by_owner_id", ["ownerId"]),

    subscriptions: defineTable({
        ownerId: v.string(),
        stripeCustomerId: v.optional(v.string()),
        stripeSubscriptionId: v.optional(v.string()),
        stripePriceId: v.optional(v.string()),
        stripeCurrentPeriodEnd: v.optional(v.number()),
    })
    .index("by_owner_id", ["ownerId"])
    .index("by_stripe_customer_id", ["stripeCustomerId"])
    .index("by_stripe_subscription_id", ["stripeSubscriptionId"]),
});