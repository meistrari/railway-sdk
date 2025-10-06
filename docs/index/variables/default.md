[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [index](../README.md) / default

# Variable: default

> **default**: `object`

Defined in: [src/resources/index.ts:7](https://github.com/meistrari/railway-sdk/blob/86a09470f457674801f5bee1f99da0d3e39ced25/src/resources/index.ts#L7)

## Type declaration

### deployment

> **deployment**: `object`

#### deployment.cancel()

> **cancel**: (`deploymentId`) => `Promise`\<`boolean`\>

Cancel a deployment

##### Parameters

###### deploymentId

`string`

The ID of the deployment to cancel

##### Returns

`Promise`\<`boolean`\>

#### deployment.create()

> **create**: (`input`) => `Promise`\<`boolean`\>

Create a deployment

##### Parameters

###### input

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

##### Returns

`Promise`\<`boolean`\>

#### deployment.list()

> **list**: (`input`) => `Promise`\<`object`[]\>

Get deployments for a service

##### Parameters

###### input

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

##### Returns

`Promise`\<`object`[]\>

### environment

> **environment**: `object`

#### environment.create()

> **create**: (`input`) => `Promise`\<`string`\>

Create an environment

##### Parameters

###### input

The input parameters

###### applyChangesInBackground?

`boolean`

###### ephemeral?

`boolean`

Whether the environment is ephemeral

###### name

`string`

The environment name

###### projectId

`string`

The project ID

###### skipInitialDeploys?

`boolean`

When committing the changes immediately, skip any initial deployments.

###### sourceEnvironmentId?

`string`

Create the environment with all of the services, volumes, configuration, and variables from this source environment.

###### stageInitialChanges?

`boolean`

Stage the initial changes for the environment. If false (default), the changes will be committed immediately.

##### Returns

`Promise`\<`string`\>

The environment ID

#### environment.createToken()

> **createToken**: (`input`) => `Promise`\<`string`\>

Create an environment token

##### Parameters

###### input

The input parameters

###### environmentId

`string`

The environment ID

###### projectId

`string`

The project ID

###### tokenName

`string`

The token name

##### Returns

`Promise`\<`string`\>

The token ID

#### environment.deleteEnvironment()

> **deleteEnvironment**: (`environmentId`) => `Promise`\<`void`\>

##### Parameters

###### environmentId

`string`

##### Returns

`Promise`\<`void`\>

#### environment.deleteToken()

> **deleteToken**: (`input`) => `Promise`\<`void`\>

Delete an environment token

##### Parameters

###### input

The input parameters

###### environmentId

`string`

The environment ID

###### projectId

`string`

The project ID

##### Returns

`Promise`\<`void`\>

#### environment.get()

> **get**: (`input`) => `Promise`\<`null` \| `string`\>

Get an environment by name

##### Parameters

###### input

The input parameters

###### environmentName

`string`

The environment name

###### projectId

`string`

The project ID

##### Returns

`Promise`\<`null` \| `string`\>

The environment ID or null if not found

#### environment.rename()

> **rename**: (`environmentId`, `newName`) => `Promise`\<`void`\>

##### Parameters

###### environmentId

`string`

###### newName

`string`

##### Returns

`Promise`\<`void`\>

#### environment.waitForDeployment()

> **waitForDeployment**: (`input`) => `Promise`\<`void`\>

Wait for a deployment to complete

##### Parameters

###### input

The input parameters

###### environmentId

`string`

The environment ID

###### poolTimeout?

`number`

The pool timeout

###### projectId

`string`

The project ID

###### requestInterval?

`number` = `5000`

The request interval

###### serviceId

`string`

The service ID

##### Returns

`Promise`\<`void`\>

### project

> **project**: `object`

#### project.getAllEnvironments()

> **getAllEnvironments**: (`projectId`) => `Promise`\<`object`[]\>

##### Parameters

###### projectId

`string`

##### Returns

`Promise`\<`object`[]\>

### service

> **service**: `object`

#### service.createDomain()

> **createDomain**: (`input`) => `Promise`\<`string`\>

Create a service domain

##### Parameters

###### input

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

##### Returns

`Promise`\<`string`\>

The created domain

#### service.getById()

> **getById**: (`serviceId`) => `Promise`\<\{ `id`: `string`; `name`: `string`; \}\>

Get a service by ID

##### Parameters

###### serviceId

`string`

The ID of the service to get

##### Returns

`Promise`\<\{ `id`: `string`; `name`: `string`; \}\>

The service

#### service.getDomains()

> **getDomains**: (`input`) => `Promise`\<\{ `customDomain`: `null` \| `string`; `serviceDomain`: `null` \| `string`; \}\>

Get domains for a service in an environment

##### Parameters

###### input

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

##### Returns

`Promise`\<\{ `customDomain`: `null` \| `string`; `serviceDomain`: `null` \| `string`; \}\>

The custom and service domains

#### service.getForEnvironment()

> **getForEnvironment**: (`input`) => `Promise`\<`object`[]\>

Get all service instances for an environment

##### Parameters

###### input

The input parameters

###### environmentId

`string`

The ID of the environment

##### Returns

`Promise`\<`object`[]\>

Array of service instances with their domains

### variable

> **variable**: `object`

#### variable.collectionUpsert()

> **collectionUpsert**: (`input`) => `Promise`\<`void`\>

Upsert a variable collection

##### Parameters

###### input

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

##### Returns

`Promise`\<`void`\>
