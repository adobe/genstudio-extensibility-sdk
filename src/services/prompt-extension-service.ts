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
  private readonly connection: GuestUI<PromptExtensionApi>;

  constructor(connection: GuestUI<PromptExtensionApi>) {
    this.connection = connection;
  }

  /**
   * Opens the prompt extension
   * @param extensionId - The ID of the extension to open
   * @throws Error if connection is missing
   */
  open(extensionId: string): void {
    if (!this.connection) {
      throw new PromptExtensionServiceError("Connection is required to open prompt extension");
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      this.connection.host.api.promptExtension.open(extensionId);
    } catch (error) {
      throw new PromptExtensionServiceError("Failed to open prompt extension");
    }
  }

  /**
   * Closes the prompt extension
   * @throws Error if connection is missing
   */
  close(): void {
    if (!this.connection) {
      throw new PromptExtensionServiceError("Connection is required to close prompt extension");
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      this.connection.host.api.promptExtension.close();
    } catch (error) {
      throw new PromptExtensionServiceError("Failed to close prompt extension");
    }
  }

  /**
   * Gets the generation context from the prompt extension
   * @returns Promise<GenerationContext> The generation context
   * @throws Error if connection is missing
   */
  async getGenerationContext(): Promise<GenerationContext> {
    if (!this.connection) {
      throw new PromptExtensionServiceError("Connection is required to get generation context");
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      return await this.connection.host.api.promptExtension.getGenerationContext();
    } catch (error) {
      throw new PromptExtensionServiceError("Failed to get generation context from prompt extension");
    }
  }

  /**
   * Updates the additional context in the prompt extension
   * @param context - The additional context to update
   * @throws Error if connection is missing
   */
  updateAdditionalContext(context: AdditionalContext<any>): void {
    if (!this.connection) {
      throw new PromptExtensionServiceError("Connection is required to update additional context");
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      this.connection.host.api.promptExtension.updateAdditionalContext(context);
    } catch (error) {
      throw new PromptExtensionServiceError("Failed to update additional context in prompt extension");
    }
  }
}
