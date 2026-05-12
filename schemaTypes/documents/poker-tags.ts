// schema/pokerTags.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "pokerTags",
  title: "Poker Tags",
  type: "document",
  fields: [
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
