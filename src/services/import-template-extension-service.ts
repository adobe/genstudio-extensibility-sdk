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

import { VirtualApi } from "@adobe/uix-core";
import { Template } from "../types";

export interface ImportTemplateExtensionApi extends VirtualApi {
  api: {
    importTemplateExtension: {
      setSelectedTemplate: (extensionId: string, template: Template) => void;
    };
  };
}

export class ImportTemplateExtensionServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImportTemplateExtensionServiceError";
  }
}

export class ImportTemplateExtensionService {
  /**
   * Set the selected template
   * @param extensionId - the extension id of the import template add ons
   * @param template - the selected template
   */
  static setSelectedTemplate(
    connection: any,
    extensionId: string,
    template: Template,
  ): void {
    if (!connection) {
      throw new ImportTemplateExtensionServiceError("Connection is required to set selected template");
    }

    // @ts-ignore Remote API is handled through postMessage
    return connection.host.api.importTemplateExtension.setSelectedTemplate(
      extensionId,
      template,
    );
  }
}
