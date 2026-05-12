import { defineType, defineField } from "sanity";

export default defineType({
  name: "betidaOriginals",
  title: "BETIDA Originals",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Order Number",
      type: "number",
      description:
        "Unique ordering number (e.g., 1, 2, 3...). Cannot be duplicated.",
      validation: (Rule) =>
        Rule.required()
          .integer()
          .positive()
          .custom(async (value, context) => {
            if (value === undefined || value === null) return true; // required already handled

            const { document, getClient } = context;
            const client = getClient({ apiVersion: "2024-01-01" }); // latest apiVersion

            const existingId = await client.fetch(
              `*[_type == "betidaOriginals" && id == $value && !(_id in [$currentId, $draftId])][0]._id`,
              {
                value,
                currentId: document?._id || "",
                draftId: document?._id?.startsWith("drafts.")
                  ? document._id
                  : `drafts.${document?._id}`,
              },
            );

            if (existingId) {
              return "This ID is already used by another card. Please choose a unique number.";
            }

            return true;
          }),
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
      name: "src",
      title: "Image Source",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "provider",
      title: "Provider Name",
      type: "string",
    }),
    defineField({
      name: "cta",
      title: "CTA Link (Optional)",
      description:
         "If you leave this field empty, the click action will be automatically redirect to the casino Slug page '/casino/{slug}'",
      type: "string",
    }),
  ],
});
