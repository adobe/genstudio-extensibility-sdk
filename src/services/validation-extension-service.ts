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

import { Experience } from "../types/experience/Experience";

import { GuestUI } from "@adobe/uix-guest";
import { VirtualApi } from "@adobe/uix-core";
import { GenerationContext } from "../types/generationContext/GenerationContext";

export interface ValidationExtensionApi extends VirtualApi {
  api: {
    validationExtension: {
      open: (extensionId: string) => void;
      getExperiences: () => Promise<Experience[]>;
      getGenerationContext: () => Promise<GenerationContext>;
    };
  };
}

export class ValidationExtensionServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationExtensionServiceError";
  }
}

/**
 * Manages experience data conversion and retrieval
 */
export class ValidationExtensionService {
  private readonly connection: GuestUI<ValidationExtensionApi>;

  constructor(connection: GuestUI<ValidationExtensionApi>) {
    this.connection = connection;
  }

  /**
 * Opens the validation extension
 * @param extensionId - The ID of the extension to open
 * @throws Error if connection is missing
 */
  open(
    extensionId: string
  ): void {
    if (!this.connection) {
      throw new ValidationExtensionServiceError("Connection is required to open validation extension");
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      this.connection.host.api.validationExtension.open(extensionId);
    } catch (error) {
      throw new ValidationExtensionServiceError("Failed to open validation extension");
    }
  }

  /**
   * Fetches experiences from the connection
   * @returns Promise<Experience[]> Array of converted experiences
   * @throws Error if connection is missing
   */
  async getExperiences(): Promise<Experience[]> {
    if (!this.connection) {
      throw new ValidationExtensionServiceError("Connection is required to get experiences");
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      return await this.connection.host.api.validationExtension.getExperiences();
    } catch (error) {
      throw new ValidationExtensionServiceError("Failed to fetch experiences from host");
    }
  }

  /**
   * Gets the generation context from the connection
   * @returns The generation context
   * @throws Error if connection is missing
   */
  async getGenerationContext(): Promise<GenerationContext> {
    if (!this.connection) {
      throw new ValidationExtensionServiceError("Connection is required to get generation context");
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      return await this.connection.host.api.validationExtension.getGenerationContext();
    } catch (error) {
      throw new ValidationExtensionServiceError("Failed to get generation context");
    }
  }
}
