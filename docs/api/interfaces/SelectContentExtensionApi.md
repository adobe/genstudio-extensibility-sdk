[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / SelectContentExtensionApi

# Interface: SelectContentExtensionApi

## Extends

- `VirtualApi`

## Indexable

\[`key`: `string`\]: `object` \| (...`args`: `unknown`[]) => `unknown`

## Properties

### api

> **api**: \{ `selectContentExtension`: \{ `setSelectedAssets`: (`extensionId`: `string`, `assets`: [`Asset`](../type-aliases/Asset.md)[]) => `void`; `sync`: () => `Promise`\<\{ `selectedAssets`: [`Asset`](../type-aliases/Asset.md)[]; `selectionLimit`: `number`; \}\>; \}; \}

#### selectContentExtension

> **selectContentExtension**: \{ `setSelectedAssets`: (`extensionId`: `string`, `assets`: [`Asset`](../type-aliases/Asset.md)[]) => `void`; `sync`: () => `Promise`\<\{ `selectedAssets`: [`Asset`](../type-aliases/Asset.md)[]; `selectionLimit`: `number`; \}\>; \}

##### selectContentExtension.setSelectedAssets()

> **setSelectedAssets**: (`extensionId`: `string`, `assets`: [`Asset`](../type-aliases/Asset.md)[]) => `void`

###### Parameters

###### extensionId

`string`

###### assets

[`Asset`](../type-aliases/Asset.md)[]

###### Returns

`void`

##### selectContentExtension.sync()

> **sync**: () => `Promise`\<\{ `selectedAssets`: [`Asset`](../type-aliases/Asset.md)[]; `selectionLimit`: `number`; \}\>

###### Returns

`Promise`\<\{ `selectedAssets`: [`Asset`](../type-aliases/Asset.md)[]; `selectionLimit`: `number`; \}\>
