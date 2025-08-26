[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / PromptExtensionService

# Class: PromptExtensionService

Manages prompt extension functionality

## Constructors

### new PromptExtensionService()

> **new PromptExtensionService**(): [`PromptExtensionService`](PromptExtensionService.md)

#### Returns

[`PromptExtensionService`](PromptExtensionService.md)

## Methods

### close()

> `static` **close**(`connection`: `any`): `void`

Closes the prompt extension

#### Parameters

##### connection

`any`

The guest connection to the host

#### Returns

`void`

#### Throws

Error if connection is missing

***

### getGenerationContext()

> `static` **getGenerationContext**(`connection`: `any`): `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

Gets the generation context from the prompt extension

#### Parameters

##### connection

`any`

The guest connection to the host

#### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

Promise<GenerationContext> The generation context

#### Throws

Error if connection is missing

***

### open()

> `static` **open**(`connection`: `any`, `extensionId`: `string`): `void`

Opens the prompt extension

#### Parameters

##### connection

`any`

The guest connection to the host

##### extensionId

`string`

The ID of the extension to open

#### Returns

`void`

#### Throws

Error if connection is missing

***

### updateAdditionalContext()

> `static` **updateAdditionalContext**(`connection`: `any`, `context`: [`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>): `void`

Updates the additional context in the prompt extension

#### Parameters

##### connection

`any`

The guest connection to the host

##### context

[`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>

The additional context to update

#### Returns

`void`

#### Throws

Error if connection is missing
