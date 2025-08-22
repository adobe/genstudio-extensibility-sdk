[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / ValidationExtensionService

# Class: ValidationExtensionService

Manages experience data conversion and retrieval

## Constructors

### new ValidationExtensionService()

> **new ValidationExtensionService**(`connection`: `GuestUI`\<[`ValidationExtensionApi`](../interfaces/ValidationExtensionApi.md)\>): [`ValidationExtensionService`](ValidationExtensionService.md)

#### Parameters

##### connection

`GuestUI`\<[`ValidationExtensionApi`](../interfaces/ValidationExtensionApi.md)\>

#### Returns

[`ValidationExtensionService`](ValidationExtensionService.md)

## Methods

### getExperiences()

> **getExperiences**(): `Promise`\<[`Experience`](../interfaces/Experience.md)[]\>

Fetches experiences from the connection

#### Returns

`Promise`\<[`Experience`](../interfaces/Experience.md)[]\>

Promise<Experience[]> Array of converted experiences

#### Throws

Error if connection is missing

***

### getGenerationContext()

> **getGenerationContext**(): `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

Gets the generation context from the connection

#### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

The generation context

#### Throws

Error if connection is missing

***

### open()

> **open**(`extensionId`: `string`): `void`

Opens the validation extension

#### Parameters

##### extensionId

`string`

The ID of the extension to open

#### Returns

`void`

#### Throws

Error if connection is missing
