[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [environment](../README.md) / createToken

# Function: createToken()

> **createToken**(`input`): `Promise`\<`string`\>

Defined in: [environment.ts:129](https://github.com/meistrari/railway-sdk/blob/56869a17687ab20a9aa94386d3ebd5067c2edee9/src/resources/environment.ts#L129)

Create an environment token

## Parameters

### input

The input parameters

#### environmentId

`string`

The environment ID

#### maxRetries?

`number` = `5`

Maximum number of retries (default: 5)

#### projectId

`string`

The project ID

#### requestInterval?

`number` = `5000`

The request interval for polling (default: 5000ms)

#### tokenName

`string`

The token name

## Returns

`Promise`\<`string`\>

The token ID
