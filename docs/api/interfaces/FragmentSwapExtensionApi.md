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

> **api**: \{ `fragmentSwapExtension`: \{ `getExperience`: () => `Promise`\<[`Experience`](Experience.md)\>; `getGenerationContext`: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>; `setSwapValue`: (`value`: `string`) => `void`; \}; \}

#### fragmentSwapExtension

> **fragmentSwapExtension**: \{ `getExperience`: () => `Promise`\<[`Experience`](Experience.md)\>; `getGenerationContext`: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>; `setSwapValue`: (`value`: `string`) => `void`; \}

##### fragmentSwapExtension.getExperience()

> **getExperience**: () => `Promise`\<[`Experience`](Experience.md)\>

###### Returns

`Promise`\<[`Experience`](Experience.md)\>

##### fragmentSwapExtension.getGenerationContext()

> **getGenerationContext**: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

###### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

##### fragmentSwapExtension.setSwapValue()

> **setSwapValue**: (`value`: `string`) => `void`

###### Parameters

###### value

`string`

###### Returns

`void`
