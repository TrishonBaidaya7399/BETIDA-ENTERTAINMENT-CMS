import { defineType, defineField } from "sanity";

export const exclusiveAdvantages = defineType({
  name: "exclusiveAdvantages",
  title: "Exclusive Advantages",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "advantages",
      title: "Advantages",
      type: "array",
      of: [
        defineField({
          name: "advantage",
          title: "Advantage Object",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "details", title: "Details", type: "text" }),
            defineField({ name: "icon", title: "Icon Name", type: "string" }),
          ],
        }),
      ],
    }),
  ],
});
