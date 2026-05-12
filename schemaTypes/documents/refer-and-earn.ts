import { defineType, defineField } from "sanity";

export const referAndEarn = defineType({
  name: "referAndEarn",
  title: "Refer And Earn",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineField({
          name: "stat",
          title: "Stat Object",
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "image", title: "Image", type: "image" }),
  ],
});
