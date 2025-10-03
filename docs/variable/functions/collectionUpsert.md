[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [variable](../README.md) / collectionUpsert

# Function: collectionUpsert()

> **collectionUpsert**(`input`): `Promise`\<`void`\>

Defined in: [src/resources/variable.ts:17](https://github.com/meistrari/railway-sdk/blob/4121e2accb658089536ab841cb74fe6d1e324c80/src/resources/variable.ts#L17)

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
