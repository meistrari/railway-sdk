[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [deployment](../README.md) / default

# Variable: default

> **default**: `object`

Defined in: [src/resources/deployment.ts:150](https://github.com/meistrari/railway-sdk/blob/3e8b838d15db81260f7bb15024aab7e38c8a7088/src/resources/deployment.ts#L150)

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

#### Parameters

##### input

###### commitSha?

`string`

###### environmentId

`string`

###### serviceId

`string`

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

\{ `in?`: (`"BUILDING"` \| `"CRASHED"` \| `"DEPLOYING"` \| `"FAILED"` \| `"INITIALIZING"` \| `"NEEDS_APPROVAL"` \| `"QUEUED"` \| `"REMOVED"` \| `"REMOVING"` \| `"SKIPPED"` \| `"SLEEPING"` \| `"SUCCESS"` \| `"WAITING"`)[]; `notIn?`: (`"BUILDING"` \| `"CRASHED"` \| `"DEPLOYING"` \| `"FAILED"` \| `"INITIALIZING"` \| `"NEEDS_APPROVAL"` \| `"QUEUED"` \| `"REMOVED"` \| `"REMOVING"` \| `"SKIPPED"` \| `"SLEEPING"` \| `"SUCCESS"` \| `"WAITING"`)[]; \} = `...`

(Optional) Filter deployments by status

###### status.in?

(`"BUILDING"` \| `"CRASHED"` \| `"DEPLOYING"` \| `"FAILED"` \| `"INITIALIZING"` \| `"NEEDS_APPROVAL"` \| `"QUEUED"` \| `"REMOVED"` \| `"REMOVING"` \| `"SKIPPED"` \| `"SLEEPING"` \| `"SUCCESS"` \| `"WAITING"`)[] = `...`

(Optional) Array of statuses to include

###### status.notIn?

(`"BUILDING"` \| `"CRASHED"` \| `"DEPLOYING"` \| `"FAILED"` \| `"INITIALIZING"` \| `"NEEDS_APPROVAL"` \| `"QUEUED"` \| `"REMOVED"` \| `"REMOVING"` \| `"SKIPPED"` \| `"SLEEPING"` \| `"SUCCESS"` \| `"WAITING"`)[] = `...`

(Optional) Array of statuses to exclude

#### Returns

`Promise`\<`object`[]\>
