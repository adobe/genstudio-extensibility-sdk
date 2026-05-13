# GenStudio Extensibility SDK

TypeScript SDK for building UI extensions for [Adobe GenStudio for Performance Marketing](https://business.adobe.com/products/genstudio/performance-marketing.html).

The SDK provides the types and host-bridge services your extension needs to plug into GenStudio's extension points — right panels, prompt dialogs, asset pickers, template importers, and fragment swap dialogs — running as an Adobe App Builder app.

- **API reference:** https://opensource.adobe.com/genstudio-extensibility-sdk
- **Working examples:** https://github.com/adobe/genstudio-extensibility-examples

## Install

```bash
npm install @adobe/genstudio-extensibility-sdk @adobe/uix-guest
```

Requires Node.js `>=20` and npm `>=9`. Ships ESM + CJS with TypeScript types.

## How it works

A GenStudio extension is an App Builder app loaded inside an iframe in the GenStudio host. Communication with the host happens over `postMessage`, brokered by [`@adobe/uix-guest`](https://www.npmjs.com/package/@adobe/uix-guest).

This SDK provides two things on top of `uix-guest`:

1. **Typed host APIs** — `*ExtensionService` classes that wrap the host's methods (e.g. fetch experiences, update a field, set selected assets) so you don't hand-roll `postMessage` calls.
2. **Shared types** — `Experience`, `Asset`, `Template`, `GenerationContext`, `App`, `Toggle`, etc. — the data contracts GenStudio sends and expects back.

Every extension follows the same two-step pattern:

1. **Register** the extension in your entry component using `register()` from `uix-guest`. Tell GenStudio which extension points you implement (`validationExtension`, `promptExtension`, `selectContentExtension`, `importTemplateExtension`, `fragmentSwapExtension`) and what apps/toggles to expose.
2. **Inside each dialog/panel**, `attach()` to the host and call SDK services to read state from GenStudio or push changes back.

## Extension points

| Extension point | SDK service | What you build |
|---|---|---|
| `validationExtension` | `ValidationExtensionService` | Right-panel app that reads experiences and updates fields (e.g. claims check, compliance review). |
| `promptExtension` | `PromptExtensionService` | Prompt-drawer dialog that adds `AdditionalContext` to the generation request (e.g. pick claims, references). |
| `fragmentSwapExtension` | `FragmentSwapExtensionService` | Dialog that replaces a single field's value (e.g. swap copy for an approved variant). |
| `selectContentExtension` | `SelectContentExtensionService` | Asset picker backed by a third-party DAM. |
| `importTemplateExtension` | `ImportTemplateExtensionService` | Template browser that imports HTML templates into GenStudio. |

## Quick start

### 1. Register the extension

```ts
import { register } from "@adobe/uix-guest";
import {
  App,
  AppMetadata,
  Toggle,
  ValidationExtensionService,
} from "@adobe/genstudio-extensibility-sdk";

const EXTENSION_ID = "my-company.my-extension";

const APP_METADATA: AppMetadata = {
  id: "",
  extensionId: EXTENSION_ID,
  label: "Claims Validator",
  iconDataUri: "data:image/svg+xml;base64,...",
  supportedChannels: [{ id: "email", name: "Email" }],
};

await register({
  id: EXTENSION_ID,
  methods: {
    validationExtension: {
      getApps: (id: string): App[] => [
        { metadata: { ...APP_METADATA, id }, url: "#/validation-panel" },
      ],
      getToggles: async (id: string): Promise<Toggle[]> => [
        {
          metadata: { ...APP_METADATA, id },
          onClick: async () => ValidationExtensionService.open(connection, id),
        },
      ],
    },
  },
});
```

### 2. Use SDK services inside your dialog

```tsx
import { attach } from "@adobe/uix-guest";
import {
  Experience,
  ValidationExtensionService,
} from "@adobe/genstudio-extensibility-sdk";
import { useEffect, useState } from "react";

export function ValidationPanel() {
  const [connection, setConnection] = useState<any>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    attach({ id: "my-company.my-extension" }).then(setConnection);
  }, []);

  useEffect(() => {
    if (!connection) return;
    ValidationExtensionService.getExperiences(connection).then(setExperiences);
  }, [connection]);

  const applyFix = (experienceId: string, fieldName: string, value: string) =>
    ValidationExtensionService.updateField(connection, {
      experienceId,
      name: fieldName,
      value,
    });

  // render experiences, call applyFix on user action…
}
```

### 3. Access auth for backend calls

GenStudio shares IMS auth with your extension. Use it when invoking your App Builder runtime actions:

```ts
import { getExtensionAuth } from "@adobe/genstudio-extensibility-sdk";

const { imsToken, imsOrgId, apiKey } = getExtensionAuth(connection);
```

## Service reference

All services are `static` classes; pass the `connection` returned by `attach()` (or `register()`) as the first argument.

**`ValidationExtensionService`**
- `open(connection, extensionId)` — open the panel from a toggle.
- `getExperiences(connection)` — list experiences on the draft.
- `getGenerationContext(connection)` — brand, product, locale, channel, user prompt, etc.
- `updateField(connection, { experienceId, name, value })` — write a value back to the canvas.

**`PromptExtensionService`**
- `open(connection, extensionId)` / `close(connection)`
- `getGenerationContext(connection)`
- `updateAdditionalContext(connection, additionalContext)` — push selections (e.g. claims) onto the generation request.

**`FragmentSwapExtensionService`**
- `getExperience(connection)` / `getGenerationContext(connection)`
- `getSelectedField(connection)` — the field currently being swapped.
- `setSwapValue(connection, value)` — write the swap into that field.

**`SelectContentExtensionService`**
- `sync(connection, extensionId)` — current selection, selection limit, allowed file types.
- `setSelectedAssets(connection, extensionId, assets)`.

**`ImportTemplateExtensionService`**
- `setSelectedTemplate(connection, template)`.

Each service throws a typed `*ServiceError` if the connection is missing or the host call fails.

## Backend extensions

Some extension points (e.g. translation) are implemented as App Builder runtime actions rather than UI dialogs. The SDK exports the request/response types so your action stays type-safe:

```ts
import type {
  TranslationRequest,
  TranslationResponse,
} from "@adobe/genstudio-extensibility-sdk";
```

See `genstudio-translation-extension` in the [examples repo](https://github.com/adobe/genstudio-extensibility-examples) for a complete implementation.

## Examples

Production-ready reference apps live in [adobe/genstudio-extensibility-examples](https://github.com/adobe/genstudio-extensibility-examples):

- **`genstudio-mlr-claims-app`** — validation panel + prompt drawer + fragment swap, end-to-end.
- **`genstudio-create-validation`** — minimal validation-only app.
- **`genstudio-external-dam-app`** — third-party content (S3) selection.
- **`genstudio-external-template-app`** — third-party template import.
- **`genstudio-translation-extension`** — backend translation action.

Start by cloning the example closest to your use case and wiring it to your own App Builder project (`aio app use`).

## Versioning

This package follows [semantic versioning](https://semver.org/). Breaking changes are released only in major versions. See [`docs/changelog`](./docs/changelog/README.md) for per-major-version notes.

## Contributing

See the [Contributing Guide](./.github/CONTRIBUTING.md).

## License

Apache 2.0 — see [LICENSE](./LICENSE).
