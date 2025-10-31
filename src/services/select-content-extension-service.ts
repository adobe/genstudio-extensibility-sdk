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
import { Asset } from "../types/asset/Asset";

export interface SelectContentExtensionApi extends VirtualApi {
  api: {
    selectContentExtension: {
      sync: () => { selectedAssets: Asset[]; selectionLimit: number };
      setSelectedAssets: (extensionId: string, assets: Asset[]) => void;
    };
  };
}

export class SelectContentExtensionServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SelectContentExtensionServiceError";
  }
}

export class SelectContentExtensionService {
  /**
   * Sync the selected assets
   * @param connection - The guest connection to the host
   * @returns the current selected assets and the total count of left assets
   */
  static sync(
    connection: any,
    extensionId: string,
  ): { selectedAssets: Asset[]; selectionLimit: number } {
    if (!connection) {
      throw new SelectContentExtensionServiceError(
        "Connection is required to sync selected assets",
      );
    }

    // @ts-ignore Remote API is handled through postMessage
    return connection.host.api.selectContentExtension.sync(extensionId);
  }

  /**
   * Set the selected assets
   * @param extensionId - the extension id of the content select content add ons
   * @param assets - the selected assets
   */
  static setSelectedAssets(
    connection: any,
    extensionId: string,
    assets: Asset[],
  ): void {
    if (!connection) {
      throw new SelectContentExtensionServiceError(
        "Connection is required to set selected assets",
      );
    }

    // @ts-ignore Remote API is handled through postMessage
    return connection.host.api.selectContentExtension.setSelectedAssets(
      extensionId,
      assets,
    );
  }
}
