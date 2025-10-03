[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [service](../README.md) / default

# Variable: default

> **default**: `object`

Defined in: [service.ts:92](https://github.com/meistrari/railway-sdk/blob/315cdfd39f486c1255f8966560e866467cb24f42/src/resources/service.ts#L92)

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
