[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [environment](../README.md) / waitForDeployment

# Function: waitForDeployment()

> **waitForDeployment**(`input`): `Promise`\<`void`\>

Defined in: [src/resources/environment.ts:163](https://github.com/meistrari/railway-sdk/blob/50c12a64efaa7c3e3b78d9501e1fcf2fb3093eed/src/resources/environment.ts#L163)

Wait for a deployment to complete

## Parameters

### input

The input parameters

#### environmentId

`string`

The environment ID

#### poolTimeout?

`number`

The pool timeout

#### projectId

`string`

The project ID

#### requestInterval?

`number` = `5000`

The request interval

#### serviceId

`string`

The service ID

## Returns

`Promise`\<`void`\>
