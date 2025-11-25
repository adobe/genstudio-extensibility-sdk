[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / SelectContentExtensionService

# Class: SelectContentExtensionService

## Constructors

### new SelectContentExtensionService()

> **new SelectContentExtensionService**(): [`SelectContentExtensionService`](SelectContentExtensionService.md)

#### Returns

[`SelectContentExtensionService`](SelectContentExtensionService.md)

## Methods

### setSelectedAssets()

> `static` **setSelectedAssets**(`connection`: `any`, `extensionId`: `string`, `assets`: [`Asset`](../type-aliases/Asset.md)[]): `void`

Set the selected assets

#### Parameters

##### connection

`any`

##### extensionId

`string`

the extension id of the content select content add ons

##### assets

[`Asset`](../type-aliases/Asset.md)[]

the selected assets

#### Returns

`void`

***

### sync()

> `static` **sync**(`connection`: `any`, `extensionId`: `string`): \{ `allowedFileTypes`: `string`[]; `selectedAssets`: [`Asset`](../type-aliases/Asset.md)[]; `selectionLimit`: `number`; \}

Sync the selected assets

#### Parameters

##### connection

`any`

The guest connection to the host

##### extensionId

`string`

#### Returns

\{ `allowedFileTypes`: `string`[]; `selectedAssets`: [`Asset`](../type-aliases/Asset.md)[]; `selectionLimit`: `number`; \}

the current selected assets and the total count of left assets

##### allowedFileTypes

> **allowedFileTypes**: `string`[]

##### selectedAssets

> **selectedAssets**: [`Asset`](../type-aliases/Asset.md)[]

##### selectionLimit

> **selectionLimit**: `number`
