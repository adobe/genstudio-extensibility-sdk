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

import { VirtualApi } from "@adobe/uix-core";
import { Experience, FieldUpdate } from "../types/experience/Experience";
import { GenerationContext } from "../types/generationContext/GenerationContext";

export interface FragmentSwapExtensionApi extends VirtualApi {
  api: {
    fragmentSwapExtension: {
      open: (extensionId: string) => void;
      close: () => void;
      getExperience: () => Promise<Experience>;
      getGenerationContext: () => Promise<GenerationContext>;
      setSwapValue: (value: string) => void;
    };
  };
}

export class FragmentSwapExtensionServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FragmentSwapExtensionServiceError";
  }
}

/**
 * Manages swap field extension functionality for swapping field content
 */
export class FragmentSwapExtensionService {
  /**
   * Opens the swap field extension dialog
   * @param connection - The guest connection to the host
   * @param extensionId - The ID of the extension to open
   * @throws Error if connection is missing
   */
  static open(connection: any, extensionId: string): void {
    if (!connection) {
      throw new FragmentSwapExtensionServiceError(
        "Connection is required to open swap field extension",
      );
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      connection.host.api.fragmentSwapExtension.open(extensionId);
    } catch (error) {
      throw new FragmentSwapExtensionServiceError(
        "Failed to open swap field extension",
      );
    }
  }

  /**
   * Closes the swap field extension dialog
   * @param connection - The guest connection to the host
   * @throws Error if connection is missing
   */
  static close(connection: any): void {
    if (!connection) {
      throw new FragmentSwapExtensionServiceError(
        "Connection is required to close fragment swap extension",
      );
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      connection.host.api.fragmentSwapExtension.close();
    } catch (error) {
      throw new FragmentSwapExtensionServiceError(
        "Failed to close fragment swap extension",
      );
    }
  }

  /**
   * Gets the current field context from the host
   * @param connection - The guest connection to the host
   * @returns Promise<SwapFieldContext> The current field context
   * @throws Error if connection is missing
   */
  static async getExperience(connection: any): Promise<Experience> {
    if (!connection) {
      throw new FragmentSwapExtensionServiceError(
        "Connection is required to get experience",
      );
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      return await connection.host.api.fragmentSwapExtension.getExperience();
    } catch (error) {
      throw new FragmentSwapExtensionServiceError(
        "Failed to get experience from host",
      );
    }
  }

  /**
   * Gets the generation context from the host
   * @param connection - The guest connection to the host
   * @returns Promise<GenerationContext> The generation context
   * @throws Error if connection is missing
   */
  static async getGenerationContext(connection: any): Promise<GenerationContext> {
    if (!connection) {
      throw new FragmentSwapExtensionServiceError(
        "Connection is required to get generation context",
      );
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      return await connection.host.api.fragmentSwapExtension.getGenerationContext();
    } catch (error) {
      throw new FragmentSwapExtensionServiceError(
        "Failed to get generation context from host",
      );
    }
  }

  /**
   * Sets the swap value for the field content
   * @param connection - The guest connection to the host
   * @param value - The new value to write into the field
   * @throws Error if connection is missing
   */
  static setSwapValue(connection: any, value: string): void {
    if (!connection) {
      throw new FragmentSwapExtensionServiceError(
        "Connection is required to set swap value",
      );
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      connection.host.api.fragmentSwapExtension.setSwapValue(value);
    } catch (error) {
      throw new FragmentSwapExtensionServiceError(
        "Failed to set swap value",
      );
    }
  }
}
