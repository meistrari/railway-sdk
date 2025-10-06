[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [environment](../README.md) / create

# Function: create()

> **create**(`input`): `Promise`\<`string`\>

Defined in: [src/resources/environment.ts:45](https://github.com/meistrari/railway-sdk/blob/f9b6c19b25245262562728714735dc9dab5a2077/src/resources/environment.ts#L45)

Create an environment

## Parameters

### input

The input parameters

#### ephemeral?

`boolean`

Whether the environment is ephemeral

#### name

`string`

The environment name

#### projectId

`string`

The project ID

#### skipInitialDeploys?

`boolean`

When committing the changes immediately, skip any initial deployments.

#### sourceEnvironmentId?

`string`

Create the environment with all of the services, volumes, configuration, and variables from this source environment.

#### stageInitialChanges?

`boolean`

Stage the initial changes for the environment. If false (default), the changes will be committed immediately.

## Returns

`Promise`\<`string`\>

The environment ID
