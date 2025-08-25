[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / PromptExtensionApi

# Interface: PromptExtensionApi

## Extends

- `VirtualApi`

## Indexable

\[`key`: `string`\]: `object` \| (...`args`: `unknown`[]) => `unknown`

## Properties

### api

> **api**: \{ `promptExtension`: \{ `close`: () => `void`; `getGenerationContext`: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>; `open`: (`extensionId`: `string`) => `void`; `updateAdditionalContext`: (`additionalContext`: [`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>) => `void`; \}; \}

#### promptExtension

> **promptExtension**: \{ `close`: () => `void`; `getGenerationContext`: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>; `open`: (`extensionId`: `string`) => `void`; `updateAdditionalContext`: (`additionalContext`: [`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>) => `void`; \}

##### promptExtension.close()

> **close**: () => `void`

###### Returns

`void`

##### promptExtension.getGenerationContext()

> **getGenerationContext**: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

###### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

##### promptExtension.open()

> **open**: (`extensionId`: `string`) => `void`

###### Parameters

###### extensionId

`string`

###### Returns

`void`

##### promptExtension.updateAdditionalContext()

> **updateAdditionalContext**: (`additionalContext`: [`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>) => `void`

###### Parameters

###### additionalContext

[`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>

###### Returns

`void`
