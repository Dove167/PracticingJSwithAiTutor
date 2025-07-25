# Convex Node.js Tutorial

This tutorial will guide you through setting up Convex with Node.js and JavaScript.

## Prerequisites

- Node.js installed on your system

## Steps

### 1. Initialize a Node.js Project

Create a new directory for your project and initialize a Node.js project:

```bash
mkdir my-project && cd my-project && npm init -y && npm pkg set type="module"
```

### 2. Install Required Packages

Install the Convex client and dotenv packages:

```bash
npm install convex dotenv
```

### 3. Initialize Convex Development Deployment

Run the Convex CLI to set up a development deployment:

```bash
npx convex dev
```

This command will guide you through logging in, creating a new Convex project, and initializing the local backend functions.

### 4. Define Convex Backend Functions

Create a new file `convex/tasks.js` with a query function to retrieve data:

```javascript
import { query } from "./_generated/server";

export const get = query({
  handler: async ({ db }) => {
    return db.query("tasks").collect();
  },
});
```

### 5. Create a Client Script

Create a new file `script.js` to interact with your Convex backend:

```javascript
import { ConvexHttpClient } from "convex/browser";
import dotenv from "dotenv";

dotenv.config();

const address = process.env.CONVEX_URL;

if (!address) {
  throw new Error("CONVEX_URL not set");
}

const client = new ConvexHttpClient(address);

async function run() {
  const tasks = await client.query("tasks:get");
  console.log("Tasks:", tasks);
}

run();
```

### 6. Run the Client Script

Execute the script to fetch data from your Convex backend:

```bash
node script.js
```

## Additional Configuration

### Using CommonJS

If your project uses CommonJS instead of ES modules, you can configure Convex to generate a CommonJS API file by adding the following to your `convex.json`:

```json
{
  "generateCommonJSApi": true
}
```

Then, in your client script, you can use `require()` to import the Convex client:

```javascript
const { ConvexHttpClient } = require("convex/browser");
const { api } = require("./convex/_generated/api_cjs.cjs");

const client = new ConvexHttpClient(CONVEX_URL_GOES_HERE);
```

### Marking Node.js Dependencies as External

To prevent `esbuild` from bundling Node.js dependencies, you can mark them as external in your `convex.json`:

```json
{
  "node": {
    "externalPackages": ["*"]
  }
}
```

Or, to mark specific packages as external:

```json
{
  "node": {
    "externalPackages": ["aws-sdk", "sharp"]
  }
}
```

## Conclusion

You've now set up a basic Convex application with Node.js and JavaScript. You can expand on this by adding more complex queries, mutations, and actions to your Convex backend.