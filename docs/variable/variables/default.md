[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [variable](../README.md) / default

# Variable: default

> **default**: `object`

Defined in: [src/resources/variable.ts:39](https://github.com/meistrari/railway-sdk/blob/d7a5004ab305963cf13ead052ffb6ba24288fdc7/src/resources/variable.ts#L39)

## Type declaration

### collectionUpsert()

> **collectionUpsert**: (`input`) => `Promise`\<`void`\>

Upsert a variable collection

#### Parameters

##### input

The input parameters

###### environmentId

`string`

The ID of the environment

###### projectId

`string`

The ID of the project

###### replace?

`boolean`

When set to true, removes all existing variables before upserting the new collection.

###### serviceId?

`string`

The ID of the service

###### skipDeploys?

`boolean`

When set to true, skips deploying the service after upserting the variables.

###### variables

`Record`\<`string`, `string`\>

The variables to upsert

#### Returns

`Promise`\<`void`\>
