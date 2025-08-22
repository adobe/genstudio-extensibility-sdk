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
      getExperiences: () => Promise<any[]>;
      getGenerationContext: () => Promise<any>;
      open: (extensionId: string) => void;
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
  /**
   * Fetches experiences from the connection
   * @param connection - The guest connection to the host
   * @returns Promise<Experience[]> Array of converted experiences
   * @throws Error if connection is missing
   */
  static async getExperiences(
    connection: GuestUI<ValidationExtensionApi>,
  ): Promise<Experience[]> {
    if (!connection) {
      throw new ValidationExtensionServiceError("Connection is required to get experiences");
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      return await connection.host.api.validationExtension.getExperiences();
    } catch (error) {
      throw new ValidationExtensionServiceError("Failed to fetch experiences from host");
    }
  }

  /**
   * Gets the generation context from the connection
   * @param connection - The guest connection to the host
   * @returns The generation context
   * @throws Error if connection is missing
   */
  static async getGenerationContext(
    connection: GuestUI<ValidationExtensionApi>
  ): Promise<GenerationContext> {
    if (!connection) {
      throw new ValidationExtensionServiceError("Connection is required to get generation context");
    }
    try {
      // @ts-ignore Remote API is handled through postMessage
      return await connection.host.api.validationExtension.getGenerationContext();
    } catch (error) {
      throw new ValidationExtensionServiceError("Failed to get generation context");
    }
  }

  /**
   * Opens the validation extension
   * @param connection - The guest connection to the host
   * @param extensionId - The ID of the extension to open
   * @throws Error if connection is missing
   */
  static open(
    connection: GuestUI<ValidationExtensionApi>,
    extensionId: string
  ): void {
    if (!connection) {
      throw new ValidationExtensionServiceError("Connection is required to open validation extension");
    }
    
    try {
      
      // @ts-ignore Remote API is handled through postMessage
      connection.host.api.validationExtension.open(extensionId);
    } catch (error) {
      throw new ValidationExtensionServiceError("Failed to open validation extension");
    }
  }
}
