[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [deployment](../README.md) / default

# Variable: default

> **default**: `object`

Defined in: [src/resources/deployment.ts:159](https://github.com/meistrari/railway-sdk/blob/cd91fb341616dbf6274f8020d8357d2afb6f934e/src/resources/deployment.ts#L159)

## Type declaration

### cancel()

> **cancel**: (`deploymentId`) => `Promise`\<`boolean`\>

Cancel a deployment

#### Parameters

##### deploymentId

`string`

The ID of the deployment to cancel

#### Returns

`Promise`\<`boolean`\>

### create()

> **create**: (`input`) => `Promise`\<`boolean`\>

Create a deployment

#### Parameters

##### input

The input parameters

###### commitSha?

`string`

The commit SHA to deploy

###### environmentId

`string`

The ID of the environment

###### serviceId

`string`

The ID of the service

#### Returns

`Promise`\<`boolean`\>

### list()

> **list**: (`input`) => `Promise`\<`object`[]\>

Get deployments for a service

#### Parameters

##### input

The input parameters

###### environmentId?

`string` = `...`

(Optional) The ID of the environment

###### includeDeleted?

`boolean` = `...`

(Optional) Whether to include deleted deployments

###### projectId?

`string` = `...`

(Optional) The ID of the project

###### serviceId?

`string` = `...`

(Optional) The ID of the service

###### status?

\{ `in?`: (`"INITIALIZING"` \| `"BUILDING"` \| `"DEPLOYING"` \| `"FAILED"` \| `"CRASHED"` \| `"REMOVED"` \| `"SUCCESS"` \| `"NEEDS_APPROVAL"` \| `"QUEUED"` \| `"REMOVING"` \| `"SKIPPED"` \| `"SLEEPING"` \| `"WAITING"`)[]; `notIn?`: (`"INITIALIZING"` \| `"BUILDING"` \| `"DEPLOYING"` \| `"FAILED"` \| `"CRASHED"` \| `"REMOVED"` \| `"SUCCESS"` \| `"NEEDS_APPROVAL"` \| `"QUEUED"` \| `"REMOVING"` \| `"SKIPPED"` \| `"SLEEPING"` \| `"WAITING"`)[]; \} = `...`

(Optional) Filter deployments by status

###### status.in?

(`"INITIALIZING"` \| `"BUILDING"` \| `"DEPLOYING"` \| `"FAILED"` \| `"CRASHED"` \| `"REMOVED"` \| `"SUCCESS"` \| `"NEEDS_APPROVAL"` \| `"QUEUED"` \| `"REMOVING"` \| `"SKIPPED"` \| `"SLEEPING"` \| `"WAITING"`)[] = `...`

(Optional) Array of statuses to include

###### status.notIn?

(`"INITIALIZING"` \| `"BUILDING"` \| `"DEPLOYING"` \| `"FAILED"` \| `"CRASHED"` \| `"REMOVED"` \| `"SUCCESS"` \| `"NEEDS_APPROVAL"` \| `"QUEUED"` \| `"REMOVING"` \| `"SKIPPED"` \| `"SLEEPING"` \| `"WAITING"`)[] = `...`

(Optional) Array of statuses to exclude

#### Returns

`Promise`\<`object`[]\>
