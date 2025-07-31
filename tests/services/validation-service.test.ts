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

import { ValidationService, ValidationServiceError, RightPanelApi } from '../../src/services/validation-service';
import { GuestUI } from '@adobe/uix-guest';
import { GenerationContext } from '../../src/types/generationContext/GenerationContext';

const createMockConnection = (getExperiencesMock?: jest.Mock, getGenerationContextMock?: jest.Mock) => ({
  host: {
    api: {
      validationExtension: {
        getExperiences: getExperiencesMock,
        getGenerationContext: getGenerationContextMock
      }
    }
  }
} as unknown as GuestUI<RightPanelApi>);

describe('ValidationService', () => {
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

  describe('getExperiences', () => {
    it('should fetch experiences', async () => {
      const mockGetExperiences = jest.fn().mockResolvedValue([mockRawExperience]);
      const mockConnection = createMockConnection(mockGetExperiences);

      const results = await ValidationService.getExperiences(mockConnection);
      
      expect(mockGetExperiences).toHaveBeenCalled();

      results.forEach(result => {
        expect(result.id).toBeDefined();
        expect(result.experienceFields).toBeDefined();
        expect(typeof result.experienceFields).toBe('object');
        expect(result.metadata).toBeDefined();
        expect(typeof result.metadata).toBe('object');
      });
    });

    it('should throw ExperienceError on API failure', async () => {
      const mockGetExperiences = jest.fn().mockRejectedValue(new Error('API Error'));
      const mockConnection = createMockConnection(mockGetExperiences);

      await expect(ValidationService.getExperiences(mockConnection))
        .rejects
        .toThrow(ValidationServiceError);
      await expect(ValidationService.getExperiences(mockConnection))
        .rejects
        .toThrow('Failed to fetch experiences from host');
    });

    it('should throw ExperienceError if connection is missing', async () => {
      // @ts-ignore Testing null case explicitly
      await expect(ValidationService.getExperiences(null))
        .rejects
        .toThrow(ValidationServiceError);
      // @ts-ignore Testing null case explicitly  
      await expect(ValidationService.getExperiences(null))
        .rejects
        .toThrow('Connection is required to get experiences');
    });
  });

  describe("getGenerationContext", () => {
    it("should get generation context", async () => {
      const mockGetGenerationContext = jest.fn().mockResolvedValue(mockGenerationContext);
      const mockConnection = createMockConnection(undefined, mockGetGenerationContext);
      const generationContext = await ValidationService.getGenerationContext(mockConnection);
      expect(generationContext).toEqual(mockGenerationContext);
    });

    it("should throw GenerationContextError if connection is missing", async () => {
      const connection = null;
      await expect(ValidationService.getGenerationContext(
        connection as unknown as GuestUI<RightPanelApi>
      )).rejects.toThrow(new ValidationServiceError('Connection is required to get generation context'));
    });

    it("should throw ExperienceError on API failure", async () => {
      const mockGetGenerationContext = jest.fn().mockRejectedValue(new Error('API Error'));
      const mockConnection = createMockConnection(undefined, mockGetGenerationContext);
      await expect(ValidationService.getGenerationContext(mockConnection))
        .rejects
        .toThrow(new ValidationServiceError('Failed to get generation context'));
    });
  });
});
