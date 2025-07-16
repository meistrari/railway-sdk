[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [service](../README.md) / default

# Variable: default

> **default**: `object`

Defined in: [service.ts:92](https://github.com/meistrari/railway-sdk/blob/c87cd9663dd2e502f5c8cd0710cf3d5b6151fd10/src/resources/service.ts#L92)

## Type declaration

### createDomain()

> **createDomain**: (`input`) => `Promise`\<`string`\>

#### Parameters

##### input

###### environmentId

`string`

###### serviceId

`string`

###### targetPort

`number`

#### Returns

`Promise`\<`string`\>

### getById()

> **getById**: (`serviceId`) => `Promise`\<\{ `id`: `string`; `name`: `string`; \}\>

Get a service by ID

#### Parameters

##### serviceId

`string`

The ID of the service to get

#### Returns

`Promise`\<\{ `id`: `string`; `name`: `string`; \}\>

The service

### getDomains()

> **getDomains**: (`input`) => `Promise`\<\{ `customDomain`: `null` \| `string`; `serviceDomain`: `null` \| `string`; \}\>

#### Parameters

##### input

###### environmentId

`string`

###### projectId

`string`

###### serviceId

`string`

#### Returns

`Promise`\<\{ `customDomain`: `null` \| `string`; `serviceDomain`: `null` \| `string`; \}\>
