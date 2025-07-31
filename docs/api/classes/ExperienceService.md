[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / ExperienceService

# Class: ~~ExperienceService~~

## Deprecated

This class is deprecated and will be removed in version 2.0.0.
Use the new ValidationService class instead.

Example usage of the replacement:
```typescript
import { ValidationService } from './ValidationService';
const service = new ValidationService();
```

## Constructors

### new ExperienceService()

> **new ExperienceService**(): [`ExperienceService`](ExperienceService.md)

#### Returns

[`ExperienceService`](ExperienceService.md)

## Methods

### ~~getExperiences()~~

> `static` **getExperiences**(`connection`: `GuestUI`\<[`RightPanelApi`](../interfaces/RightPanelApi.md)\>): `Promise`\<[`Experience`](../interfaces/Experience.md)[]\>

Fetches experiences from the connection

#### Parameters

##### connection

`GuestUI`\<[`RightPanelApi`](../interfaces/RightPanelApi.md)\>

The guest connection to the host

#### Returns

`Promise`\<[`Experience`](../interfaces/Experience.md)[]\>

Promise<Experience[]> Array of converted experiences

#### Throws

Error if connection is missing

***

### ~~getGenerationContext()~~

> `static` **getGenerationContext**(`connection`: `GuestUI`\<[`RightPanelApi`](../interfaces/RightPanelApi.md)\>): `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

Gets the generation context from the connection

#### Parameters

##### connection

`GuestUI`\<[`RightPanelApi`](../interfaces/RightPanelApi.md)\>

The guest connection to the host

#### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

The generation context

#### Throws

Error if connection is missing
