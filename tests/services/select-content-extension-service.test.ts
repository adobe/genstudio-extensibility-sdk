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

import { SelectContentExtensionService, SelectContentExtensionServiceError, SelectContentExtensionApi } from '../../src/services';
import { GuestUI } from '@adobe/uix-guest';
import { Asset } from '../../src/types/asset/Asset';

const createMockConnection = (
  syncMock?: jest.Mock, 
  setSelectedAssetsMock?: jest.Mock
) => ({
  host: {
    api: {
      selectContentExtension: {
        sync: syncMock || jest.fn(),
        setSelectedAssets: setSelectedAssetsMock || jest.fn()
      }
    }
  }
} as unknown as GuestUI<SelectContentExtensionApi>);

describe('SelectContentExtensionService', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockAsset: Asset = {
    id: 'asset123',
    name: 'Test Asset',
    signedUrl: 'https://example.com/asset.jpg',
    source: 'test-source',
    sourceUrl: 'https://example.com/source',
    extensionId: 'ext123',
    iconUrl: 'https://example.com/icon.jpg',
    metadata: {
      channels: [],
      timeframe: [],
      region: [],
      language: [],
      keywords: []
    }
  };

  const mockSyncResponse = {
    selectedAssets: [mockAsset],
    selectionLimit: 10
  };

  describe('constructor', () => {
    it('should create an instance with connection', () => {
      const mockConnection = createMockConnection();
      const service = new SelectContentExtensionService(mockConnection);
      expect(service).toBeInstanceOf(SelectContentExtensionService);
    });
  });

  describe('sync', () => {
    it('should sync selected assets successfully', async () => {
      const mockSync = jest.fn().mockResolvedValue(mockSyncResponse);
      const mockConnection = createMockConnection(mockSync);
      const service = new SelectContentExtensionService(mockConnection);

      const result = await service.sync();
      
      expect(mockSync).toHaveBeenCalled();
      expect(result).toEqual(mockSyncResponse);
      expect(result.selectedAssets).toHaveLength(1);
      expect(result.selectionLimit).toBe(10);
    });

    it('should throw SelectContentExtensionServiceError on API failure', async () => {
      const mockSync = jest.fn().mockRejectedValue(new Error('API Error'));
      const mockConnection = createMockConnection(mockSync);
      const service = new SelectContentExtensionService(mockConnection);

      await expect(service.sync())
        .rejects
        .toThrow(Error);
      await expect(service.sync())
        .rejects
        .toThrow('API Error');
    });

    it('should throw SelectContentExtensionServiceError if connection is missing', async () => {
      // @ts-ignore Testing null case explicitly
      const service = new SelectContentExtensionService(null);

      expect(() => service.sync())
        .toThrow(SelectContentExtensionServiceError);
      expect(() => service.sync())
        .toThrow('Connection is required to sync selected assets');
    });

    it('should handle empty selected assets array', async () => {
      const emptyResponse = {
        selectedAssets: [],
        selectionLimit: 5
      };
      const mockSync = jest.fn().mockResolvedValue(emptyResponse);
      const mockConnection = createMockConnection(mockSync);
      const service = new SelectContentExtensionService(mockConnection);

      const result = await service.sync();
      
      expect(result.selectedAssets).toHaveLength(0);
      expect(result.selectionLimit).toBe(5);
    });
  });

  describe('setSelectedAssets', () => {
    it('should set selected assets successfully', () => {
      const mockSetSelectedAssets = jest.fn();
      const mockConnection = createMockConnection(undefined, mockSetSelectedAssets);
      const service = new SelectContentExtensionService(mockConnection);
      const extensionId = 'test-extension-id';
      const assets = [mockAsset];

      service.setSelectedAssets(extensionId, assets);

      expect(mockSetSelectedAssets).toHaveBeenCalledWith(extensionId, assets);
      expect(mockSetSelectedAssets).toHaveBeenCalledTimes(1);
    });

    it('should throw SelectContentExtensionServiceError if connection is missing', () => {
      // @ts-ignore Testing null case explicitly
      const service = new SelectContentExtensionService(null);
      const extensionId = 'test-extension-id';
      const assets = [mockAsset];

      expect(() => service.setSelectedAssets(extensionId, assets))
        .toThrow(SelectContentExtensionServiceError);
      expect(() => service.setSelectedAssets(extensionId, assets))
        .toThrow('Connection is required to set selected assets');
    });

    it('should handle empty assets array', () => {
      const mockSetSelectedAssets = jest.fn();
      const mockConnection = createMockConnection(undefined, mockSetSelectedAssets);
      const service = new SelectContentExtensionService(mockConnection);
      const extensionId = 'test-extension-id';
      const assets: Asset[] = [];

      service.setSelectedAssets(extensionId, assets);

      expect(mockSetSelectedAssets).toHaveBeenCalledWith(extensionId, assets);
    });

    it('should handle empty extensionId', () => {
      const mockSetSelectedAssets = jest.fn();
      const mockConnection = createMockConnection(undefined, mockSetSelectedAssets);
      const service = new SelectContentExtensionService(mockConnection);
      const extensionId = '';
      const assets = [mockAsset];

      service.setSelectedAssets(extensionId, assets);

      expect(mockSetSelectedAssets).toHaveBeenCalledWith(extensionId, assets);
    });

    it('should handle multiple assets', () => {
      const mockSetSelectedAssets = jest.fn();
      const mockConnection = createMockConnection(undefined, mockSetSelectedAssets);
      const service = new SelectContentExtensionService(mockConnection);
      const extensionId = 'test-extension-id';
      const multipleAssets = [
        mockAsset,
        { ...mockAsset, id: 'asset456', name: 'Test Asset 2' }
      ];

      service.setSelectedAssets(extensionId, multipleAssets);

      expect(mockSetSelectedAssets).toHaveBeenCalledWith(extensionId, multipleAssets);
    });
  });
});
