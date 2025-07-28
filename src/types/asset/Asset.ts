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

import { Channel } from "../channel/Channel";

/**
 * Represents an Asset entity in the Experience.
 */
export type Asset = {
  id: string; // External Asset ID
  assetId?: string; // GenStudio Asset ID
  name: string;
  signedUrl: string;
  source: string;
  sourceUrl: string;
  extensionId: string;
  iconUrl?: string;
  metadata?: AssetMetadata;
};

export type AssetMetadata = {
  channels: Channel[];
  timeframe: string[];
  region: string[];
  language: string[];
  keywords: string[];
};

export type ExternalAssetSelection = {
  extensionId: string;
  assets: Asset[];
};
