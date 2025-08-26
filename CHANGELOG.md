# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

| **Old Method** | **New Method** | **Service** |
|----------------|----------------|-------------|
| `openCreateAddOnBar()` | `ValidationExtensionService.open()` | Validation |
| `openAddContextAddOnBar()` | `PromptExtensionService.open()` | Prompt |
| `closeAddContextAddOnBar()` | `PromptExtensionService.close()` | Prompt |
| `selectContentExtensionSetSelectedAssets()` | `SelectContentExtensionService.setSelectedAssets()` | Select Content |
| `selectContentExtensionSync()` | `SelectContentExtensionService.sync()` | Select Content |

#### 2. ExperienceService → ValidationExtensionService

| **Old Method** | **New Method** | **Service** |
|----------------|----------------|-------------|
| `getExperiences()` | `ValidationExtensionService.getExperiences()` | Validation |
| `getGenerationContext()` | `ValidationExtensionService.getGenerationContext()` | Validation |

#### 3. GenerationContextService → PromptExtensionService

| **Old Method** | **New Method** | **Service** |
|----------------|----------------|-------------|
| `setAdditionalContext()` | `PromptExtensionService.updateAdditionalContext()` | Prompt |
| `getGenerationContext()` | `PromptExtensionService.getGenerationContext()` | Prompt |

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

*For earlier versions, please refer to the git history or previous release notes.*
