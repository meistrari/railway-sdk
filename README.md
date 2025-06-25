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

## API Reference

See the [API Reference](docs/README.md) for detailed documentation on each resource.
