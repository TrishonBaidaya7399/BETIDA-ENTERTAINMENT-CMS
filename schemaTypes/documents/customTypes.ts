// schemaTypes/customTypes.ts (or add to schema/index.ts)
import { defineType, defineField, defineArrayMember } from "sanity";

export const internationalizedArrayString = defineType({
  name: "internationalizedArrayString",
  title: "Internationalized String",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "string",
    }),
    defineField({
      name: "tr",
      title: "Turkish",
      type: "string",
    }),
    defineField({
      name: "de",
      title: "German",
      type: "string",
    }),
    defineField({
      name: "es",
      title: "Spanish",
      type: "string",
    }),
    defineField({
      name: "pt",
      title: "Português (Brasil)",
      type: "string",
    }),
    defineField({
      name: "ru",
      title: "Русский",
      type: "string",
    }),
    defineField({
      name: "ar",
      title: "العربية",
      type: "string",
    }),
    defineField({
      name: "hi",
      title: "हिन्दी",
      type: "string",
    }),
    defineField({
      name: "zh",
      title: "中文 (简体)",
      type: "string",
    }),
  ],
  preview: {
    select: {
      en: "en",
    },
    prepare({ en }) {
      return {
        title: en || "Untitled",
      };
    },
  },
});

export const internationalizedArrayText = defineType({
  name: "internationalizedArrayText",
  title: "Internationalized Text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "text",
    }),
    defineField({
      name: "tr",
      title: "Turkish",
      type: "text",
    }),
    defineField({
      name: "de",
      title: "German",
      type: "text",
    }),
    defineField({
      name: "es",
      title: "Spanish",
      type: "text",
    }),
    defineField({
      name: "pt",
      title: "Português (Brasil)",
      type: "string",
    }),
    defineField({
      name: "ru",
      title: "Русский",
      type: "string",
    }),
    defineField({
      name: "ar",
      title: "العربية",
      type: "string",
    }),
    defineField({
      name: "hi",
      title: "हिन्दी",
      type: "string",
    }),
    defineField({
      name: "zh",
      title: "中文 (简体)",
      type: "string",
    }),
  ],
  preview: {
    select: {
      en: "en",
    },
    prepare({ en }) {
      return {
        title: en ? en.substring(0, 50) + "..." : "Untitled",
      };
    },
  },
});
