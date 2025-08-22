[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / SelectContentExtensionService

# Class: SelectContentExtensionService

## Constructors

### new SelectContentExtensionService()

> **new SelectContentExtensionService**(`connection`: `GuestUI`\<[`SelectContentExtensionApi`](../interfaces/SelectContentExtensionApi.md)\>): [`SelectContentExtensionService`](SelectContentExtensionService.md)

#### Parameters

##### connection

`GuestUI`\<[`SelectContentExtensionApi`](../interfaces/SelectContentExtensionApi.md)\>

#### Returns

[`SelectContentExtensionService`](SelectContentExtensionService.md)

## Methods

### setSelectedAssets()

> **setSelectedAssets**(`extensionId`: `string`, `assets`: [`Asset`](../type-aliases/Asset.md)[]): `any`

Set the selected assets

#### Parameters

##### extensionId

`string`

the extension id of the content select content add ons

##### assets

[`Asset`](../type-aliases/Asset.md)[]

the selected assets

#### Returns

`any`

***

### sync()

> **sync**(): `Promise`\<\{ `selectedAssets`: [`Asset`](../type-aliases/Asset.md)[]; `selectionLimit`: `number`; \}\>

Sync the selected assets

#### Returns

`Promise`\<\{ `selectedAssets`: [`Asset`](../type-aliases/Asset.md)[]; `selectionLimit`: `number`; \}\>

the current selected assets and the total count of left assets
