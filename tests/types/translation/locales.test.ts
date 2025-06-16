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

import {z} from 'zod';
import { localeCodeSchema } from '../../../src/types/translation/locales';

describe('Locale Types', () => {
  describe('LocaleCode', () => {
    const validCodes = [
      'zh-CN',
      'zh-TW',
      'en-AU',
      'en-GB',
      'fr-FR',
      'de-DE',
      'it-IT',
      'ja-JP',
      'ko-KR',
      'pt-BR',
      'pt-PT',
      'es-419',
      'es-ES',
      'th-TH',
      'en_US',
      'en-us',
      'eng',
      'en-',
      'en--us'
    ];

    const invalidCodes = [
      'EN',
      'e',
      '123',
      '-en',
      '',
    ];

    validCodes.forEach(code => {
      it(`should accept valid locale code: ${code}`, () => {
        expect(localeCodeSchema.safeParse(code).success).toBe(true);
      });
    });

    invalidCodes.forEach(code => {
      it(`should reject invalid locale code: ${code}`, () => {
        expect(localeCodeSchema.safeParse(code).success).toBe(false);
      });
    });
  });

  describe('Locale', () => {
    it('should accept valid locale object', () => {
      const schema = z.object({
        code: z.string().regex(/^[a-z]{2}[a-zA-Z0-9\-_]*$/),
        label: z.string()
      });

      const validLocale = {
        code: 'en-US',
        label: 'English (United States)'
      };

      expect(schema.safeParse(validLocale).success).toBe(true);
    });

    it('should reject locale object with invalid code', () => {
      const schema = z.object({
        code: z.string().regex(/^[a-z]{2}[a-zA-Z0-9\-_]*$/),
        label: z.string()
      });

      const invalidLocale = {
        code: 'EN',
        label: 'English (United States)'
      };

      expect(schema.safeParse(invalidLocale).success).toBe(false);
    });

    it('should reject locale object with missing required fields', () => {
      const schema = z.object({
        code: z.string().regex(/^[a-z]{2}[a-zA-Z0-9\-_]*$/),
        label: z.string()
      });

      const invalidLocale = {
        code: 'en-US'
        // missing label
      };

      expect(schema.safeParse(invalidLocale).success).toBe(false);
    });
  });
});
