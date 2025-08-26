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
  ValidationExtensionService,
  ValidationExtensionServiceError,
  PromptExtensionService,
  PromptExtensionServiceError,
  SelectContentExtensionService,
  SelectContentExtensionServiceError,
  Experience,
  ExperienceField,
  ExperienceMetadata,
  Channel,
  Email,
  Meta,
  Display,
  App,
  AppMetaData,
  AppMetadata,
  AppOptions,
  Toggle,
  GenerationContext,
  Brand,
  Persona,
  Product,
  Claim,
  AdditionalContextValues,
  AdditionalContextTypes,
  AdditionalContext,
  SectionGenerationContext,
  Account,
  Asset,
  AssetMetadata,
  ExternalAssetSelection,
  Locale,
  Template,
  EmailFieldRole,
  LocaleCode,
  LocalesResponse,
  TranslationRequest,
  TranslationResponse,
} from "../src";

const TEST_EXTENSION_ID = "test-extension-id";

describe("SDK Exports", () => {
  describe("Services", () => {
    it("should export ValidationExtensionService", () => {
      expect(ValidationExtensionService).toBeDefined();
      expect(typeof ValidationExtensionService).toBe("function");
      expect(ValidationExtensionService.prototype).toBeDefined();
    });

    it("should export ValidationExtensionServiceError", () => {
      expect(ValidationExtensionServiceError).toBeDefined();
      expect(typeof ValidationExtensionServiceError).toBe("function");
    });

    it("should export PromptExtensionService", () => {
      expect(PromptExtensionService).toBeDefined();
      expect(typeof PromptExtensionService).toBe("function");
      expect(PromptExtensionService.prototype).toBeDefined();
    });

    it("should export PromptExtensionServiceError", () => {
      expect(PromptExtensionServiceError).toBeDefined();
      expect(typeof PromptExtensionServiceError).toBe("function");
    });

    it("should export SelectContentExtensionService", () => {
      expect(SelectContentExtensionService).toBeDefined();
      expect(typeof SelectContentExtensionService).toBe("function");
      expect(SelectContentExtensionService.prototype).toBeDefined();
    });

    it("should export SelectContentExtensionServiceError", () => {
      expect(SelectContentExtensionServiceError).toBeDefined();
      expect(typeof SelectContentExtensionServiceError).toBe("function");
    });
  });

  describe("Experience types", () => {
    it("should export Experience types", () => {
      const field: ExperienceField = {
        fieldName: "test",
        fieldValue: "test",
      };

      const experience: Experience = {
        id: "test",
        experienceFields: { test: field },
      };

      expect(experience.id).toBe("test");
      expect(experience.experienceFields.test).toEqual(field);
    });

    it("should export ExperienceMetadata", () => {
      const metadata: ExperienceMetadata = {
        id: "test",
        name: "test",
      };
      expect(metadata.id).toBe("test");
      expect(metadata.name).toBe("test");
    });
  });

  describe("Channel types", () => {
    it("should export Channel types", () => {
      const channel: Channel = {
        id: "test",
        name: "test",
      };

      expect(channel.id).toBe("test");
      expect(channel.name).toBe("test");

      const emailChannel: Channel = Email;
      expect(emailChannel.id).toBe("email");
      expect(emailChannel.name).toBe("Email");

      const metaChannel: Channel = Meta;
      expect(metaChannel.id).toBe("meta");
      expect(metaChannel.name).toBe("Meta");

      const displayChannel: Channel = Display;
      expect(displayChannel.id).toBe("display");
      expect(displayChannel.name).toBe("Display");
    });
  });

  describe("App types", () => {
    it("should export AppMetaData types", () => {
      const appMetaData: AppMetaData = {
        id: "test",
        label: "test",
        extensionId: "test",
        iconDataUri: "test",
        supportedChannels: [Email, Meta, Display],
      };

      expect(appMetaData.id).toBe("test");
      expect(appMetaData.label).toBe("test");
      expect(appMetaData.extensionId).toBe("test");
      expect(appMetaData.iconDataUri).toBe("test");
      expect(appMetaData.supportedChannels).toEqual([Email, Meta, Display]);
    });

    it("should export AppMetadata types", () => {
      const appMetadata: AppMetadata = {
        id: "test",
        label: "test",
        extensionId: "test",
        iconDataUri: "test",
        supportedChannels: [Email, Meta, Display],
      };

      expect(appMetadata.id).toBe("test");
      expect(appMetadata.label).toBe("test");
      expect(appMetadata.extensionId).toBe("test");
      expect(appMetadata.iconDataUri).toBe("test");
      expect(appMetadata.supportedChannels).toEqual([Email, Meta, Display]);
    });

    it("should export App types", () => {
      const app: App = {
        metadata: {
          id: "test",
          label: "test",
          extensionId: "test",
          iconDataUri: "test",
          supportedChannels: [Email, Meta, Display],
        },
        url: "https://example.com",
      };
      expect(app.metadata.id).toBe("test");
      expect(app.url).toBe("https://example.com");
    });

    it("should export AppOptions types", () => {
      const appOptions: AppOptions = {
        validation: {
          singleExperienceViewMode: true,
          autoOpenApp: true,
          autoRefreshApp: true,
        },
      };
      expect(appOptions.validation?.singleExperienceViewMode).toBe(true);
    });

    it("should export Toggle types", () => {
      const toggle: Toggle = {
        metadata: {
          id: "test",
          label: "test",
          extensionId: "test",
          iconDataUri: "test",
          supportedChannels: [Email, Meta, Display],
        },
        onClick: () => {},
      };
      expect(toggle.metadata.id).toBe("test");
      expect(typeof toggle.onClick).toBe("function");
    });
  });

  describe("Generation Context types", () => {
    it("should export GenerationContext types", () => {
      const brand: Brand = {
        id: "test",
        name: "test",
      };
      expect(brand.id).toBe("test");

      const persona: Persona = {
        id: "test",
        name: "test",
      };
      expect(persona.id).toBe("test");

      const product: Product = {
        id: "test",
        name: "test",
      };
      expect(product.id).toBe("test");

      const claim: Claim = {
        id: "test",
        description: "test",
      };
      expect(claim.id).toBe("test");

      const additionalContextValues: AdditionalContextValues<Claim> = [
        {
          id: "test",
          description: "test",
        },
      ];
      expect(additionalContextValues.length).toBe(1);

      const additionalContext: AdditionalContext<Claim> = {
        extensionId: TEST_EXTENSION_ID,
        additionalContextType: AdditionalContextTypes.Claims,
        additionalContextValues,
      };

      const sectionGenerationContext: SectionGenerationContext = {
        id: "test",
        additionalContexts: [additionalContext],
        product,
      };
      expect(sectionGenerationContext.id).toBe("test");

      const generationContext: GenerationContext = {
        id: "test",
        userPrompt: "my user prompt",
        channel: Email,
        brand,
        product,
        persona,
        sections: [sectionGenerationContext],
      };

      expect(generationContext.id).toBe("test");
    });

    it("should export AdditionalContextTypes enum", () => {
      expect(AdditionalContextTypes.Claims).toBeDefined();
      expect(typeof AdditionalContextTypes.Claims).toBe("string");
    });
  });

  describe("Account types", () => {
    it("should export Account types", () => {
      const account: Account = {
        id: "test",
        name: "test",
      };
      expect(account.id).toBe("test");
      expect(account.name).toBe("test");
    });
  });

  describe("Asset types", () => {
    it("should export Asset types", () => {
      const asset: Asset = {
        id: "test",
        name: "test",
        signedUrl: "https://example.com/asset.jpg",
        source: "test",
        sourceUrl: "https://example.com/source.jpg",
        extensionId: "test-extension",
      };
      expect(asset.id).toBe("test");
      expect(asset.name).toBe("test");
    });

    it("should export AssetMetadata types", () => {
      const assetMetadata: AssetMetadata = {
        channels: [Email, Meta, Display],
        timeframe: ["2024-01-01", "2024-12-31"],
        region: ["US", "EU"],
        language: ["en", "es"],
        keywords: ["test", "asset"],
      };
      expect(assetMetadata.channels.length).toBe(3);
      expect(assetMetadata.keywords.length).toBe(2);
    });

    it("should export ExternalAssetSelection types", () => {
      const externalAssetSelection: ExternalAssetSelection = {
        extensionId: "test-extension",
        assets: [
          {
            id: "test",
            name: "test",
            signedUrl: "https://example.com/asset.jpg",
            source: "test",
            sourceUrl: "https://example.com/source.jpg",
            extensionId: "test-extension",
          },
        ],
      };
      expect(externalAssetSelection.extensionId).toBe("test-extension");
      expect(externalAssetSelection.assets.length).toBe(1);
    });
  });

  describe("Translation types", () => {
    it("should export Locale types", () => {
      const locale: Locale = {
        code: "en-US",
        label: "English (United States)",
      };
      expect(locale.code).toBe("en-US");
      expect(locale.label).toBe("English (United States)");
    });

    it("should export LocaleCode types", () => {
      const localeCode: LocaleCode = "en-US";
      expect(localeCode).toBe("en-US");
    });

    it("should export LocalesResponse types", () => {
      const localesResponse: LocalesResponse = {
        locales: [
          { code: "en-US", label: "English (United States)" },
          { code: "es-ES", label: "Spanish (Spain)" },
        ],
      };
      expect(localesResponse.locales.length).toBe(2);
      expect(localesResponse.locales[0].code).toBe("en-US");
    });

    it("should export TranslationRequest types", () => {
      const translationRequest: TranslationRequest = {
        sourceLocale: "en-US",
        targetLocales: ["es-ES", "fr-FR"],
        items: [
          {
            id: "test",
            messages: [
              { id: "msg1", value: "Hello" },
            ],
          },
        ],
      };
      expect(translationRequest.sourceLocale).toBe("en-US");
      expect(translationRequest.targetLocales.length).toBe(2);
    });

    it("should export TranslationResponse types", () => {
      const translationResponse: TranslationResponse = {
        status: 200,
        results: {
          "es-ES": [
            {
              id: "test",
              messages: [
                { id: "msg1", value: "Hola" },
              ],
            },
          ],
        },
      };
      expect(translationResponse.status).toBe(200);
      expect(translationResponse.results["es-ES"]).toBeDefined();
    });
  });

  it("should export Template types", () => {
    const template: Template = {
      id: "test",
      name: "test",
      description: "test",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
      createdBy: "test",
      updatedBy: "test",
    };

    expect(template.id).toBe("test");
    expect(template.name).toBe("test");
    expect(template.description).toBe("test");
    expect(template.createdAt).toBe("2021-01-01");
    expect(template.updatedAt).toBe("2021-01-01");
    expect(template.createdBy).toBe("test");
    expect(template.updatedBy).toBe("test");
  });

  it("should export EmailFieldRole types", () => {
    const preHeader: EmailFieldRole = EmailFieldRole.PRE_HEADER;
    expect(preHeader).toBe(EmailFieldRole.PRE_HEADER);

    const headline: EmailFieldRole = EmailFieldRole.HEADLINE;
    expect(headline).toBe(EmailFieldRole.HEADLINE);

    const subHeadline: EmailFieldRole = EmailFieldRole.SUB_HEADLINE;
    expect(subHeadline).toBe(EmailFieldRole.SUB_HEADLINE);

    const body: EmailFieldRole = EmailFieldRole.BODY;
    expect(body).toBe(EmailFieldRole.BODY);

    const cta: EmailFieldRole = EmailFieldRole.CTA;
    expect(cta).toBe(EmailFieldRole.CTA);

    const image: EmailFieldRole = EmailFieldRole.IMAGE;
    expect(image).toBe(EmailFieldRole.IMAGE);

    const link: EmailFieldRole = EmailFieldRole.LINK;
    expect(link).toBe(EmailFieldRole.LINK);
  });
});
