[**@meistrari/railway-sdk**](../../README.md)

***

[@meistrari/railway-sdk](../../README.md) / [environment](../README.md) / EnvironmentConfig

# Type Alias: EnvironmentConfig

> **EnvironmentConfig** = `object`

Defined in: [src/resources/environment.ts:432](https://github.com/meistrari/railway-sdk/blob/db638d410c5cac17882a242e4d50c5d06841189b/src/resources/environment.ts#L432)

Environment configuration as defined by the Railway schema.
See https://backboard.railway.com/schema/environment.schema.json

## Properties

### buckets?

> `optional` **buckets**: `Nullable`\<`Record`\<`string`, `BucketConfig`\>\>

Defined in: [src/resources/environment.ts:436](https://github.com/meistrari/railway-sdk/blob/db638d410c5cac17882a242e4d50c5d06841189b/src/resources/environment.ts#L436)

***

### degraded?

> `optional` **degraded**: `Nullable`\<`string`[]\>

Defined in: [src/resources/environment.ts:439](https://github.com/meistrari/railway-sdk/blob/db638d410c5cac17882a242e4d50c5d06841189b/src/resources/environment.ts#L439)

***

### groups?

> `optional` **groups**: `Nullable`\<`Record`\<`string`, `GroupConfig`\>\>

Defined in: [src/resources/environment.ts:437](https://github.com/meistrari/railway-sdk/blob/db638d410c5cac17882a242e4d50c5d06841189b/src/resources/environment.ts#L437)

***

### privateNetworkDisabled?

> `optional` **privateNetworkDisabled**: `Nullable`\<`boolean`\>

Defined in: [src/resources/environment.ts:438](https://github.com/meistrari/railway-sdk/blob/db638d410c5cac17882a242e4d50c5d06841189b/src/resources/environment.ts#L438)

***

### services?

> `optional` **services**: `Nullable`\<`Record`\<`string`, `Nullable`\<`ServiceConfig`\>\>\>

Defined in: [src/resources/environment.ts:433](https://github.com/meistrari/railway-sdk/blob/db638d410c5cac17882a242e4d50c5d06841189b/src/resources/environment.ts#L433)

***

### sharedVariables?

> `optional` **sharedVariables**: `Nullable`\<`Record`\<`string`, `Nullable`\<`EnvironmentVariable`\>\>\>

Defined in: [src/resources/environment.ts:434](https://github.com/meistrari/railway-sdk/blob/db638d410c5cac17882a242e4d50c5d06841189b/src/resources/environment.ts#L434)

***

### stopServices?

> `optional` **stopServices**: `Nullable`\<`string`[]\>

Defined in: [src/resources/environment.ts:440](https://github.com/meistrari/railway-sdk/blob/db638d410c5cac17882a242e4d50c5d06841189b/src/resources/environment.ts#L440)

***

### volumes?

> `optional` **volumes**: `Nullable`\<`Record`\<`string`, `VolumeConfig`\>\>

Defined in: [src/resources/environment.ts:435](https://github.com/meistrari/railway-sdk/blob/db638d410c5cac17882a242e4d50c5d06841189b/src/resources/environment.ts#L435)
