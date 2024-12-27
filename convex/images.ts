import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const generateServeUrl = query({
    args: { storageId: v.string() },
    handler: async (ctx, { storageId }) => {
        return await ctx.storage.getUrl(storageId);
    }
})