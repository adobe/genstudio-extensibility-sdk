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

import { GuestUI } from "@adobe/uix-guest";
import { VirtualApi } from "@adobe/uix-core";
import { GenerationContext, AdditionalContext } from "../types/generationContext/GenerationContext";

export interface PromptExtensionApi extends VirtualApi {
  api: {
    promptExtension: {
      open: (extensionId: string) => void;
      close: () => void;
      getGenerationContext: () => Promise<GenerationContext>;
      updateAdditionalContext: (additionalContext: AdditionalContext<any>) => void;
    };
  };
}

export class PromptExtensionServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PromptExtensionServiceError";
  }
}

/**
 * Manages prompt extension functionality
 */
export class PromptExtensionService {
  /**
   * Opens the prompt extension
   * @param connection - The guest connection to the host
   * @param extensionId - The ID of the extension to open
   * @throws Error if connection is missing
   */
  static open(
    connection: GuestUI<PromptExtensionApi>,
    extensionId: string
  ): void {
    if (!connection) {
      throw new PromptExtensionServiceError("Connection is required to open prompt extension");
    }
    
    try {
      // @ts-ignore Remote API is handled through postMessage
      connection.host.api.promptExtension.open(extensionId);
    } catch (error) {
      throw new PromptExtensionServiceError("Failed to open prompt extension");
    }
  }

  /**
   * Closes the prompt extension
   * @param connection - The guest connection to the host
   * @throws Error if connection is missing
   */
  static close(
    connection: GuestUI<PromptExtensionApi>
  ): void {
    if (!connection) {
      throw new PromptExtensionServiceError("Connection is required to close prompt extension");
    }
    
    try {
      // @ts-ignore Remote API is handled through postMessage
      connection.host.api.promptExtension.close();
    } catch (error) {
      throw new PromptExtensionServiceError("Failed to close prompt extension");
    }
  }

  /**
   * Gets the generation context from the prompt extension
   * @param connection - The guest connection to the host
   * @returns Promise<GenerationContext> The generation context
   * @throws Error if connection is missing
   */
  static async getGenerationContext(
    connection: GuestUI<PromptExtensionApi>
  ): Promise<GenerationContext> {
    if (!connection) {
      throw new PromptExtensionServiceError("Connection is required to get generation context");
    }
    
    try {
      // @ts-ignore Remote API is handled through postMessage
      return await connection.host.api.promptExtension.getGenerationContext();
    } catch (error) {
      throw new PromptExtensionServiceError("Failed to get generation context from prompt extension");
    }
  }

  /**
   * Updates the additional context in the prompt extension
   * @param connection - The guest connection to the host
   * @param context - The additional context to update
   * @throws Error if connection is missing
   */
  static updateAdditionalContext(
    connection: GuestUI<PromptExtensionApi>,
    context: AdditionalContext<any>
  ): void {
    if (!connection) {
      throw new PromptExtensionServiceError("Connection is required to update additional context");
    }
    
    try {
      // @ts-ignore Remote API is handled through postMessage
      connection.host.api.promptExtension.updateAdditionalContext(context);
    } catch (error) {
      throw new PromptExtensionServiceError("Failed to update additional context in prompt extension");
    }
  }

}
