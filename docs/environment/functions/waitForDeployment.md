[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [environment](../README.md) / waitForDeployment

# Function: waitForDeployment()

> **waitForDeployment**(`input`): `Promise`\<`void`\>

Defined in: [src/resources/environment.ts:164](https://github.com/meistrari/railway-sdk/blob/32b70c2c04210dd7f81669cad0f1afe7baa3de7a/src/resources/environment.ts#L164)

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
