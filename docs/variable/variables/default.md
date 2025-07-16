[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [variable](../README.md) / default

# Variable: default

> **default**: `object`

Defined in: [variable.ts:37](https://github.com/meistrari/railway-sdk/blob/009d96dacfdaddf9b793be3ee62730b1132c79c6/src/resources/variable.ts#L37)

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

###### variables

`Record`\<`string`, `string`\>

The variables to upsert

#### Returns

`Promise`\<`void`\>
