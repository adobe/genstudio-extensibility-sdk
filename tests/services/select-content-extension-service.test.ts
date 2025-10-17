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

import {
  SelectContentExtensionService,
  SelectContentExtensionServiceError,
  SelectContentExtensionApi,
} from "../../src/services";
import { GuestUI } from "@adobe/uix-guest";
import { Asset } from "../../src/types/asset/Asset";

const createMockConnection = (
  syncMock?: jest.Mock,
  setSelectedAssetsMock?: jest.Mock,
) =>
  ({
    host: {
      api: {
        selectContentExtension: {
          sync: syncMock || jest.fn(),
          setSelectedAssets: setSelectedAssetsMock || jest.fn(),
        },
      },
    },
  } as unknown as GuestUI<SelectContentExtensionApi>);

describe("SelectContentExtensionService", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockAsset: Asset = {
    id: "asset123",
    name: "Test Asset",
    mimeType: "image/jpeg",
    size: 1024,
    externalAssetInfo: {
      sourceUrl: "https://example.com/source",
      signedUrl: "https://example.com/asset.jpg",
      signedThumbnailUrl: "https://example.com/asset-thumb.jpg",
    },
    extensionInfo: {
      id: "ext123",
      name: "Example Extension",
      iconUrl: "https://example.com/icon.jpg",
    },
    additionalMetadata: {
      // arbitrary metadata pass-through
    },
    keywords: [],
  };

  const mockSyncResponse = {
    selectedAssets: [mockAsset],
    selectionLimit: 10,
  };

  describe("sync", () => {
    it("should sync selected assets successfully", async () => {
      const mockSync = jest.fn().mockResolvedValue(mockSyncResponse);
      const mockConnection = createMockConnection(mockSync);

      const result = await SelectContentExtensionService.sync(mockConnection);

      expect(mockSync).toHaveBeenCalled();
      expect(result).toEqual(mockSyncResponse);
      expect(result.selectedAssets).toHaveLength(1);
      expect(result.selectionLimit).toBe(10);
    });

    it("should throw SelectContentExtensionServiceError on API failure", async () => {
      const mockSync = jest.fn().mockRejectedValue(new Error("API Error"));
      const mockConnection = createMockConnection(mockSync);

      await expect(
        SelectContentExtensionService.sync(mockConnection),
      ).rejects.toThrow(Error);
      await expect(
        SelectContentExtensionService.sync(mockConnection),
      ).rejects.toThrow("API Error");
    });

    it("should throw SelectContentExtensionServiceError if connection is missing", async () => {
      // @ts-ignore Testing null case explicitly
      expect(() => SelectContentExtensionService.sync(null)).toThrow(
        SelectContentExtensionServiceError,
      );
      expect(() => SelectContentExtensionService.sync(null)).toThrow(
        "Connection is required to sync selected assets",
      );
    });

    it("should handle empty selected assets array", async () => {
      const emptyResponse = {
        selectedAssets: [],
        selectionLimit: 5,
      };
      const mockSync = jest.fn().mockResolvedValue(emptyResponse);
      const mockConnection = createMockConnection(mockSync);

      const result = await SelectContentExtensionService.sync(mockConnection);

      expect(result.selectedAssets).toHaveLength(0);
      expect(result.selectionLimit).toBe(5);
    });
  });

  describe("setSelectedAssets", () => {
    it("should set selected assets successfully", () => {
      const mockSetSelectedAssets = jest.fn();
      const mockConnection = createMockConnection(
        undefined,
        mockSetSelectedAssets,
      );
      const extensionId = "test-extension-id";
      const assets = [mockAsset];

      SelectContentExtensionService.setSelectedAssets(
        mockConnection,
        extensionId,
        assets,
      );

      expect(mockSetSelectedAssets).toHaveBeenCalledWith(extensionId, assets);
      expect(mockSetSelectedAssets).toHaveBeenCalledTimes(1);
    });

    it("should throw SelectContentExtensionServiceError if connection is missing", () => {
      // @ts-ignore Testing null case explicitly
      const extensionId = "test-extension-id";
      const assets = [mockAsset];

      expect(() =>
        SelectContentExtensionService.setSelectedAssets(
          null,
          extensionId,
          assets,
        ),
      ).toThrow(SelectContentExtensionServiceError);
      expect(() =>
        SelectContentExtensionService.setSelectedAssets(
          null,
          extensionId,
          assets,
        ),
      ).toThrow("Connection is required to set selected assets");
    });

    it("should handle empty assets array", () => {
      const mockSetSelectedAssets = jest.fn();
      const mockConnection = createMockConnection(
        undefined,
        mockSetSelectedAssets,
      );
      const extensionId = "test-extension-id";
      const assets: Asset[] = [];

      SelectContentExtensionService.setSelectedAssets(
        mockConnection,
        extensionId,
        assets,
      );

      expect(mockSetSelectedAssets).toHaveBeenCalledWith(extensionId, assets);
    });

    it("should handle empty extensionId", () => {
      const mockSetSelectedAssets = jest.fn();
      const mockConnection = createMockConnection(
        undefined,
        mockSetSelectedAssets,
      );
      const extensionId = "";
      const assets = [mockAsset];

      SelectContentExtensionService.setSelectedAssets(
        mockConnection,
        extensionId,
        assets,
      );

      expect(mockSetSelectedAssets).toHaveBeenCalledWith(extensionId, assets);
    });

    it("should handle multiple assets", () => {
      const mockSetSelectedAssets = jest.fn();
      const mockConnection = createMockConnection(
        undefined,
        mockSetSelectedAssets,
      );
      const extensionId = "test-extension-id";
      const multipleAssets = [
        mockAsset,
        { ...mockAsset, id: "asset456", name: "Test Asset 2" },
      ];

      SelectContentExtensionService.setSelectedAssets(
        mockConnection,
        extensionId,
        multipleAssets,
      );

      expect(mockSetSelectedAssets).toHaveBeenCalledWith(
        extensionId,
        multipleAssets,
      );
    });
  });
});
