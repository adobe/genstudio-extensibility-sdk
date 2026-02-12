[**@adobe/genstudio-extensibility-sdk**](../README.md)

***

[@adobe/genstudio-extensibility-sdk](../globals.md) / AppOptions

# Type Alias: AppOptions

> **AppOptions**: \{ `selectContent`: \{ `cors`: `boolean`; \}; `validation`: \{ `autoOpenApp`: `boolean`; `autoRefreshApp`: `boolean`; `singleExperienceViewMode`: `boolean`; \}; \}

## Type declaration

### selectContent?

> `optional` **selectContent**: \{ `cors`: `boolean`; \}

#### selectContent.cors

> **cors**: `boolean`

Indicates that the provided content is protected by CORS. Defaults to true.
When enabled in horizon canvas mode, the extension pre-uploads the content using an aio action rather than through the browser.
Enabling will introduce a delay in the content selection process. (~5s)

### validation?

> `optional` **validation**: \{ `autoOpenApp`: `boolean`; `autoRefreshApp`: `boolean`; `singleExperienceViewMode`: `boolean`; \}

#### validation.autoOpenApp?

> `optional` **autoOpenApp**: `boolean`

Open this app automatically after navigating to the draft.

#### validation.autoRefreshApp?

> `optional` **autoRefreshApp**: `boolean`

Reload the app automatically when the draft is updated.

#### validation.singleExperienceViewMode?

> `optional` **singleExperienceViewMode**: `boolean`

Use the single experience view mode for email experiences.
