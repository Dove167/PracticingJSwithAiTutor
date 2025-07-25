# Convex Databases and Authentication Guide

This guide covers how to work with databases and implement authentication in Convex, including handling multiple users.

## Working with Databases in Convex

### Defining Database Schema

Convex allows you to define your database schema using `defineSchema` and `defineTable`. Here's an example of defining a schema with tables and indexes:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    channel: v.id("channels"),
    body: v.string(),
    user: v.id("users"),
  }).index("by_channel", ["channel"]),
  
  channels: defineTable({
    name: v.string(),
  }),
});
```

### Reading Data from the Database

To read data from the database, you can define query functions:

```typescript
import { query } from "./_generated/server";

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  }
});
```

### Writing Data to the Database

To write data to the database, you can define mutation functions:

```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addItem = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
      await ctx.db.insert("tasks", { text: args.text });
    },
});
```

### Using Indexes for Efficient Queries

For better performance, use indexes when querying large datasets:

```typescript
export const getAllOpenTasks = query({
  args: {},
  handler: async (ctx, args) => {
    // Query the database to get all items that are not completed
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_completed", (q) => q.eq("completed", false))
      .collect();
    return tasks;
  }
});
```

## Authentication in Convex

### Setting up Authentication

To set up authentication in Convex, you need to configure your authentication provider. For example, with Clerk:

1. Create `convex/auth.config.ts`:

```typescript
export default {
  providers: [
    {
      domain: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API_URL,
      applicationID: "convex"
    }
  ]
};
```

2. Deploy the configuration:

```bash
npx convex dev
```

### Checking Authentication Status

In your React components, you can check the authentication status using the `useConvexAuth` hook:

```typescript
import { useConvexAuth } from "convex/react";

function App() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <div className="App">
      {isAuthenticated ? "Logged in" : "Logged out or still loading"}
    </div>
  );
}
```

### Conditional Rendering Based on Authentication

You can use helper components to conditionally render UI based on authentication status:

```typescript
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <main>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <Content />
      </Authenticated>
      <AuthLoading>
        <p>Still loading</p>
      </AuthLoading>
    </main>
  );
}

function Content() {
  const messages = useQuery(api.messages.getForCurrentUser);
  return <div>Authenticated content: {messages?.length}</div>;
}

export default App;
```

### Accessing User Identity in Backend Functions

In your Convex backend functions, you can access the authenticated user's identity:

```typescript
import { query } from "./_generated/server";

export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("author"), identity.email))
      .collect();
  }
});
```

## Handling Multiple Users

### Storing User Information

When a user logs in, you can store their information in the database:

```typescript
import { mutation } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Called storeUser without authentication present");
    }
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (existingUser !== null) {
      return existingUser._id;
    }
    const userId = await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      name: identity.name ?? "Anonymous",
      email: identity.email ?? "",
    });
    return userId;
  },
});
```

### Associating Data with Users

When creating data, you can associate it with the authenticated user:

```typescript
export const send = mutation({
  args: { body: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (!user) {
      throw new Error("Unauthenticated call to mutation");
    }
    await ctx.db.insert("messages", { body: args.body, user: user._id });
  },
});
```

### Querying User-Specific Data

To query data specific to the authenticated user:

```typescript
export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (user === null) {
      throw new Error("User not found");
    }
    return await ctx.db
      .query("messages")
      .withIndex("by_user", (q) => q.eq("user", user._id))
      .collect();
  }
});
```

## Conclusion

This guide covered the basics of working with databases and implementing authentication in Convex. By following these patterns, you can build applications that securely handle multiple users and efficiently query data. Remember to always validate user permissions on the backend and use indexes for better query performance.