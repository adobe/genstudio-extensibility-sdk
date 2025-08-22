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

> **api**: \{ `validationExtension`: \{ `getExperiences`: () => `Promise`\<`any`[]\>; `getGenerationContext`: () => `Promise`\<`any`\>; `open`: (`extensionId`: `string`) => `void`; \}; \}

#### validationExtension

> **validationExtension**: \{ `getExperiences`: () => `Promise`\<`any`[]\>; `getGenerationContext`: () => `Promise`\<`any`\>; `open`: (`extensionId`: `string`) => `void`; \}

##### validationExtension.getExperiences()

> **getExperiences**: () => `Promise`\<`any`[]\>

###### Returns

`Promise`\<`any`[]\>

##### validationExtension.getGenerationContext()

> **getGenerationContext**: () => `Promise`\<`any`\>

###### Returns

`Promise`\<`any`\>

##### validationExtension.open()

> **open**: (`extensionId`: `string`) => `void`

###### Parameters

###### extensionId

`string`

###### Returns

`void`
