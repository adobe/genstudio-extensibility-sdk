/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { PromptExtensionService, PromptExtensionServiceError, PromptExtensionApi } from '../../src/services/prompt-extension-service';
import { GuestUI } from '@adobe/uix-guest';
import { GenerationContext, AdditionalContext, AdditionalContextTypes } from '../../src/types/generationContext/GenerationContext';

const createMockConnection = (
  openMock?: jest.Mock,
  closeMock?: jest.Mock,
  getGenerationContextMock?: jest.Mock,
  updateAdditionalContextMock?: jest.Mock
) => ({
  host: {
    api: {
      promptExtension: {
        open: openMock || jest.fn(),
        close: closeMock || jest.fn(),
        getGenerationContext: getGenerationContextMock || jest.fn(),
        updateAdditionalContext: updateAdditionalContextMock || jest.fn()
      }
    }
  }
} as unknown as GuestUI<PromptExtensionApi>);

describe('PromptExtensionService', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockGenerationContext: GenerationContext = {
    id: "123",
    userPrompt: "test-user-prompt"
  };

  const mockAdditionalContext: AdditionalContext<any> = {
    extensionId: "test-extension",
    additionalContextType: AdditionalContextTypes.Claims,
    additionalContextValues: [
      {
        id: "claim1",
        description: "Test claim 1"
      },
      {
        id: "claim2", 
        description: "Test claim 2"
      }
    ]
  };

  describe('open', () => {
    it('should open prompt extension successfully', () => {
      const mockOpen = jest.fn();
      const mockConnection = createMockConnection(mockOpen);
      const extensionId = 'test-extension-id';

      PromptExtensionService.open(mockConnection, extensionId);

      expect(mockOpen).toHaveBeenCalledWith(extensionId);
      expect(mockOpen).toHaveBeenCalledTimes(1);
    });

    it('should throw PromptExtensionServiceError if connection is missing', () => {
      const extensionId = 'test-extension-id';

      // @ts-ignore Testing null case explicitly
      expect(() => PromptExtensionService.open(null, extensionId))
        .toThrow(PromptExtensionServiceError);
      // @ts-ignore Testing null case explicitly
      expect(() => PromptExtensionService.open(null, extensionId))
        .toThrow('Connection is required to open prompt extension');
    });

    it('should throw PromptExtensionServiceError on API failure', () => {
      const mockOpen = jest.fn().mockImplementation(() => {
        throw new Error('API Error');
      });
      const mockConnection = createMockConnection(mockOpen);
      const extensionId = 'test-extension-id';

      expect(() => PromptExtensionService.open(mockConnection, extensionId))
        .toThrow(PromptExtensionServiceError);
      expect(() => PromptExtensionService.open(mockConnection, extensionId))
        .toThrow('Failed to open prompt extension');
    });

    it('should handle empty extensionId', () => {
      const mockOpen = jest.fn();
      const mockConnection = createMockConnection(mockOpen);
      const extensionId = '';

      PromptExtensionService.open(mockConnection, extensionId);

      expect(mockOpen).toHaveBeenCalledWith(extensionId);
    });
  });

  describe('close', () => {
    it('should close prompt extension successfully', () => {
      const mockClose = jest.fn();
      const mockConnection = createMockConnection(undefined, mockClose);

      PromptExtensionService.close(mockConnection);

      expect(mockClose).toHaveBeenCalled();
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('should throw PromptExtensionServiceError if connection is missing', () => {
      // @ts-ignore Testing null case explicitly
      expect(() => PromptExtensionService.close(null))
        .toThrow(PromptExtensionServiceError);
      // @ts-ignore Testing null case explicitly
      expect(() => PromptExtensionService.close(null))
        .toThrow('Connection is required to close prompt extension');
    });

    it('should throw PromptExtensionServiceError on API failure', () => {
      const mockClose = jest.fn().mockImplementation(() => {
        throw new Error('API Error');
      });
      const mockConnection = createMockConnection(undefined, mockClose);

      expect(() => PromptExtensionService.close(mockConnection))
        .toThrow(PromptExtensionServiceError);
      expect(() => PromptExtensionService.close(mockConnection))
        .toThrow('Failed to close prompt extension');
    });
  });

  describe('getGenerationContext', () => {
    it('should get generation context successfully', async () => {
      const mockGetGenerationContext = jest.fn().mockResolvedValue(mockGenerationContext);
      const mockConnection = createMockConnection(undefined, undefined, mockGetGenerationContext);
      
      const result = await PromptExtensionService.getGenerationContext(mockConnection);
      
      expect(mockGetGenerationContext).toHaveBeenCalled();
      expect(result).toEqual(mockGenerationContext);
      expect(result.id).toBe("123");
      expect(result.userPrompt).toBe("test-user-prompt");
    });

    it('should throw PromptExtensionServiceError on API failure', async () => {
      const mockGetGenerationContext = jest.fn().mockRejectedValue(new Error('API Error'));
      const mockConnection = createMockConnection(undefined, undefined, mockGetGenerationContext);

      await expect(PromptExtensionService.getGenerationContext(mockConnection))
        .rejects
        .toThrow(PromptExtensionServiceError);
      await expect(PromptExtensionService.getGenerationContext(mockConnection))
        .rejects
        .toThrow('Failed to get generation context from prompt extension');
    });

    it('should throw PromptExtensionServiceError if connection is missing', async () => {
      // @ts-ignore Testing null case explicitly
      await expect(PromptExtensionService.getGenerationContext(null))
        .rejects
        .toThrow(PromptExtensionServiceError);
      // @ts-ignore Testing null case explicitly
      await expect(PromptExtensionService.getGenerationContext(null))
        .rejects
        .toThrow('Connection is required to get generation context');
    });
  });

  describe('updateAdditionalContext', () => {
    it('should update additional context successfully', () => {
      const mockUpdateAdditionalContext = jest.fn();
      const mockConnection = createMockConnection(undefined, undefined, undefined, mockUpdateAdditionalContext);

      PromptExtensionService.updateAdditionalContext(mockConnection, mockAdditionalContext);

      expect(mockUpdateAdditionalContext).toHaveBeenCalledWith(mockAdditionalContext);
      expect(mockUpdateAdditionalContext).toHaveBeenCalledTimes(1);
    });

    it('should throw PromptExtensionServiceError if connection is missing', () => {
      // @ts-ignore Testing null case explicitly
      expect(() => PromptExtensionService.updateAdditionalContext(null, mockAdditionalContext))
        .toThrow(PromptExtensionServiceError);
      // @ts-ignore Testing null case explicitly
      expect(() => PromptExtensionService.updateAdditionalContext(null, mockAdditionalContext))
        .toThrow('Connection is required to update additional context');
    });

    it('should throw PromptExtensionServiceError on API failure', () => {
      const mockUpdateAdditionalContext = jest.fn().mockImplementation(() => {
        throw new Error('API Error');
      });
      const mockConnection = createMockConnection(undefined, undefined, undefined, mockUpdateAdditionalContext);

      expect(() => PromptExtensionService.updateAdditionalContext(mockConnection, mockAdditionalContext))
        .toThrow(PromptExtensionServiceError);
      expect(() => PromptExtensionService.updateAdditionalContext(mockConnection, mockAdditionalContext))
        .toThrow('Failed to update additional context in prompt extension');
    });

    it('should handle different types of additional context', () => {
      const mockUpdateAdditionalContext = jest.fn();
      const mockConnection = createMockConnection(undefined, undefined, undefined, mockUpdateAdditionalContext);

      const differentContext: AdditionalContext<any> = {
        extensionId: "different-extension",
        additionalContextType: AdditionalContextTypes.Claims,
        additionalContextValues: [
          {
            id: "different-claim",
            description: "Different claim description"
          }
        ]
      };

      PromptExtensionService.updateAdditionalContext(mockConnection, differentContext);

      expect(mockUpdateAdditionalContext).toHaveBeenCalledWith(differentContext);
    });
  });
});
