import { defineType, defineField, defineArrayMember } from "sanity";

export const commissionRules = defineType({
  name: "commissionRules",
  title: "Commission Rules",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "rules",
      title: "Rules",
      type: "array",
      of: [
        defineArrayMember({
          name: "rule",
          title: "Rule",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "details", title: "Details", type: "text" }),
            defineField({
              name: "rate",
              title: "Rate Formula",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
});
