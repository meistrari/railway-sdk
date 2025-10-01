[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [variable](../README.md) / collectionUpsert

# Function: collectionUpsert()

> **collectionUpsert**(`input`): `Promise`\<`void`\>

Defined in: [variable.ts:17](https://github.com/meistrari/railway-sdk/blob/56869a17687ab20a9aa94386d3ebd5067c2edee9/src/resources/variable.ts#L17)

Upsert a variable collection

## Parameters

### input

The input parameters

#### environmentId

`string`

The ID of the environment

#### projectId

`string`

The ID of the project

#### replace?

`boolean`

When set to true, removes all existing variables before upserting the new collection.

#### serviceId?

`string`

The ID of the service

#### skipDeploys?

`boolean`

When set to true, skips deploying the service after upserting the variables.

#### variables

`Record`\<`string`, `string`\>

The variables to upsert

## Returns

`Promise`\<`void`\>
