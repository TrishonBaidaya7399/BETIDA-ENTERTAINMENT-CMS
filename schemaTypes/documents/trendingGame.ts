// schemaTypes/trendingGame.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "trendingGame",
  title: "Trending Game",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Order Number",
      type: "number",
      description:
        "Unique ordering number (e.g., 1, 2, 3...). Cannot be duplicated.",
      validation: (Rule) =>
        Rule.integer()
          .positive()
          .custom(async (value, context) => {
            if (value === undefined || value === null) return true;

            const { document, getClient } = context;
            const client = getClient({ apiVersion: "2024-01-01" });

            if (!document?._id) return true;

            const baseId = document._id.replace(/^drafts\./, "");

            const duplicate = await client.fetch(
              `
        *[
          _type == "trendingGame" &&
          defined(id) &&
          id == $value &&
          _id != $baseId &&
          _id != "drafts." + $baseId
        ][0]._id
        `,
              { value, baseId },
            );

            return duplicate
              ? "This ID is already used by another card. Please choose a unique number."
              : true;
          }),
    }),
    defineField({
      name: "src",
      title: "Image Source",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "provider",
      title: "Provider Name",
      type: "string",
    }),
    defineField({ name: "players", title: "Players", type: "number" }),
    defineField({
      name: "cta",
      title: "CTA Link (Optional)",
      description:
        "If you leave this field empty, the click action will be automatically redirect to the casino Slug page '/casino/{slug}'",
      type: "string",
    }),
  ],
});
