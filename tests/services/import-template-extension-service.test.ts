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

import {
  ImportTemplateExtensionService,
  ImportTemplateExtensionServiceError,
  ImportTemplateExtensionApi,
} from "../../src/services/import-template-extension-service";
import { GuestUI } from "@adobe/uix-guest";
import { Template } from "../../src/types";

const createMockConnection = (setSelectedTemplateMock?: jest.Mock) =>
  ({
    host: {
      api: {
        importTemplateExtension: {
          setSelectedTemplate: setSelectedTemplateMock || jest.fn(),
        },
      },
    },
  } as unknown as GuestUI<ImportTemplateExtensionApi>);

describe("ImportTemplateExtensionService", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockTemplate: Template = {
    id: "tpl-123",
    title: "Test Template",
    content: "Hello, {{name}}",
    mapping: {
      name: "headline",
    },
  };

  describe("setSelectedTemplate", () => {
    it("should set selected template successfully", () => {
      const mockSetSelectedTemplate = jest.fn();
      const mockConnection = createMockConnection(mockSetSelectedTemplate);
      const extensionId = "test-extension-id";

      ImportTemplateExtensionService.setSelectedTemplate(
        mockConnection,
        extensionId,
        mockTemplate,
      );

      expect(mockSetSelectedTemplate).toHaveBeenCalledWith(
        extensionId,
        mockTemplate,
      );
      expect(mockSetSelectedTemplate).toHaveBeenCalledTimes(1);
    });

    it("should throw ImportTemplateExtensionServiceError if connection is missing", () => {
      const extensionId = "test-extension-id";

      expect(() =>
        ImportTemplateExtensionService.setSelectedTemplate(
          null,
          extensionId,
          mockTemplate,
        ),
      ).toThrow(ImportTemplateExtensionServiceError);

      expect(() =>
        ImportTemplateExtensionService.setSelectedTemplate(
          null,
          extensionId,
          mockTemplate,
        ),
      ).toThrow("Connection is required to set selected template");
    });

    it("should handle empty extensionId", () => {
      const mockSetSelectedTemplate = jest.fn();
      const mockConnection = createMockConnection(mockSetSelectedTemplate);
      const extensionId = "";

      ImportTemplateExtensionService.setSelectedTemplate(
        mockConnection,
        extensionId,
        mockTemplate,
      );

      expect(mockSetSelectedTemplate).toHaveBeenCalledWith(
        extensionId,
        mockTemplate,
      );
    });

    it("should handle minimal template mapping", () => {
      const mockSetSelectedTemplate = jest.fn();
      const mockConnection = createMockConnection(mockSetSelectedTemplate);
      const extensionId = "test-extension-id";
      const minimalTemplate: Template = {
        id: "tpl-456",
        title: "Empty Mapping",
        content: "Static content",
        mapping: {},
      };

      ImportTemplateExtensionService.setSelectedTemplate(
        mockConnection,
        extensionId,
        minimalTemplate,
      );

      expect(mockSetSelectedTemplate).toHaveBeenCalledWith(
        extensionId,
        minimalTemplate,
      );
    });
  });
});
