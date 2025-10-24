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

import { Asset } from "../../../src/types/asset/Asset";
import { Email, Meta } from "../../../src/types/channel/Channel";

describe("Asset", () => {
  it("should create an Asset with required properties", () => {
    const asset: Asset = {
      id: "asset-123",
      name: "Test Asset",
      mimeType: "image/jpeg",
      size: 1024,
      externalAssetInfo: {
        sourceUrl: "https://example.com/assets/test.jpg",
        signedUrl: "https://example.com/assets/test.jpg",
        signedThumbnailUrl: "https://example.com/assets/test-thumb.jpg",
      },
      extensionInfo: {
        id: "test-extension-id",
        name: "Test Extension",
      },
    };

    expect(asset.id).toBe("asset-123");
    expect(asset.name).toBe("Test Asset");
    expect(asset.mimeType).toBe("image/jpeg");
    expect(asset.size).toBe(1024);
    expect(asset.externalAssetInfo.sourceUrl).toBe(
      "https://example.com/assets/test.jpg",
    );
    expect(asset.externalAssetInfo.signedUrl).toBe(
      "https://example.com/assets/test.jpg",
    );
    expect(asset.externalAssetInfo.signedThumbnailUrl).toBe(
      "https://example.com/assets/test-thumb.jpg",
    );
    expect(asset.extensionInfo.id).toBe("test-extension-id");
    expect(asset.extensionInfo.name).toBe("Test Extension");
  });

  it("should support optional additionalMetadata, keywords and icon", () => {
    const asset: Asset = {
      id: "asset-456",
      name: "Rich Asset",
      mimeType: "image/png",
      size: 2048,
      externalAssetInfo: {
        sourceUrl: "https://aem.test/asset.png",
        signedUrl: "https://aem.test/asset.png?sig=abc",
        signedThumbnailUrl: "https://aem.test/asset-thumb.png?sig=abc",
      },
      extensionInfo: {
        id: "test-extension-id",
        name: "My Extension",
        iconUrl: "https://example.com/icon.png",
      },
      additionalMetadata: {
        channels: [Email, Meta],
        any: "value",
      },
      keywords: ["product", "marketing"],
    };

    expect(asset.additionalMetadata).toBeDefined();
    expect(asset.keywords).toEqual(["product", "marketing"]);
    expect(asset.extensionInfo.iconUrl).toBe("https://example.com/icon.png");
  });
});
