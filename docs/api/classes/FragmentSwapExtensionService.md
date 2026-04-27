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

### close()

> `static` **close**(`connection`: `any`): `void`

Closes the swap field extension dialog

#### Parameters

##### connection

`any`

The guest connection to the host

#### Returns

`void`

#### Throws

Error if connection is missing

***

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

### getSelectedField()

> `static` **getSelectedField**(`connection`: `any`): `Promise`\<[`FieldUpdate`](../type-aliases/FieldUpdate.md)\>

Gets the field currently being swapped, including its name and current value

#### Parameters

##### connection

`any`

The guest connection to the host

#### Returns

`Promise`\<[`FieldUpdate`](../type-aliases/FieldUpdate.md)\>

Promise<FieldUpdate> The selected field's experienceId, name, and current value

#### Throws

Error if connection is missing

***

### open()

> `static` **open**(`connection`: `any`, `extensionId`: `string`): `void`

Opens the swap field extension dialog

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
