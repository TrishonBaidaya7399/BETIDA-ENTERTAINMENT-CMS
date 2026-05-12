import { defineType, defineField } from "sanity";

export const partneringWithUs = defineType({
  name: "partneringWithUs",
  title: "Partnering With Us",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        defineField({
          name: "stepObject",
          title: "Step Object",
          type: "object",
          fields: [
            defineField({ name: "step", title: "Step", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "video", title: "Video", type: "file" }),
            defineField({ name: "icon", title: "Icon Name", type: "string" }),
          ],
        }),
      ],
    }),
  ],
});
