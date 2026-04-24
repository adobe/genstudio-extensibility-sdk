[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / FragmentSwapExtensionService

# Class: FragmentSwapExtensionService

Manages swap field extension functionality for swapping field content

## Constructors

### new FragmentSwapExtensionService()

> **new FragmentSwapExtensionService**(): [`FragmentSwapExtensionService`](FragmentSwapExtensionService.md)

#### Returns

[`FragmentSwapExtensionService`](FragmentSwapExtensionService.md)

## Methods

### getExperience()

> `static` **getExperience**(`connection`: `any`): `Promise`\<[`Experience`](../interfaces/Experience.md)\>

Gets the current field context from the host

#### Parameters

##### connection

`any`

The guest connection to the host

#### Returns

`Promise`\<[`Experience`](../interfaces/Experience.md)\>

Promise<SwapFieldContext> The current field context

#### Throws

Error if connection is missing

***

### getGenerationContext()

> `static` **getGenerationContext**(`connection`: `any`): `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

Gets the generation context from the host

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

### setSwapValue()

> `static` **setSwapValue**(`connection`: `any`, `value`: `string`): `void`

Sets the swap value for the field content

#### Parameters

##### connection

`any`

The guest connection to the host

##### value

`string`

The new value to write into the field

#### Returns

`void`

#### Throws

Error if connection is missing
