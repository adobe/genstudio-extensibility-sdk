[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / ImportTemplateExtensionRegistration

# Type Alias: ImportTemplateExtensionRegistration

> **ImportTemplateExtensionRegistration**: \{ `id`: `string`; `methods`: \{ `importTemplateExtension`: \{ `getApps`: (`id`: `string`) => [`App`](App.md)[]; `getToggles`: (`id`: `string`) => `Promise`\<[`Toggle`](Toggle.md)[]\>; \}; \}; \}

## Type declaration

### id

> **id**: `string`

### methods

> **methods**: \{ `importTemplateExtension`: \{ `getApps`: (`id`: `string`) => [`App`](App.md)[]; `getToggles`: (`id`: `string`) => `Promise`\<[`Toggle`](Toggle.md)[]\>; \}; \}

#### methods.importTemplateExtension

> **importTemplateExtension**: \{ `getApps`: (`id`: `string`) => [`App`](App.md)[]; `getToggles`: (`id`: `string`) => `Promise`\<[`Toggle`](Toggle.md)[]\>; \}

#### methods.importTemplateExtension.getApps()

> **getApps**: (`id`: `string`) => [`App`](App.md)[]

##### Parameters

###### id

`string`

##### Returns

[`App`](App.md)[]

#### methods.importTemplateExtension.getToggles()

> **getToggles**: (`id`: `string`) => `Promise`\<[`Toggle`](Toggle.md)[]\>

##### Parameters

###### id

`string`

##### Returns

`Promise`\<[`Toggle`](Toggle.md)[]\>
