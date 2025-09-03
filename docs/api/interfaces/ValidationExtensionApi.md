[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / ValidationExtensionApi

# Interface: ValidationExtensionApi

## Extends

- `VirtualApi`

## Indexable

\[`key`: `string`\]: `object` \| (...`args`: `unknown`[]) => `unknown`

## Properties

### api

> **api**: \{ `validationExtension`: \{ `getExperiences`: () => `Promise`\<[`Experience`](Experience.md)[]\>; `getGenerationContext`: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>; `open`: (`extensionId`: `string`) => `void`; \}; \}

#### validationExtension

> **validationExtension**: \{ `getExperiences`: () => `Promise`\<[`Experience`](Experience.md)[]\>; `getGenerationContext`: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>; `open`: (`extensionId`: `string`) => `void`; \}

##### validationExtension.getExperiences()

> **getExperiences**: () => `Promise`\<[`Experience`](Experience.md)[]\>

###### Returns

`Promise`\<[`Experience`](Experience.md)[]\>

##### validationExtension.getGenerationContext()

> **getGenerationContext**: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

###### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

##### validationExtension.open()

> **open**: (`extensionId`: `string`) => `void`

###### Parameters

###### extensionId

`string`

###### Returns

`void`
