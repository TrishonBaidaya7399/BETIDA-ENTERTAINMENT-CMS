import { defineType, defineField } from "sanity";

export default defineType({
  name: "legalDocument",
  title: "Legal Document",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Terms of Service", value: "termsOfService" },
          {
            title: "Deposit Bonus Requirements",
            value: "depositBonusRequirements",
          },
          { title: "Anti-Money Laundering", value: "antiMoneyLaundering" },
          { title: "Privacy", value: "privacy" },
          { title: "Coin Mixing", value: "coinMixing" },
          { title: "Providers", value: "providers" },
          { title: "Sportsbook", value: "sportsbook" },
          { title: "Cookies Policy", value: "cookiesPolicy" },
          { title: "Self-Exclusion", value: "selfExclusion" },
          { title: "Racing Rules", value: "racingRules" },
          { title: "Poker Card Room Rules", value: "pokerCardRoomRules" },
          { title: "Poker Refund Policy", value: "pokerRefundPolicy" },
          {
            title: "Poker Security & Ecology Policy",
            value: "pokerSecurityEcologyPolicy",
          },
          { title: "Affiliate Terms", value: "affiliateTerms" },
          { title: "Betting Rules", value: "bettingRules" },
          { title: "KYC Policy", value: "kycPolicy" },
          { title: "Responsible Gambling", value: "responsibleGambling" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      options: {
        aiAssist: {
          translateAction: true,
        },
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "index",
              title: "Index",
              type: "number",
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "language",
                      title: "Language",
                      type: "string",
                      options: {
                        list: [
                          { title: "English", value: "en" },
                  { title: "Türkçe", value: "tr" },
                  { title: "Deutsch", value: "de" },
                  { title: "Español", value: "es" },
                  { title: "Français", value: "fr" },
                  { title: "Português", value: "pt" },
                  { title: "Русский", value: "ru" },
                  { title: "العربية", value: "ar" },
                  { title: "हिन्दी", value: "hi" },
                  { title: "中文 (简体)", value: "zh" },
                        ],
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "blocks",
                      title: "Blocks",
                      type: "array",
                      of: [{ type: "block" }],
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              index: "index",
            },
            prepare({ index }) {
              return {
                title: `${index || "?"}. Section`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "table",
      title: "Dynamic Table",
      type: "object",
      fields: [
        defineField({
          name: "columns",
          title: "Columns",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "key",
                  title: "Key",
                  type: "slug",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "align",
                  title: "Align",
                  type: "string",
                  options: {
                    list: [
                      { title: "Left", value: "left" },
                      { title: "Center", value: "center" },
                      { title: "Right", value: "right" },
                    ],
                  },
                  initialValue: "left",
                }),
              ],
              preview: {
                select: { title: "label" },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "cells",
                  title: "Cells",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        defineField({
                          name: "value",
                          title: "Value",
                          type: "string",
                        }),
                      ],
                    },
                  ],
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  cells: "cells",
                },
                prepare({ cells }) {
                  return {
                    title:
                      cells?.map((c: any) => c.value).join(" | ") ||
                      "Empty row",
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      type: "type",
      title: "title",
    },
    prepare({ type, title }) {
      return {
        title: title ? title[0]?.value || "Untitled" : "Untitled",
        subtitle: type,
      };
    },
  },
});
