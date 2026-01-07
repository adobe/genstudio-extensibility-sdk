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
  AppMetadata,
  AppMetaData,
  AppOptions,
} from "../../../src/types/app/AppMetadata";
import { Email, Display, Meta } from "../../../src/types/channel/Channel";

describe("AppMetadata types", () => {
  it("should compile with basic AppMetadata", () => {
    const metadata: AppMetadata = {
      id: "1234",
      label: "label",
      extensionId: "extensionId",
      iconDataUri: "iconDataUri",
      supportedChannels: [Email, Meta, Display],
    };
    expect(metadata).toBeDefined();
  });

  it("should compile with deprecated AppMetaData alias", () => {
    const metadata: AppMetaData = {
      id: "1234",
      label: "label",
      extensionId: "extensionId",
      iconDataUri: "iconDataUri",
      supportedChannels: [Email],
    };
    expect(metadata).toBeDefined();
  });

  it("should compile with all options", () => {
    const metadata: AppMetadata = {
      id: "1234",
      label: "label",
      extensionId: "extensionId",
      iconDataUri: "iconDataUri",
      supportedChannels: [Email],
      options: {
        validation: {
          singleExperienceViewMode: true,
          autoOpenApp: false,
          autoRefreshApp: true,
        },
        selectContent: {
          cors: true,
        },
      },
    };
    expect(metadata).toBeDefined();
    expect(metadata.options?.validation?.singleExperienceViewMode).toBe(true);
    expect(metadata.options?.selectContent?.cors).toBe(true);
  });

  it("should compile with partial options", () => {
    const options: AppOptions = {
      validation: { singleExperienceViewMode: true },
    };
    expect(options).toBeDefined();
  });

  it("should compile without options", () => {
    const metadata: AppMetadata = {
      id: "1234",
      label: "label",
      extensionId: "extensionId",
      iconDataUri: "iconDataUri",
      supportedChannels: [Email],
    };
    expect(metadata.options).toBeUndefined();
  });
});
