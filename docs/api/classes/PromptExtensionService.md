[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / PromptExtensionService

# Class: PromptExtensionService

Manages prompt extension functionality

## Constructors

### new PromptExtensionService()

> **new PromptExtensionService**(`connection`: `GuestUI`\<[`PromptExtensionApi`](../interfaces/PromptExtensionApi.md)\>): [`PromptExtensionService`](PromptExtensionService.md)

#### Parameters

##### connection

`GuestUI`\<[`PromptExtensionApi`](../interfaces/PromptExtensionApi.md)\>

#### Returns

[`PromptExtensionService`](PromptExtensionService.md)

## Methods

### close()

> **close**(): `void`

Closes the prompt extension

#### Returns

`void`

#### Throws

Error if connection is missing

***

### getGenerationContext()

> **getGenerationContext**(): `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

Gets the generation context from the prompt extension

#### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

Promise<GenerationContext> The generation context

#### Throws

Error if connection is missing

***

### open()

> **open**(`extensionId`: `string`): `void`

Opens the prompt extension

#### Parameters

##### extensionId

`string`

The ID of the extension to open

#### Returns

`void`

#### Throws

Error if connection is missing

***

### updateAdditionalContext()

> **updateAdditionalContext**(`context`: [`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>): `void`

Updates the additional context in the prompt extension

#### Parameters

##### context

[`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>

The additional context to update

#### Returns

`void`

#### Throws

Error if connection is missing
