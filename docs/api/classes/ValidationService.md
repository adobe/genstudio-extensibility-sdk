[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / ValidationService

# Class: ValidationService

Manages experience data conversion and retrieval

## Constructors

### new ValidationService()

> **new ValidationService**(): [`ValidationService`](ValidationService.md)

#### Returns

[`ValidationService`](ValidationService.md)

## Methods

### getExperiences()

> `static` **getExperiences**(`connection`: `GuestUI`\<`RightPanelApi`\>): `Promise`\<[`Experience`](../interfaces/Experience.md)[]\>

Fetches experiences from the connection

#### Parameters

##### connection

`GuestUI`\<`RightPanelApi`\>

The guest connection to the host

#### Returns

`Promise`\<[`Experience`](../interfaces/Experience.md)[]\>

Promise<Experience[]> Array of converted experiences

#### Throws

Error if connection is missing

***

### getGenerationContext()

> `static` **getGenerationContext**(`connection`: `GuestUI`\<`RightPanelApi`\>): `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

Gets the generation context from the connection

#### Parameters

##### connection

`GuestUI`\<`RightPanelApi`\>

The guest connection to the host

#### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

The generation context

#### Throws

Error if connection is missing
