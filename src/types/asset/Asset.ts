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

/**
 * Represents a GenStudio Asset entity in the Experience.
 */
export type Asset = {
  /** The unique identifier of the asset. */
  id: string;
  /** the mimetype detected from the asset */
  mimeType: string;
  /** the name of the asset */
  name: string;
  /** the size of the asset in bytes */
  size: number;
  /** Extension information */
  extensionInfo: ExtensionInfo;
  /** the source of the asset */
  externalAssetInfo: ExternalAssetInfo;
  /** Metadata for the asset */
  additionalMetadata?: Record<string, any>;
  /** keywords for the asset */
  keywords?: string[];
};

export type ExternalAssetInfo = {
  /** the source url of the asset */
  sourceUrl: string;
  /** the signed url of the asset for download */
  signedUrl: string;
  /** the signed thumbnail url of the asset for download and display */
  signedThumbnailUrl: string;
};

export type ExtensionInfo = {
  /** the id of the extension */
  id: string;
  /** the name of the extension */
  name: string;
  /** the icon url of the extension */
  iconUrl?: string;
};

export type ExternalAssetSelection = {
  extensionId: string;
  assets: Asset[];
};
