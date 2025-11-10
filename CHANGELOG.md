# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [4.1.0] - 2025-11-06

### Major Release - External DAM Extension Enhancements

This release introduces enhanced asset management capabilities with a restructured Asset type and new upload workflows for external DAM extensions.

### Breaking Changes

#### Asset Type Structure

The `Asset` interface has been restructured with new required fields and nested objects:

**New Required Fields:**

- `mimeType: string` - MIME type of the asset
- `size: number` - Size of the asset in bytes

**Restructured Fields:**

- `externalAssetInfo` - New nested object containing:

  - `sourceUrl: string` - Source URL of the asset
  - `signedUrl: string` - Signed URL for asset access (moved from top level)
  - `signedThumbnailUrl: string` - Signed URL for thumbnail

- `extensionInfo` - New nested object containing:
  - `id: string` - Extension ID (previously `extensionId`)
  - `name: string` - Extension name (previously `source`)
  - `iconUrl?: string` - Extension icon URL (now optional, previously required)

**Optional Fields:**

These values are passed back together with experiences generating using assets imported from external DAM when using validation extension.

- `additionalMetadata?: Record<string, any>` - Additional metadata
- `keywords?: string[]` - Asset keywords

### New Features

#### SelectContentExtensionService Enhancements

The `SelectContentExtensionService` (introduced in v3.0.0) now includes enhanced functionality:

```typescript
// sync() now requires extensionId and returns selectedAssets
const { selectionLimit, selectedAssets } =
  await SelectContentExtensionService.sync(guestConnection, extensionId);

// setSelectedAssets() is now synchronous
SelectContentExtensionService.setSelectedAssets(
  guestConnection,
  extensionId,
  selectedAssets,
);
```

#### Upload and Get URL Workflow

New `uploadAndGetUrl` method required for extension registration:

```typescript
register({
  id: extensionId,
  methods: {
    uploadAndGetUrl: async (auth, asset: Asset) => {
      // Upload asset and return URLs
      return { url: "...", thumbnailUrl: "..." };
    },
  },
});
```

**Required Action:** Add `upload-and-get-url` action to your `app.config.yaml`

### Migration Guide

#### 1. Update Asset Structure

```typescript
// Before (v3)
const asset = {
  id: "asset-123",
  name: "image.jpg",
  signedUrl: "https://...",
  extensionId: "my-extension",
  source: "My DAM",
  iconUrl: "data:image/svg+xml;base64,...",
};

// After (v4)
const asset = {
  id: "asset-123",
  name: "image.jpg",
  mimeType: "image/jpeg", // NEW - required
  size: 1024000, // NEW - required
  externalAssetInfo: {
    // NEW - nested object
    sourceUrl: "https://...",
    signedUrl: "https://...",
    signedThumbnailUrl: "https://...",
  },
  extensionInfo: {
    // NEW - nested object
    id: "my-extension",
    name: "My DAM",
    iconUrl: "data:image/svg+xml;base64,...",
  },
};
```

#### 2. Update SelectContentExtensionService Calls

```typescript
// sync() now requires extensionId parameter
const { selectionLimit, selectedAssets } =
  await SelectContentExtensionService.sync(guestConnection, extensionId);

// setSelectedAssets() is now synchronous (remove await)
SelectContentExtensionService.setSelectedAssets(
  guestConnection,
  extensionId,
  selectedAssets,
);
```

#### 3. Implement uploadAndGetUrl Method

Add the required `uploadAndGetUrl` method to your extension registration for asset upload workflows.

### Migration Checklist

- Update SDK to v4.1.0
- Update `sync()` calls to include `extensionId` parameter and handle returned `selectedAssets`
- Update `setSelectedAssets()` calls to be synchronous (remove `await`)
- Add required fields to Asset objects: `mimeType`, `size`
- Restructure Asset with `externalAssetInfo` and `extensionInfo` nested objects
- Implement `uploadAndGetUrl` method in extension registration
- Add `upload-and-get-url` action to `app.config.yaml`
- Test asset selection and upload workflows

### Documentation

- [API Documentation](./docs/api/)
- [Migration Guide](./docs/migration-v4.md)
- [External DAM Example](./examples/genstudio-external-dam-app/)

---

## [3.0.0] - 2025-08-25

### Major Release - Service Architecture Refactor

This release introduces a complete restructuring of the extension services architecture, providing better separation of concerns and improved developer experience.

### Breaking Changes

#### Deprecated Services

The following services have been **deprecated** and will be removed in future versions:

- `ExtensionRegistrationService`
- `ExperienceService`
- `GenerationContextService`

#### New Services

These services **replace** the deprecated ones:

- `ValidationExtensionService`
- `PromptExtensionService`
- `SelectContentExtensionService`

### Migration Guide

#### 1. ExtensionRegistrationService → ValidationExtensionService & PromptExtensionService

| **Old Method**                              | **New Method**                                      | **Service**    |
| ------------------------------------------- | --------------------------------------------------- | -------------- |
| `openCreateAddOnBar()`                      | `ValidationExtensionService.open()`                 | Validation     |
| `openAddContextAddOnBar()`                  | `PromptExtensionService.open()`                     | Prompt         |
| `closeAddContextAddOnBar()`                 | `PromptExtensionService.close()`                    | Prompt         |
| `selectContentExtensionSetSelectedAssets()` | `SelectContentExtensionService.setSelectedAssets()` | Select Content |
| `selectContentExtensionSync()`              | `SelectContentExtensionService.sync()`              | Select Content |

#### 2. ExperienceService → ValidationExtensionService

| **Old Method**           | **New Method**                                      | **Service** |
| ------------------------ | --------------------------------------------------- | ----------- |
| `getExperiences()`       | `ValidationExtensionService.getExperiences()`       | Validation  |
| `getGenerationContext()` | `ValidationExtensionService.getGenerationContext()` | Validation  |

#### 3. GenerationContextService → PromptExtensionService

| **Old Method**           | **New Method**                                     | **Service** |
| ------------------------ | -------------------------------------------------- | ----------- |
| `setAdditionalContext()` | `PromptExtensionService.updateAdditionalContext()` | Prompt      |
| `getGenerationContext()` | `PromptExtensionService.getGenerationContext()`    | Prompt      |

### Quick Migration Example

```typescript
// Old way
const extensionService = new ExtensionRegistrationService();
extensionService.openCreateAddOnBar();

// New way
const validationService = new ValidationExtensionService();
validationService.open();
```

### Documentation

- [API Documentation](./docs/api/)
- [Migration Guide](./docs/migration.md)
- [Examples](./docs/examples/)

---

## Previous Versions

_For earlier versions, please refer to the git history or previous release notes._
