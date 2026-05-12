// schemas/rewards/nextLevelReward.ts
import { defineType, defineField, defineArrayMember } from "sanity";

export const nextLevelReward = defineType({
  name: "nextLevelReward",
  title: "Next Level Rewards Page",
  type: "document",
  fields: [
    // ── Page Header (shared for the whole page) ─────────────────────
    defineField({
      name: "pageHeader",
      title: "Reward Page Header Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // ── Page Footer Text ────────────────────────────────────────────
    defineField({
      name: "pageFooterText",
      title: "Reward Page Footer Text",
      type: "string",
    }),

    // ── Page Footer Redirect URL ────────────────────────────────────
    defineField({
      name: "pageFooterURL",
      title: "Reward Page Footer Redirect URL",
      type: "string",
      description: "Optional link for the footer text",
    }),

    // ── Rewards Cards Array ───────────────────────────────────────
    defineField({
      name: "rewards",
      title: "Reward Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "rewardCard",
          title: "Reward Card",
          fields: [
            // Reward Type
            defineField({
              name: "type",
              title: "Reward Type",
              type: "string",
              options: {
                list: [
                  { title: "Cashback", value: "cashback" },
                  { title: "Free Spins / Bets", value: "freeSpin" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),

            // Icon (emoji or name for frontend)
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "e.g. 'money-bag' or actual emoji",
            }),

            // Card Title (i18n)
            defineField({
              name: "title",
              title: "Card Title",
              type: "internationalizedArrayString",
              options: {
                aiAssist: {
                  translateAction: true,
                },
              },
              validation: (Rule) => Rule.required(),
            }),

            // Card Subtitle (i18n) – optional)
            defineField({
              name: "subtitle",
              title: "Card Subtitle",
              type: "internationalizedArrayString",
              options: {
                aiAssist: {
                  translateAction: true,
                },
              },
            }),

            // Button on the card
            defineField({
              name: "redirectButtonTitle",
              title: "Button Title (on card)",
              type: "internationalizedArrayString",
              options: {
                aiAssist: {
                  translateAction: true,
                },
              },
            }),

            defineField({
              name: "redirectButtonURL",
              title: "Button Redirect URL",
              type: "string",
            }),

            // ── Cashback Specific ─────────────────────────────────
            defineField({
              name: "percentage",
              title: "Cashback Percentage",
              type: "number",
              description: "e.g. 5 for 5% cashback",
              hidden: ({ parent }) => parent?.type !== "cashback",
              validation: (Rule) =>
                Rule.custom((val, context: any) => {
                  const parent = context.parent as any;
                  if (parent?.type === "cashback") {
                    return val !== undefined && val > 0
                      ? true
                      : "Percentage is required for Cashback";
                  }
                  return true;
                }),
            }),

            // ── Free Spin Specific ───────────────────────────────
            defineField({
              name: "amount",
              title: "Max Free Amount",
              type: "number",
              description: "e.g. 50 for 'Up to $50 Free'",
              hidden: ({ parent }) => parent?.type !== "freeSpin",
              validation: (Rule) =>
                Rule.custom((val, context: any) => {
                  const parent = context.parent as any;
                  if (parent?.type === "freeSpin") {
                    return val !== undefined && val > 0
                      ? true
                      : "Amount is required for Free Spin/Bet";
                  }
                  return true;
                }),
            }),

            defineField({
              name: "currency",
              title: "Currency",
              type: "string",
              options: {
                list: ["USD", "EUR", "BDT", "TRY"],
              },
              initialValue: "USD",
              hidden: ({ parent }) => parent?.type !== "freeSpin",
            }),

            // Modal Content (rich text + images per language)
            defineField({
              name: "modalText",
              title: "Modal Content (Rich Text + Images)",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "localizedModal",
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
                      name: "content",
                      title: "Content Blocks",
                      type: "array",
                      of: [
                        { type: "block" },
                        {
                          type: "image",
                          options: { hotspot: true },
                          fields: [
                            {
                              name: "alt",
                              type: "string",
                              title: "Alternative Text",
                            },
                          ],
                        },
                      ],
                      validation: (Rule) => Rule.min(1),
                    }),
                  ],
                  preview: {
                    select: {
                      language: "language",
                      blocks: "content",
                    },
                    prepare({ language, blocks }) {
                      const firstText =
                        blocks?.find((b: any) => b._type === "block")
                          ?.children?.[0]?.text || "";
                      return {
                        title:
                          firstText.slice(0, 70) +
                          (firstText.length > 70 ? "…" : ""),
                        subtitle: language?.toUpperCase(),
                      };
                    },
                  },
                }),
              ],
              validation: (Rule) => Rule.min(1),
            }),

            // Active toggle
            defineField({
              name: "isActive",
              title: "Active",
              type: "boolean",
              initialValue: true,
            }),
          ],

          // Preview for each card in the list
          preview: {
            select: {
              type: "type",
              title: "title",
              percentage: "percentage",
              amount: "amount",
              currency: "currency",
              icon: "icon",
              isActive: "isActive",
            },
            prepare(selection) {
              const {
                type,
                title,
                percentage,
                amount,
                currency,
                icon,
                isActive,
              } = selection;

              const enTitle =
                title?.find((t: any) => t.language === "en")?.value ||
                "Untitled Reward";

              const subtitle =
                type === "cashback"
                  ? `${percentage || "?"}% Cashback`
                  : `Up to ${amount || "?"} ${currency || "USD"} Free`;

              return {
                title: `${icon ? icon + " " : ""}${enTitle}`,
                subtitle: isActive ? subtitle : `${subtitle} (inactive)`,
                media: icon || undefined,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(12),
    }),
  ],

  // Preview for the whole document in Sanity studio
  preview: {
    select: {
      header: "pageHeader",
      count: "rewards.length",
    },
    prepare({ header, count }) {
      return {
        title: header || "Next Level Rewards Page",
        subtitle: `${count || 0} reward card${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
