# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-01-21

### Added
- **New Prompt Extension Service**: Added comprehensive `PromptExtensionService` class with full API support
  - `open()` method for opening prompt extensions
  - `close()` method for closing prompt extensions  
  - `getGenerationContext()` method for retrieving generation context
  - `updateAdditionalContext()` method for updating additional context data
  - Full error handling with `PromptExtensionServiceError` class
  - Type-safe `PromptExtensionApi` interface

- **Enhanced Validation Service**: Improved `ValidationExtensionService` with comprehensive functionality
  - **`getExperiences(connection)`**: Fetches and retrieves experiences from the validation extension
  - **`getGenerationContext(connection)`**: Retrieves the current generation context from the validation extension
  - **`open(connection, extensionId)`**: Opens the validation extension with the specified extension ID
  - **Enhanced error handling**: Comprehensive error management with `ValidationExtensionServiceError`
  - **Better connection management**: Robust connection validation and API interaction

- **Comprehensive Test Coverage**: Added extensive unit test suites
  - Complete test coverage for `PromptExtensionService` (24 tests)
  - Enhanced test coverage for `ValidationExtensionService` including `open()` method
  - Mock connection factories for reliable testing
  - Edge case testing for null/undefined connections
  - API failure scenario testing
  - Integration tests for multiple operations


### Deprecated
- **ExperienceService**: This service is now deprecated and will be removed in version 2.0.0
  - **Replacement**: Use `ValidationExtensionService` instead
  - **Migration**: 
    - `ExperienceService.getExperiences()` → `ValidationExtensionService.getExperiences()`
    - `ExperienceService.getGenerationContext()` → `ValidationExtensionService.getGenerationContext()`

- **GenerationContextService**: This service is now deprecated and will be removed in version 2.0.0
  - **Replacement**: Use `PromptExtensionService` instead
  - **Migration**:
    - `GenerationContextService.setAdditionalContext()` → `PromptExtensionService.updateAdditionalContext()`
    - `GenerationContextService.getGenerationContext()` → `PromptExtensionService.getGenerationContext()`

### Interface Changes
- **RightPanelApi**: This interface has been replaced with service-specific APIs
  - **Replacement**: Use `ValidationExtensionApi` or `PromptExtensionApi` instead
  - **Migration Examples**:
    ```typescript
    // OLD (Deprecated)
    import { RightPanelApi } from '@adobe/genstudio-extensibility-sdk';
    
    // NEW (Recommended)
    import { ValidationExtensionApi } from '@adobe/genstudio-extensibility-sdk';
    import { PromptExtensionApi } from '@adobe/genstudio-extensibility-sdk';
    
    // Usage Examples:
    // For validation operations
    const validationConnection: GuestUI<ValidationExtensionApi> = await register({
      id: 'validation-extension',
      methods: {
        validationExtension: {
          getExperiences: async () => [...],
          getGenerationContext: async () => {...},
          open: (extensionId: string) => {...}
        }
      }
    });
    
    // For prompt operations  
    const promptConnection: GuestUI<PromptExtensionApi> = await register({
      id: 'prompt-extension',
      methods: {
        promptExtension: {
          open: (extensionId: string) => {...},
          close: () => {...},
          getGenerationContext: async () => {...},
          updateAdditionalContext: (context: AdditionalContext<any>) => {...}
        }
      }
    });
    ```

### Removed
- **Prompt Service Dependencies**: Cleaned up unused prompt service references
  - Removed prompt service from main exports
  - Cleaned up services index file
  - Eliminated unused dependencies

### Technical Improvements
- **Type Safety**: Enhanced TypeScript type definitions
  - Better interface definitions
  - Improved error type handling
  - More precise API contracts

- **Error Handling**: Standardized error handling across services
  - Consistent error message formats
  - Proper error inheritance
  - Better error context information

- **Testing Infrastructure**: Improved test setup and organization
  - Jest-based testing framework
  - Comprehensive mock factories
  - Better test isolation
  - Improved test readability

## [2.5.1] - Previous Release

---

## Development Notes

### Testing
- Run tests with: `npm test`
- Run specific test file: `npm test tests/services/prompt-service.test.ts`
- Build project: `npm run build`

### Import Patterns
```typescript
// Class-based usage
import { PromptExtensionService } from '@adobe/genstudio-extensibility-sdk';

// Function-based usage (new)
import { getExperiences, open } from '@adobe/genstudio-extensibility-sdk';
```

### Breaking Changes
- None - all changes are backward compatible
- Existing imports continue to work
- New functionality is additive

### Migration Guide
- **For Existing Code**: While existing code will continue to work, consider migrating to new services
- **New Functions Available**: Improved developer experience with standalone function exports
- **Enhanced Error Handling**: Better debugging and error context information

#### **Required Migrations (Deprecated Services):**
```typescript
// OLD (Deprecated) - Will be removed in v2.0.0
import { ExperienceService } from '@adobe/genstudio-extensibility-sdk';
import { GenerationContextService } from '@adobe/genstudio-extensibility-sdk';

// NEW (Recommended)
import { ValidationExtensionService } from '@adobe/genstudio-extensibility-sdk';
import { PromptExtensionService } from '@adobe/genstudio-extensibility-sdk';

// Migration Examples:
// ExperienceService.getExperiences(connection) 
// → ValidationExtensionService.getExperiences(connection)

// ExperienceService.getGenerationContext(connection)
// → ValidationExtensionService.getGenerationContext(connection)

// GenerationContextService.setAdditionalContext(connection, context)
// → PromptExtensionService.updateAdditionalContext(connection, context)

// GenerationContextService.getGenerationContext(connection)
// → PromptExtensionService.getGenerationContext(connection)
```

#### **Timeline:**
- **v2.5.1**: Deprecation warnings added
- **v2.0.0**: Deprecated services will be removed
- **Current**: Both old and new services available for backward compatibility
