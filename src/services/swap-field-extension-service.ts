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
import { SwapFieldContext } from "../types/experience/SwapFieldContext";

export interface SwapFieldExtensionApi extends VirtualApi {
  api: {
    swapFieldExtension: {
      open: (extensionId: string) => void;
      close: () => void;
      getFieldContext: () => Promise<SwapFieldContext>;
      swapField: (value: string) => void;
    };
  };
}

export class SwapFieldExtensionServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SwapFieldExtensionServiceError";
  }
}

/**
 * Manages swap field extension functionality for swapping field content
 */
export class SwapFieldExtensionService {
  /**
   * Opens the swap field extension dialog
   * @param connection - The guest connection to the host
   * @param extensionId - The ID of the extension to open
   * @throws Error if connection is missing
   */
  static open(connection: any, extensionId: string): void {
    if (!connection) {
      throw new SwapFieldExtensionServiceError(
        "Connection is required to open swap field extension",
      );
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      connection.host.api.swapFieldExtension.open(extensionId);
    } catch (error) {
      throw new SwapFieldExtensionServiceError(
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
      throw new SwapFieldExtensionServiceError(
        "Connection is required to close swap field extension",
      );
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      connection.host.api.swapFieldExtension.close();
    } catch (error) {
      throw new SwapFieldExtensionServiceError(
        "Failed to close swap field extension",
      );
    }
  }

  /**
   * Gets the current field context from the host
   * @param connection - The guest connection to the host
   * @returns Promise<SwapFieldContext> The current field context
   * @throws Error if connection is missing
   */
  static async getFieldContext(connection: any): Promise<SwapFieldContext> {
    if (!connection) {
      throw new SwapFieldExtensionServiceError(
        "Connection is required to get field context",
      );
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      return await connection.host.api.swapFieldExtension.getFieldContext();
    } catch (error) {
      throw new SwapFieldExtensionServiceError(
        "Failed to get field context from host",
      );
    }
  }

  /**
   * Swaps the field content with the provided value
   * @param connection - The guest connection to the host
   * @param value - The new value to set for the field
   * @throws Error if connection is missing
   */
  static swapField(connection: any, value: string): void {
    if (!connection) {
      throw new SwapFieldExtensionServiceError(
        "Connection is required to swap field",
      );
    }

    try {
      // @ts-ignore Remote API is handled through postMessage
      connection.host.api.swapFieldExtension.swapField(value);
    } catch (error) {
      throw new SwapFieldExtensionServiceError(
        "Failed to swap field",
      );
    }
  }
}
