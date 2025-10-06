[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [variable](../README.md) / default

# Variable: default

> **default**: `object`

Defined in: [src/resources/variable.ts:39](https://github.com/meistrari/railway-sdk/blob/f6f55aef3c274b44e5878f0130638d64cd35423c/src/resources/variable.ts#L39)

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
