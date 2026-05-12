import { defineType, defineField } from "sanity";

export const sportsTabsSettings = defineType({
  name: "sportsTabsSettings",
  title: "Sports Tabs Configuration",
  type: "document",

  fields: [
    defineField({
      name: "queryParamKey",
      title: "URL Query Parameter Name",
      type: "string",
      description:
        "e.g. 'tab', 'SportsTab', 'section' → will be used as ?tab=lobby",
      initialValue: "tab",
      validation: (Rule) => Rule.required().regex(/^[a-zA-Z0-9-]+$/),
    }),

    defineField({
      name: "tabs",
      title: "Sports Tabs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Tab Name (Localized)",
              type: "internationalizedArrayString",
              options: {
                aiAssist: {
                  translateAction: true,
                },
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value (URL Key)",
              type: "slug",
              options: {
                source: (doc: any, context: any) => {
                  const parent = context.parent;
                  const enTitle = parent?.title?.find(
                    (t: any) => t._key === "en"
                  )?.value;
                  return enTitle || "tab";
                },
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "order",
              title: "Order",
              type: "number",
            }),
            defineField({
              name: "isVisible",
              title: "Visible",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: { title: "title", value: "value.current" },
            prepare({ title, value }: any) {
              const en = title?.find((t: any) => t._key === "en")?.value;
              return { title: en || "No title", subtitle: value };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: { key: "queryParamKey" },
    prepare({ key }) {
      return {
        title: "Sports Tabs Settings",
        subtitle: `Query param: ?${key || "tab"}=lobby`,
      };
    },
  },
});
