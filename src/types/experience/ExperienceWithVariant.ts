/*
Copyright 2026 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/* this file defines types and interfaces that are considered as Experience api for extension consumers */

/**
 * Metadata describing a variant's size and aspect ratio.
 */
export type VariantMetadata = {
  /** Variant width in pixels */
  width: number;
  /** Variant height in pixels */
  height: number;
  /** Optional aspect ratio identifier */
  knownAspectRatio?: string;
};
/**
 * A single field value within a variant.
 */
export type VariantField = {
  /** Field value as a string */
  value: string;
  /** Optional role name for the field */
  roleName?: string;
  /** Optional role type for the field, either selection or generation */
  roleType?: string;
  /** Optional metadata for the field */
  metadata?: Record<string, any>;
};
/**
 * A variant contains fields and optional metadata.
 */
export type Variant = {
  /** Optional metadata describing the variant */
  metadata?: VariantMetadata;
  /** Field values keyed by field name */
  fields: Record<string, VariantField>;
};
/**
 * Experience model that includes variants and metadata.
 */
export type ExperienceWithVariant = {
  /** Unique identifier for the experience */
  id: string;
  /** Metadata for the experience */
  metadata: {
    /** Basic info about the experience */
    experienceInfo: { title: string };
    /** Channels applicable to the experience */
    channels: string[];
  };
  /** Variants keyed by variant ID */
  variants: Record<string, Variant>;
};
