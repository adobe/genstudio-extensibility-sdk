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

### ~~getExperiences()~~

> `static` **getExperiences**(`connection`: `any`): `Promise`\<[`Experience`](../interfaces/Experience.md)[]\>

Fetches experiences from the connection

#### Parameters

##### connection

`any`

The guest connection to the host

#### Returns

`Promise`\<[`Experience`](../interfaces/Experience.md)[]\>

Promise<Experience[]> Array of converted experiences

#### Throws

Error if connection is missing

#### Deprecated

Only used in HTML canvas. In non-HTML canvas, variants are
flattened into Experience and returned. Use getExperiencesWithVariants instead.

***

### getExperiencesWithVariants()

> `static` **getExperiencesWithVariants**(`connection`: `any`): `Promise`\<`ExperienceWithVariant`[]\>

Fetches experiences with variants from the connection.
Note: Does not work with HTML canvas.

#### Parameters

##### connection

`any`

The guest connection to the host

#### Returns

`Promise`\<`ExperienceWithVariant`[]\>

Promise<ExperienceWithVariant[]> Array of experiences with their variants

#### Throws

Error if connection is missing

***

### getGenerationContext()

> `static` **getGenerationContext**(`connection`: `any`): `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

Gets the generation context from the connection

#### Parameters

##### connection

`any`

The guest connection to the host

#### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

The generation context

#### Throws

Error if connection is missing

***

### open()

> `static` **open**(`connection`: `any`, `extensionId`: `string`): `void`

Opens the validation extension

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
