[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / FragmentSwapExtensionApi

# Interface: FragmentSwapExtensionApi

## Extends

- `VirtualApi`

## Indexable

\[`key`: `string`\]: `object` \| (...`args`: `unknown`[]) => `unknown`

## Properties

### api

> **api**: \{ `fragmentSwapExtension`: \{ `close`: () => `void`; `getExperience`: () => `Promise`\<[`Experience`](Experience.md)\>; `getGenerationContext`: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>; `getSelectedField`: () => `Promise`\<[`FieldUpdate`](../type-aliases/FieldUpdate.md)\>; `open`: (`extensionId`: `string`) => `void`; `setSwapValue`: (`value`: `string`) => `void`; \}; \}

#### fragmentSwapExtension

> **fragmentSwapExtension**: \{ `close`: () => `void`; `getExperience`: () => `Promise`\<[`Experience`](Experience.md)\>; `getGenerationContext`: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>; `getSelectedField`: () => `Promise`\<[`FieldUpdate`](../type-aliases/FieldUpdate.md)\>; `open`: (`extensionId`: `string`) => `void`; `setSwapValue`: (`value`: `string`) => `void`; \}

##### fragmentSwapExtension.close()

> **close**: () => `void`

###### Returns

`void`

##### fragmentSwapExtension.getExperience()

> **getExperience**: () => `Promise`\<[`Experience`](Experience.md)\>

###### Returns

`Promise`\<[`Experience`](Experience.md)\>

##### fragmentSwapExtension.getGenerationContext()

> **getGenerationContext**: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

###### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

##### fragmentSwapExtension.getSelectedField()

> **getSelectedField**: () => `Promise`\<[`FieldUpdate`](../type-aliases/FieldUpdate.md)\>

###### Returns

`Promise`\<[`FieldUpdate`](../type-aliases/FieldUpdate.md)\>

##### fragmentSwapExtension.open()

> **open**: (`extensionId`: `string`) => `void`

###### Parameters

###### extensionId

`string`

###### Returns

`void`

##### fragmentSwapExtension.setSwapValue()

> **setSwapValue**: (`value`: `string`) => `void`

###### Parameters

###### value

`string`

###### Returns

`void`
