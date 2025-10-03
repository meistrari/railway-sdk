[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [environment](../README.md) / default

# Variable: default

> **default**: `object`

Defined in: [environment.ts:269](https://github.com/meistrari/railway-sdk/blob/2fbd487475c12457cb4e9ce8ee7f6e3170f61238/src/resources/environment.ts#L269)

## Type declaration

### create()

> **create**: (`input`) => `Promise`\<`string`\>

Create an environment

#### Parameters

##### input

The input parameters

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

#### Returns

`Promise`\<`string`\>

The environment ID

### createToken()

> **createToken**: (`input`) => `Promise`\<`string`\>

Create an environment token

#### Parameters

##### input

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

#### Returns

`Promise`\<`string`\>

The token ID

### deleteEnvironment()

> **deleteEnvironment**: (`environmentId`) => `Promise`\<`void`\>

#### Parameters

##### environmentId

`string`

#### Returns

`Promise`\<`void`\>

### deleteToken()

> **deleteToken**: (`input`) => `Promise`\<`void`\>

Delete an environment token

#### Parameters

##### input

The input parameters

###### environmentId

`string`

The environment ID

###### projectId

`string`

The project ID

#### Returns

`Promise`\<`void`\>

### get()

> **get**: (`input`) => `Promise`\<`null` \| `string`\>

Get an environment by name

#### Parameters

##### input

The input parameters

###### environmentName

`string`

The environment name

###### projectId

`string`

The project ID

#### Returns

`Promise`\<`null` \| `string`\>

The environment ID or null if not found

### rename()

> **rename**: (`environmentId`, `newName`) => `Promise`\<`void`\>

#### Parameters

##### environmentId

`string`

##### newName

`string`

#### Returns

`Promise`\<`void`\>

### waitForDeployment()

> **waitForDeployment**: (`input`) => `Promise`\<`void`\>

Wait for a deployment to complete

#### Parameters

##### input

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

#### Returns

`Promise`\<`void`\>
