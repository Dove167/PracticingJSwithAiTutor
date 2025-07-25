import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.string(),
    lastLogin: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      role: args.role,
      lastLogin: args.lastLogin
    });
  }
});

export const updateLastLogin = mutation({
  args: {
    id: v.id("users"),
    lastLogin: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { lastLogin: args.lastLogin });
  }
});