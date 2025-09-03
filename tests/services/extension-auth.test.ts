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


import { getExtensionAuth, ExtensionAuthError } from "../../src/services";
import { ExtensionAuth } from "../../src/types";

describe("getExtensionAuth", () => {
  it("returns auth from connection.sharedContext", () => {
    const mockAuth: ExtensionAuth = {
      imsOrgId: "test-org",
      imsToken: "test-token",
      apiKey: "test-api-key",
    };

    const connection: any = {
      sharedContext: {
        get: jest.fn().mockReturnValue(mockAuth),
      },
    };

    const result = getExtensionAuth(connection);
    expect(result).toBe(mockAuth);
    expect(connection.sharedContext.get).toHaveBeenCalledWith("auth");
  });

  it("throws when connection is missing", () => {
    expect(() => getExtensionAuth(undefined as any)).toThrow(ExtensionAuthError);
    expect(() => getExtensionAuth(null as any)).toThrow(
      "Connection is required to get extension auth"
    );
  });
});
