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

import { ValidationExtensionService, ValidationExtensionServiceError, ValidationExtensionApi } from '../../src/services';
import { GuestUI } from '@adobe/uix-guest';
import { GenerationContext } from '../../src/types/generationContext/GenerationContext';

const createMockConnection = (
  getExperiencesMock?: jest.Mock, 
  getGenerationContextMock?: jest.Mock,
  openMock?: jest.Mock
) => ({
  host: {
    api: {
      validationExtension: {
        getExperiences: getExperiencesMock || jest.fn(),
        getGenerationContext: getGenerationContextMock || jest.fn(),
        open: openMock || jest.fn()
      }
    }
  }
} as unknown as GuestUI<ValidationExtensionApi>);

describe('ValidationExtensionService', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockRawExperience = {
    id: 'exp123',
    experienceFields: {
      name: {
        fieldName: 'name',
        fieldValue: 'Test Experience'
      },
      description: {
        fieldName: 'description',
        fieldValue: 'Test Description'
      },
    },
    metadata: {
      locale: 'en-US',
      random_key: 'random_value'
    }
  };

  const mockGenerationContext: GenerationContext = {
    id: "123",
    userPrompt: "test-user-prompt"
  };

  describe('constructor', () => {
    it('should create an instance with connection', () => {
      const mockConnection = createMockConnection();
      const service = new ValidationExtensionService(mockConnection);
      expect(service).toBeInstanceOf(ValidationExtensionService);
    });
  });

  describe('getExperiences', () => {
    it('should fetch experiences', async () => {
      const mockGetExperiences = jest.fn().mockResolvedValue([mockRawExperience]);
      const mockConnection = createMockConnection(mockGetExperiences, undefined, undefined);
      const service = new ValidationExtensionService(mockConnection);

      const results = await service.getExperiences();
      
      expect(mockGetExperiences).toHaveBeenCalled();

      results.forEach(result => {
        expect(result.id).toBeDefined();
        expect(result.experienceFields).toBeDefined();
        expect(typeof result.experienceFields).toBe('object');
        expect(result.metadata).toBeDefined();
        expect(typeof result.metadata).toBe('object');
      });
    });

    it('should throw ValidationExtensionServiceError on API failure', async () => {
      const mockGetExperiences = jest.fn().mockRejectedValue(new Error('API Error'));
      const mockConnection = createMockConnection(mockGetExperiences, undefined, undefined);
      const service = new ValidationExtensionService(mockConnection);

      await expect(service.getExperiences())
        .rejects
        .toThrow(ValidationExtensionServiceError);
      await expect(service.getExperiences())
        .rejects
        .toThrow('Failed to fetch experiences from host');
    });

    it('should throw ValidationExtensionServiceError if connection is missing', async () => {
      // @ts-ignore Testing null case explicitly
      const service = new ValidationExtensionService(null);

      await expect(service.getExperiences())
        .rejects
        .toThrow(ValidationExtensionServiceError);
      await expect(service.getExperiences())
        .rejects
        .toThrow('Connection is required to get experiences');
    });
  });

  describe("getGenerationContext", () => {
    it("should get generation context", async () => {
      const mockGetGenerationContext = jest.fn().mockResolvedValue(mockGenerationContext);
      const mockConnection = createMockConnection(undefined, mockGetGenerationContext, undefined);
      const service = new ValidationExtensionService(mockConnection);
      const generationContext = await service.getGenerationContext();
      expect(generationContext).toEqual(mockGenerationContext);
    });

    it("should throw ValidationExtensionServiceError if connection is missing", async () => {
      // @ts-ignore Testing null case explicitly
      const service = new ValidationExtensionService(null);
      await expect(service.getGenerationContext())
        .rejects
        .toThrow(new ValidationExtensionServiceError('Connection is required to get generation context'));
    });

    it("should throw ValidationExtensionServiceError on API failure", async () => {
      const mockGetGenerationContext = jest.fn().mockRejectedValue(new Error('API Error'));
      const mockConnection = createMockConnection(undefined, mockGetGenerationContext, undefined);
      const service = new ValidationExtensionService(mockConnection);
      await expect(service.getGenerationContext())
        .rejects
        .toThrow(new ValidationExtensionServiceError('Failed to get generation context'));
    });
  });

  describe('open', () => {
    it('should open validation extension successfully', () => {
      const mockOpen = jest.fn();
      const mockConnection = createMockConnection(undefined, undefined, mockOpen);
      const service = new ValidationExtensionService(mockConnection);
      const extensionId = 'test-extension-id';

      service.open(extensionId);

      expect(mockOpen).toHaveBeenCalledWith(extensionId);
      expect(mockOpen).toHaveBeenCalledTimes(1);
    });

    it('should throw ValidationExtensionServiceError if connection is missing', () => {
      // @ts-ignore Testing null case explicitly
      const service = new ValidationExtensionService(null);
      const extensionId = 'test-extension-id';

      expect(() => service.open(extensionId))
        .toThrow(ValidationExtensionServiceError);
      expect(() => service.open(extensionId))
        .toThrow('Connection is required to open validation extension');
    });

    it('should throw ValidationExtensionServiceError on API failure', () => {
      const mockOpen = jest.fn().mockImplementation(() => {
        throw new Error('API Error');
      });
      const mockConnection = createMockConnection(undefined, undefined, mockOpen);
      const service = new ValidationExtensionService(mockConnection);
      const extensionId = 'test-extension-id';

      expect(() => service.open(extensionId))
        .toThrow(ValidationExtensionServiceError);
      expect(() => service.open(extensionId))
        .toThrow('Failed to open validation extension');
    });

    it('should handle empty extensionId', () => {
      const mockOpen = jest.fn();
      const mockConnection = createMockConnection(undefined, undefined, mockOpen);
      const service = new ValidationExtensionService(mockConnection);
      const extensionId = '';

      service.open(extensionId);

      expect(mockOpen).toHaveBeenCalledWith(extensionId);
    });
  });
  
});
