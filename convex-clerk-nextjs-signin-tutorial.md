# Convex and Clerk with NextJS: Sign-In Feature Tutorial

## Introduction

This tutorial will guide you through creating a simple sign-in feature using Convex and Clerk in a NextJS application. Convex is a reactive database platform that simplifies backend development, while Clerk provides authentication services with prebuilt UI components. Together, they offer a powerful solution for adding authentication to your NextJS applications with minimal setup.

By the end of this tutorial, you'll have a working NextJS application with a sign-in feature powered by Clerk for authentication and Convex for backend data management.

## Prerequisites

Before starting this tutorial, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm or yarn package manager
- A code editor (VS Code recommended)

## Creating Convex and Clerk Accounts

1. **Create a Convex Account:**
   - Visit [convex.dev](https://convex.dev) and sign up for a free account
   - Follow the onboarding process to create your first project

2. **Create a Clerk Account:**
   - Visit [clerk.com](https://clerk.com) and sign up for a free account
   - Create a new application in the Clerk dashboard

## Getting API Keys from Clerk

1. After creating your Clerk application, navigate to the "API Keys" section in your Clerk dashboard
2. Note down the following keys:
   - `Publishable Key` (starts with `pk_`)
   - `Secret Key` (starts with `sk_`)

These keys will be used to configure authentication in your NextJS application.

## Setting Up a New NextJS Project

To create a new NextJS project, run the following command in your terminal:

```bash
npx create-next-app@latest convex-clerk-demo
```

Navigate to your project directory:

```bash
cd convex-clerk-demo
```

## Installing Convex and Clerk Dependencies

Install the required dependencies for both Convex and Clerk:

```bash
npm install convex @clerk/nextjs
```

Or if you're using yarn:

```bash
yarn add convex @clerk/nextjs
```

## Configuring Environment Variables

Create a `.env.local` file in your project root and add your Clerk API keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Also add your Convex deployment URL (you'll get this after setting up Convex):

```env
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud
```

## Implementing Clerk Sign-In Components

1. Create a middleware file at `middleware.ts` in your project root:

```typescript
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

2. Update your `app/layout.tsx` file to include ClerkProvider:

```typescript
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

3. Create a sign-in page at `app/sign-in/[[...sign-in]]/page.tsx`:

```typescript
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn />
}
```

4. Create a sign-up page at `app/sign-up/[[...sign-up]]/page.tsx`:

```typescript
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <SignUp />
}
```

## Integrating Convex with Clerk Authentication

1. Create a Convex client provider component at `components/ConvexClientProvider.tsx`:

```typescript
'use client'

import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { ReactNode } from 'react'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
```

2. Update your `app/layout.tsx` to include the Convex provider:

```typescript
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ConvexClientProvider } from '@/components/ConvexClientProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  )
}
```

## Testing the Sign-In Feature

1. Start your NextJS development server:

```bash
npm run dev
```

2. Visit `http://localhost:3000` in your browser
3. You should see the Clerk sign-in page
4. Try signing in with a test account to verify the integration works

## Conclusion

You've successfully created a NextJS application with a sign-in feature using Convex and Clerk. This basic setup provides a foundation for building more complex applications with authentication and real-time data features.

For further development, you can:
- Add protected routes that require authentication
- Create Convex functions that use user authentication
- Implement user profile management
- Add additional Clerk features like multi-factor authentication

## Additional Resources

- [Convex Documentation](https://docs.convex.dev)
- [Clerk Documentation](https://clerk.com/docs)
- [NextJS Documentation](https://nextjs.org/docs)