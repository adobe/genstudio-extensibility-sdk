[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / ValidationExtensionService

# Class: ValidationExtensionService

Manages experience data conversion and retrieval

## Constructors

### new ValidationExtensionService()

> **new ValidationExtensionService**(): [`ValidationExtensionService`](ValidationExtensionService.md)

#### Returns

[`ValidationExtensionService`](ValidationExtensionService.md)

## Methods

### getExperiences()

> `static` **getExperiences**(`connection`: `GuestUI`\<[`ValidationExtensionApi`](../interfaces/ValidationExtensionApi.md)\>): `Promise`\<[`Experience`](../interfaces/Experience.md)[]\>

Fetches experiences from the connection

#### Parameters

##### connection

`GuestUI`\<[`ValidationExtensionApi`](../interfaces/ValidationExtensionApi.md)\>

The guest connection to the host

#### Returns

`Promise`\<[`Experience`](../interfaces/Experience.md)[]\>

Promise<Experience[]> Array of converted experiences

#### Throws

Error if connection is missing

***

### getGenerationContext()

> `static` **getGenerationContext**(`connection`: `GuestUI`\<[`ValidationExtensionApi`](../interfaces/ValidationExtensionApi.md)\>): `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

Gets the generation context from the connection

#### Parameters

##### connection

`GuestUI`\<[`ValidationExtensionApi`](../interfaces/ValidationExtensionApi.md)\>

The guest connection to the host

#### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

The generation context

#### Throws

Error if connection is missing

***

### open()

> `static` **open**(`connection`: `GuestUI`\<[`ValidationExtensionApi`](../interfaces/ValidationExtensionApi.md)\>, `extensionId`: `string`): `void`

Opens the validation extension

#### Parameters

##### connection

`GuestUI`\<[`ValidationExtensionApi`](../interfaces/ValidationExtensionApi.md)\>

The guest connection to the host

##### extensionId

`string`

The ID of the extension to open

#### Returns

`void`

#### Throws

Error if connection is missing
