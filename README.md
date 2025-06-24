# @meistrari/railway-sdk

A lightweight SDK for interacting with Railway's GraphQL API, focused on managing environments and variables.

## Installation

```bash
npm install @meistrari/railway-sdk
```

## Usage

```ts
import railway from '@meistrari/railway-sdk'

// Access resources from the SDK
const environmentId = await railway.environment.get({
  projectId: 'your-project-id',
  environmentName: 'your-environment-name',
})

const token = await railway.environment.createToken({
  projectId: 'your-project-id',
  environmentId,
  tokenName: 'your-token-name',
})

await railway.variable.collectionUpsert({
  environmentId,
  projectId: 'your-project-id',
  variables: {
    'your-variable-name': 'your-variable-value',
  },
})
```

## API

### Environment

Located in `src/resources/environment.ts`.

#### `get({ projectId, environmentName })`

Fetches the environment ID for a given project and environment name.

- **Parameters:**
  - `projectId` (string): The Railway project ID.
  - `environmentName` (string): The name of the environment.
- **Returns:** `Promise<string | null>` — The environment ID or `null` if not found.

#### `create(input)`

Creates a new environment.

- **Parameters:** `input` (object)
  - `name` (string): Name of the environment.
  - `projectId` (string): Project ID.
  - `ephemeral?` (boolean): If true, creates an ephemeral environment.
  - `skipInitialDeploys?` (boolean): If true, skips initial deployments.
  - `sourceEnvironmentId?` (string): Source environment to clone from.
  - `stageInitialChanges?` (boolean): If true, stages initial changes.
- **Returns:** `Promise<string>` — The new environment ID.

#### `createToken({ projectId, environmentId, tokenName })`

Creates a new token for an environment, deleting any existing token for that environment.

- **Parameters:**
  - `projectId` (string): Project ID.
  - `environmentId` (string): Environment ID.
  - `tokenName` (string): Name for the token.
- **Returns:** `Promise<string>` — The created token.

### Variable

Located in `src/resources/variable.ts`.

#### `collectionUpsert(input)`

Upserts a collection of variables for an environment.

- **Parameters:** `input` (object)
  - `environmentId` (string): Environment ID.
  - `projectId` (string): Project ID.
  - `replace?` (boolean): If true, removes all existing variables before upserting.
  - `serviceId?` (string): Service ID (optional).
  - `variables` (Record<string, string>): Key-value pairs of variables.
- **Returns:** `Promise<void>` — Throws if upsert fails.

## Structure

- `src/index.ts`: Exports all resources.
- `src/resources/environment.ts`: Functions for managing environments and tokens.
- `src/resources/variable.ts`: Functions for managing environment variables.
