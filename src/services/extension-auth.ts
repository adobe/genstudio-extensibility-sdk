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

import { ExtensionAuth } from "../types";

export class ExtensionAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExtensionAuthError";
  }
}

/**
 * Get the extension auth from the connection.
 * @param connection - The connection to get the extension auth from.
 * @returns {ExtensionAuth} The extension auth.
 */
export const getExtensionAuth = (connection: any): ExtensionAuth => {
  if (!connection) {
    throw new ExtensionAuthError("Connection is required to get extension auth");
  }

  return connection.sharedContext.get("auth") as ExtensionAuth;
};
