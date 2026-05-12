import { defineType, defineField } from "sanity";

export default defineType({
  name: "postTelegramPromo",
  title: "Post Telegram Promo",
  type: "document",

  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),

    defineField({
      name: "body",
      title: "Body (Portable Text / Rich Text)",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    }),

    // ✅ PROMO CODE
    defineField({
      name: "promoCode",
      type: "string",
      title: "Promo Code",
      description: "Optional promo code",
    }),

    // ✅ EXPIRY
    defineField({
      name: "expiresAt",
      type: "datetime",
      title: "Expires At",
    }),

    // ✅ BUTTONS WITH CTA STYLE
    defineField({
      name: "buttons",
      type: "array",
      title: "Buttons",
      description: "Telegram does not support custom button colors at all. This is a hard platform limitation",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "text",
              type: "string",
              title: "Text",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "url",
              type: "url",
              title: "URL",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "type",
              type: "string",
              title: "Type",
              initialValue: "url",
              options: {
                list: [
                  { title: "URL", value: "url" },
                  { title: "Web App", value: "webapp" },
                ],
                layout: "radio",
              },
            }),

            // 🔥 CTA STYLE CONFIG (INSIDE BUTTON)
            // defineField({
            //   name: 'ctaStyle',
            //   type: 'object',
            //   title: 'CTA Style',
            //   options: {
            //     collapsible: true,
            //     collapsed: true,
            //   },
            //   fields: [
            //     defineField({
            //       name: 'isGradient',
            //       type: 'boolean',
            //       title: 'Use Gradient',
            //       initialValue: true,
            //     }),

            //     defineField({
            //       name: 'solidColor',
            //       type: 'color',
            //       title: 'Solid Color',
            //       hidden: ({parent}) => parent?.isGradient === true,
            //     }),

            //     defineField({
            //       name: 'gradientStart',
            //       type: 'color',
            //       title: 'Gradient Start',
            //       hidden: ({parent}) => parent?.isGradient === false,
            //     }),

            //     defineField({
            //       name: 'gradientEnd',
            //       type: 'color',
            //       title: 'Gradient End',
            //       hidden: ({parent}) => parent?.isGradient === false,
            //     }),

            //     defineField({
            //       name: 'textColor',
            //       type: 'color',
            //       title: 'Text Color',
            //       initialValue: {hex: '#ffffff'},
            //     }),
            //   ],
            // }),
          ],

          preview: {
            select: {
              title: "text",
              subtitle: "url",
              type: "type",
            },
            prepare({ title, subtitle, type }) {
              return {
                title: title || "Button",
                subtitle: `${type?.toUpperCase() || "URL"} → ${subtitle || ""}`,
              };
            },
          },
        },
      ],
    }),

    defineField({
      name: "isActive",
      type: "boolean",
      title: "Is Active",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "title",
      promoCode: "promoCode",
      isActive: "isActive",
    },
    prepare({ title, promoCode, isActive }) {
      return {
        title: title || "Telegram Promo",
        subtitle: `${isActive ? "🟢" : "🔴"} ${promoCode ? `Code: ${promoCode}` : "No Code"}`,
      };
    },
  },
});
