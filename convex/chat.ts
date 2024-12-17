import {ConvexError, v} from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {role: v.string(), content: v.string(), documentId: v.string()},
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        
        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const chatId = await ctx.db.insert("chats", {
            role: args.role,
            content: args.content,
            documentId: args.documentId,
            ownerId: user.subject,
        });

        return chatId;
    }
})

// Here, we don't need to pass the ownerId because we can get it in ctx
export const getByDocumentId = query({
    args: {documentId: v.string()},
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        return await ctx.db.query("chats")
        .withIndex("by_document_id", (q) => q.eq("documentId", args.documentId))
        .filter((q) => q.eq(q.field("ownerId"), user.subject))
        .order("asc")
        .collect();
    }
})

// Delete all chats for the user and his document
export const deleteByDocumentId = mutation({
    args: {documentId: v.string()},
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized");
        }
        
        // In theory, only one document will be returned
        const document = await ctx.db.query("chats")
        .withIndex("by_document_id", (q) => q.eq("documentId", args.documentId))
        .collect();
        if (!document) {
            throw new ConvexError("Not found");
        }

        if (document[0].ownerId !== user.subject) {
            throw new ConvexError("Unauthorized");
        }

        // Get the chats and then delete them
        const chats = await ctx.db.query("chats")
        .withIndex("by_document_id", (q) => q.eq("documentId", args.documentId))
        .filter((q) => q.eq(q.field("ownerId"), user.subject))
        .collect();
        for (const chat of chats) {
            await ctx.db.delete(chat._id);
        }
    }
})