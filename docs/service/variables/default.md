[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [service](../README.md) / default

# Variable: default

> **default**: `object`

Defined in: [src/resources/service.ts:148](https://github.com/meistrari/railway-sdk/blob/7b9552361fc20fed3464e55a0e1e03a30f1cf591/src/resources/service.ts#L148)

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

### getForEnvironment()

> **getForEnvironment**: (`input`) => `Promise`\<`object`[]\>

#### Parameters

##### input

###### environmentId

`string`

#### Returns

`Promise`\<`object`[]\>
