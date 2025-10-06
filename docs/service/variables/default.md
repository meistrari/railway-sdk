[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [service](../README.md) / default

# Variable: default

> **default**: `object`

Defined in: [src/resources/service.ts:168](https://github.com/meistrari/railway-sdk/blob/b87a104193ea33d3b4c98eb257da92da12d9efc2/src/resources/service.ts#L168)

## Type declaration

### createDomain()

> **createDomain**: (`input`) => `Promise`\<`string`\>

Create a service domain

#### Parameters

##### input

The input parameters

###### environmentId

`string`

The ID of the environment

###### serviceId

`string`

The ID of the service

###### targetPort

`number`

The target port for the domain

#### Returns

`Promise`\<`string`\>

The created domain

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

Get domains for a service in an environment

#### Parameters

##### input

The input parameters

###### environmentId

`string`

The ID of the environment

###### projectId

`string`

The ID of the project

###### serviceId

`string`

The ID of the service

#### Returns

`Promise`\<\{ `customDomain`: `null` \| `string`; `serviceDomain`: `null` \| `string`; \}\>

The custom and service domains

### getForEnvironment()

> **getForEnvironment**: (`input`) => `Promise`\<`object`[]\>

Get all service instances for an environment

#### Parameters

##### input

The input parameters

###### environmentId

`string`

The ID of the environment

#### Returns

`Promise`\<`object`[]\>

Array of service instances with their domains
