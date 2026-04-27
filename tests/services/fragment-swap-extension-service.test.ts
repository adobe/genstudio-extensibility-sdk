/*
Copyright 2026 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
  FragmentSwapExtensionService,
  FragmentSwapExtensionServiceError,
  FragmentSwapExtensionApi,
} from "../../src/services";
import { GuestUI } from "@adobe/uix-guest";
import { GenerationContext } from "../../src/types/generationContext/GenerationContext";

type ConnectionMocks = {
  openMock?: jest.Mock;
  closeMock?: jest.Mock;
  getExperienceMock?: jest.Mock;
  getGenerationContextMock?: jest.Mock;
  getSelectedFieldMock?: jest.Mock;
  setSwapValueMock?: jest.Mock;
};

const createMockConnection = ({
  openMock,
  closeMock,
  getExperienceMock,
  getGenerationContextMock,
  getSelectedFieldMock,
  setSwapValueMock,
}: ConnectionMocks = {}) =>
  ({
    host: {
      api: {
        fragmentSwapExtension: {
          open: openMock || jest.fn(),
          close: closeMock || jest.fn(),
          getExperience: getExperienceMock || jest.fn(),
          getGenerationContext: getGenerationContextMock || jest.fn(),
          getSelectedField: getSelectedFieldMock || jest.fn(),
          setSwapValue: setSwapValueMock || jest.fn(),
        },
      },
    },
  }) as unknown as GuestUI<FragmentSwapExtensionApi>;

describe("FragmentSwapExtensionService", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockExperience = {
    id: "exp123",
    experienceFields: {
      name: {
        fieldName: "name",
        fieldValue: "Test Experience",
      },
      description: {
        fieldName: "description",
        fieldValue: "Test Description",
      },
    },
    metadata: {
      locale: "en-US",
      random_key: "random_value",
    },
  };

  const mockGenerationContext: GenerationContext = {
    id: "123",
    userPrompt: "test-user-prompt",
  };

  describe("open", () => {
    it("should open fragment swap extension successfully", () => {
      const mockOpen = jest.fn();
      const mockConnection = createMockConnection({ openMock: mockOpen });
      const extensionId = "test-extension-id";

      FragmentSwapExtensionService.open(mockConnection, extensionId);

      expect(mockOpen).toHaveBeenCalledWith(extensionId);
      expect(mockOpen).toHaveBeenCalledTimes(1);
    });

    it("should throw FragmentSwapExtensionServiceError if connection is missing", () => {
      const extensionId = "test-extension-id";

      // @ts-ignore Testing null case explicitly
      expect(() => FragmentSwapExtensionService.open(null, extensionId)).toThrow(
        FragmentSwapExtensionServiceError,
      );
      // @ts-ignore Testing null case explicitly
      expect(() => FragmentSwapExtensionService.open(null, extensionId)).toThrow(
        "Connection is required to open swap field extension",
      );
    });

    it("should throw FragmentSwapExtensionServiceError on API failure", () => {
      const mockOpen = jest.fn().mockImplementation(() => {
        throw new Error("API Error");
      });
      const mockConnection = createMockConnection({ openMock: mockOpen });
      const extensionId = "test-extension-id";

      expect(() =>
        FragmentSwapExtensionService.open(mockConnection, extensionId),
      ).toThrow(FragmentSwapExtensionServiceError);
      expect(() =>
        FragmentSwapExtensionService.open(mockConnection, extensionId),
      ).toThrow("Failed to open swap field extension");
    });

    it("should handle empty extensionId", () => {
      const mockOpen = jest.fn();
      const mockConnection = createMockConnection({ openMock: mockOpen });
      const extensionId = "";

      FragmentSwapExtensionService.open(mockConnection, extensionId);

      expect(mockOpen).toHaveBeenCalledWith(extensionId);
    });
  });

  describe("close", () => {
    it("should close fragment swap extension successfully", () => {
      const mockClose = jest.fn();
      const mockConnection = createMockConnection({ closeMock: mockClose });

      FragmentSwapExtensionService.close(mockConnection);

      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it("should throw FragmentSwapExtensionServiceError if connection is missing", () => {
      // @ts-ignore Testing null case explicitly
      expect(() => FragmentSwapExtensionService.close(null)).toThrow(
        FragmentSwapExtensionServiceError,
      );
      // @ts-ignore Testing null case explicitly
      expect(() => FragmentSwapExtensionService.close(null)).toThrow(
        "Connection is required to close fragment swap extension",
      );
    });

    it("should throw FragmentSwapExtensionServiceError on API failure", () => {
      const mockClose = jest.fn().mockImplementation(() => {
        throw new Error("API Error");
      });
      const mockConnection = createMockConnection({ closeMock: mockClose });

      expect(() =>
        FragmentSwapExtensionService.close(mockConnection),
      ).toThrow(FragmentSwapExtensionServiceError);
      expect(() =>
        FragmentSwapExtensionService.close(mockConnection),
      ).toThrow("Failed to close fragment swap extension");
    });
  });

  describe("getExperience", () => {
    it("should fetch experience", async () => {
      const mockGetExperience = jest
        .fn()
        .mockResolvedValue(mockExperience);
      const mockConnection = createMockConnection({
        getExperienceMock: mockGetExperience,
      });

      const result =
        await FragmentSwapExtensionService.getExperience(mockConnection);

      expect(mockGetExperience).toHaveBeenCalled();
      expect(result.id).toBeDefined();
      expect(result.experienceFields).toBeDefined();
      expect(typeof result.experienceFields).toBe("object");
      expect(result.metadata).toBeDefined();
      expect(typeof result.metadata).toBe("object");
    });

    it("should throw FragmentSwapExtensionServiceError on API failure", async () => {
      const mockGetExperience = jest
        .fn()
        .mockRejectedValue(new Error("API Error"));
      const mockConnection = createMockConnection({
        getExperienceMock: mockGetExperience,
      });

      await expect(
        FragmentSwapExtensionService.getExperience(mockConnection),
      ).rejects.toThrow(FragmentSwapExtensionServiceError);
      await expect(
        FragmentSwapExtensionService.getExperience(mockConnection),
      ).rejects.toThrow("Failed to get experience from host");
    });

    it("should throw FragmentSwapExtensionServiceError if connection is missing", async () => {
      // @ts-ignore Testing null case explicitly
      await expect(
        FragmentSwapExtensionService.getExperience(null),
      ).rejects.toThrow(FragmentSwapExtensionServiceError);
      // @ts-ignore Testing null case explicitly
      await expect(
        FragmentSwapExtensionService.getExperience(null),
      ).rejects.toThrow("Connection is required to get experience");
    });
  });

  describe("getGenerationContext", () => {
    it("should get generation context", async () => {
      const mockGetGenerationContext = jest
        .fn()
        .mockResolvedValue(mockGenerationContext);
      const mockConnection = createMockConnection({
        getGenerationContextMock: mockGetGenerationContext,
      });
      const generationContext =
        await FragmentSwapExtensionService.getGenerationContext(mockConnection);
      expect(generationContext).toEqual(mockGenerationContext);
    });

    it("should throw FragmentSwapExtensionServiceError if connection is missing", async () => {
      const connection = null;
      await expect(
        FragmentSwapExtensionService.getGenerationContext(
          connection as unknown as GuestUI<FragmentSwapExtensionApi>,
        ),
      ).rejects.toThrow(
        new FragmentSwapExtensionServiceError(
          "Connection is required to get generation context",
        ),
      );
    });

    it("should throw FragmentSwapExtensionServiceError on API failure", async () => {
      const mockGetGenerationContext = jest
        .fn()
        .mockRejectedValue(new Error("API Error"));
      const mockConnection = createMockConnection({
        getGenerationContextMock: mockGetGenerationContext,
      });
      await expect(
        FragmentSwapExtensionService.getGenerationContext(mockConnection),
      ).rejects.toThrow(
        new FragmentSwapExtensionServiceError(
          "Failed to get generation context from host",
        ),
      );
    });
  });

  describe("getSelectedField", () => {
    const mockSelectedField = {
      experienceId: "exp123",
      name: "headline",
      value: "Original headline value",
    };

    it("should fetch the selected field", async () => {
      const mockGetSelectedField = jest.fn().mockResolvedValue(mockSelectedField);
      const mockConnection = createMockConnection({
        getSelectedFieldMock: mockGetSelectedField,
      });

      const result = await FragmentSwapExtensionService.getSelectedField(mockConnection);

      expect(mockGetSelectedField).toHaveBeenCalled();
      expect(result).toEqual(mockSelectedField);
    });

    it("should throw FragmentSwapExtensionServiceError if connection is missing", async () => {
      // @ts-ignore Testing null case explicitly
      await expect(
        FragmentSwapExtensionService.getSelectedField(null),
      ).rejects.toThrow(FragmentSwapExtensionServiceError);
      // @ts-ignore Testing null case explicitly
      await expect(
        FragmentSwapExtensionService.getSelectedField(null),
      ).rejects.toThrow("Connection is required to get selected field");
    });

    it("should throw FragmentSwapExtensionServiceError on API failure", async () => {
      const mockGetSelectedField = jest
        .fn()
        .mockRejectedValue(new Error("API Error"));
      const mockConnection = createMockConnection({
        getSelectedFieldMock: mockGetSelectedField,
      });

      await expect(
        FragmentSwapExtensionService.getSelectedField(mockConnection),
      ).rejects.toThrow(FragmentSwapExtensionServiceError);
      await expect(
        FragmentSwapExtensionService.getSelectedField(mockConnection),
      ).rejects.toThrow("Failed to get selected field from host");
    });
  });

  describe("setSwapValue", () => {
    it("should call setSwapValue with the correct payload", () => {
      const mockSetSwapValue = jest.fn();
      const mockConnection = createMockConnection({ setSwapValueMock: mockSetSwapValue });

      FragmentSwapExtensionService.setSwapValue(mockConnection, "new headline text");

      expect(mockSetSwapValue).toHaveBeenCalledWith("new headline text");
      expect(mockSetSwapValue).toHaveBeenCalledTimes(1);
    });

    it("should throw FragmentSwapExtensionServiceError if connection is missing", () => {
      // @ts-ignore Testing null case explicitly
      expect(() => FragmentSwapExtensionService.setSwapValue(null, "new headline text")).toThrow(
        FragmentSwapExtensionServiceError,
      );
      // @ts-ignore Testing null case explicitly
      expect(() => FragmentSwapExtensionService.setSwapValue(null, "new headline text")).toThrow(
        "Connection is required to set swap value",
      );
    });

    it("should throw FragmentSwapExtensionServiceError on API failure", () => {
      const mockSetSwapValue = jest.fn().mockImplementation(() => {
        throw new Error("API Error");
      });
      const mockConnection = createMockConnection({ setSwapValueMock: mockSetSwapValue });

      expect(() =>
        FragmentSwapExtensionService.setSwapValue(mockConnection, "new headline text"),
      ).toThrow(FragmentSwapExtensionServiceError);
      expect(() =>
        FragmentSwapExtensionService.setSwapValue(mockConnection, "new headline text"),
      ).toThrow("Failed to set swap value");
    });

    it("should pass the full FieldUpdate payload to the host API", () => {
      const mockSetSwapValue = jest.fn();
      const mockConnection = createMockConnection({ setSwapValueMock: mockSetSwapValue });

      FragmentSwapExtensionService.setSwapValue(mockConnection, "new headline text");

      expect(mockSetSwapValue).toHaveBeenCalledTimes(1);
      expect(mockSetSwapValue).toHaveBeenCalledWith("new headline text");
    });
  });
});
