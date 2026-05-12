import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "faqSection",
  title: "FAQ Section",
  type: "document",
  fields: [
    // Section title (localized)
    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "internationalizedArrayString",
      options: {
        aiAssist: {
          translateAction: true,
        },
      },
      validation: (Rule) => Rule.required(),
    }),

    // CTA button at the bottom
    defineField({
      name: "cta",
      title: "Call-to-Action Button",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Button Label",
          type: "internationalizedArrayString",
          options: {
            aiAssist: {
              translateAction: true,
            },
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "url",
          title: "Redirect URL",
          type: "string",
        }),
      ],
    }),

    // Array of questions & answers
    defineField({
      name: "questions",
      title: "Questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "question",
          title: "Question",
          fields: [
            defineField({
              name: "order",
              title: "Order",
              type: "number",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (value === undefined || value === null) return true;
                  const allItems = Array.isArray(context?.document?.questions)
                    ? context.document.questions
                    : [];

                  const duplicates = allItems.filter(
                    (item) => item?.order === value
                  );
                  if (duplicates.length > 1) {
                    return "This order number is already used.";
                  }

                  return true;
                }),
            }),
            // Visibility toggle
            defineField({
              name: "isActive",
              title: "Active / Visible?",
              type: "boolean",
              initialValue: true,
            }),
            defineField({
              name: "title",
              title: "Question Title",
              type: "internationalizedArrayString",
              options: {
                aiAssist: {
                  translateAction: true,
                },
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "content",
              title: "Answer",
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
            // Right-side image (Cloudinary public ID)
            defineField({
              name: "image",
              title: "Right Side Image (Cloudinary Public ID)",
              type: "string",
              description: "Enter Cloudinary public_id only (Ratio: 16:9)",
            }), // Image alt text (multi-language)
            defineField({
              name: "imageAlt",
              title: "Image Alt Text",
              type: "internationalizedArrayString",
              options: { aiAssist: { translateAction: true } },
            }),

            // Per-tab gradient background
            defineField({
              name: "gradientStart",
              title: "Tab Gradient Start Color",
              type: "color",
              options: { disableAlpha: false },
            }),
            defineField({
              name: "gradientEnd",
              title: "Tab Gradient End Color",
              type: "color",
              options: { disableAlpha: false },
            }),
            defineField({
              name: "tabsShadow",
              title: "Hover Glow & Border Color",
              type: "color",
              options: { disableAlpha: false },
            }),

            // CTA 1 inside expanded tab 
            defineField({
              name: "ctaButton1",
              title: "CTA Button 1",
              type: "object",
              options: {
                collapsible: true,
                collapsed: true, 
                columns: 1,
              },
              fields: [
                defineField({
                  name: "label",
                  title: "Button Text",
                  type: "internationalizedArrayString",
                  options: { aiAssist: { translateAction: true } },
                }),
                defineField({
                  name: "url",
                  title: "Link URL",
                  type: "string",
                }),
                defineField({
                  name: "openInNewTab",
                  title: "Open in New Tab?",
                  type: "boolean",
                  initialValue: false,
                }),
                defineField({
                  name: "style",
                  title: "Button Style",
                  type: "object",
                  options: {
                    collapsible: true,
                    collapsed: true,
                  },
                  fields: [
                    defineField({
                      name: "isGradient",
                      title: "Use Gradient Background?",
                      type: "boolean",
                      initialValue: true,
                    }),
                    defineField({
                      name: "solidBgColor",
                      title: "Solid Background Color",
                      type: "color",
                      options: { disableAlpha: false },
                      hidden: ({ parent }) => parent?.isGradient === true,
                    }),
                    defineField({
                      name: "gradientStart",
                      title: "Gradient Start Color",
                      type: "color",
                      options: { disableAlpha: false },
                      hidden: ({ parent }) => parent?.isGradient === false,
                    }),
                    defineField({
                      name: "gradientEnd",
                      title: "Gradient End Color",
                      type: "color",
                      options: { disableAlpha: false },
                      hidden: ({ parent }) => parent?.isGradient === false,
                    }),
                    defineField({
                      name: "textColor",
                      title: "Text Color",
                      type: "color",
                      options: { disableAlpha: false },
                      initialValue: { hex: "#ffffff" },
                    }),
                    defineField({
                      name: "hoverBgColor",
                      title: "Hover Background (Solid)",
                      type: "color",
                      options: { disableAlpha: false },
                      hidden: ({ parent }) => parent?.isGradient === true,
                    }),
                    defineField({
                      name: "hoverTextColor",
                      title: "Hover Text Color",
                      type: "color",
                      options: { disableAlpha: false },
                    }),
                  ],
                }),
              ],
            }),

            // CTA 2 inside expanded tab
            defineField({
              name: "ctaButton2",
              title: "CTA Button 2",
              type: "object",
              options: {
                collapsible: true,
                collapsed: true,
                columns: 1,
              },
              fields: [
                defineField({
                  name: "label",
                  title: "Button Text",
                  type: "internationalizedArrayString",
                  options: { aiAssist: { translateAction: true } },
                }),
                defineField({
                  name: "url",
                  title: "Link URL",
                  type: "string",
                }),
                defineField({
                  name: "openInNewTab",
                  title: "Open in New Tab?",
                  type: "boolean",
                  initialValue: false,
                }),
                defineField({
                  name: "style",
                  title: "Button Style",
                  type: "object",
                  options: {
                    collapsible: true,
                    collapsed: true,
                  },
                  fields: [
                    defineField({
                      name: "isGradient",
                      title: "Use Gradient Background?",
                      type: "boolean",
                      initialValue: true,
                    }),
                    defineField({
                      name: "solidBgColor",
                      title: "Solid Background Color",
                      type: "color",
                      options: { disableAlpha: false },
                      hidden: ({ parent }) => parent?.isGradient === true,
                    }),
                    defineField({
                      name: "gradientStart",
                      title: "Gradient Start Color",
                      type: "color",
                      options: { disableAlpha: false },
                      hidden: ({ parent }) => parent?.isGradient === false,
                    }),
                    defineField({
                      name: "gradientEnd",
                      title: "Gradient End Color",
                      type: "color",
                      options: { disableAlpha: false },
                      hidden: ({ parent }) => parent?.isGradient === false,
                    }),
                    defineField({
                      name: "textColor",
                      title: "Text Color",
                      type: "color",
                      options: { disableAlpha: false },
                      initialValue: { hex: "#ffffff" },
                    }),
                    defineField({
                      name: "hoverBgColor",
                      title: "Hover Background (Solid)",
                      type: "color",
                      options: { disableAlpha: false },
                      hidden: ({ parent }) => parent?.isGradient === true,
                    }),
                    defineField({
                      name: "hoverTextColor",
                      title: "Hover Text Color",
                      type: "color",
                      options: { disableAlpha: false },
                    }),
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              isActive: "isActive",
            },
            prepare({ title, isActive }: any) {
              const en = Array.isArray(title)
                ? title.find((t: any) => t._key === "en")?.value
                : null;
              return {
                title: en || "No English title",
                subtitle: isActive === false ? "(Hidden)" : undefined,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],

  preview: {
    select: {
      title: "sectionTitle",
    },
    prepare({ title }: any) {
      const en = Array.isArray(title)
        ? title.find((t: any) => t._key === "en")?.value
        : "FAQ Section";
      return { title: en || "FAQ Section" };
    },
  },
});
