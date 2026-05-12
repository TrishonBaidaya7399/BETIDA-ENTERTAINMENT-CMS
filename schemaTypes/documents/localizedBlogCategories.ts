import { defineType, defineField } from "sanity";

export default defineType({
  name: "localizedBlogCategories",
  title: "Localized Blog Categories",
  type: "document",
  fields: [
    defineField({
      name: "categoryKey",
      title: "Category Key",
      type: "string",
      description:
        "Unique identifier for the category (e.g., 'crypto', 'sport')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoryName",
      title: "Category Name",
      type: "internationalizedArrayString",
      options: {
        aiAssist: {
          translateAction: true,
        },
      },
      description: "Localized category name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which categories should be displayed",
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      categoryKey: "categoryKey",
      categoryName: "categoryName",
    },
    prepare({ categoryKey, categoryName }) {
      const defaultName = Array.isArray(categoryName)
        ? categoryName.find((item: any) => item._key === "en")?.value ||
          categoryKey
        : categoryKey;

      return {
        title: categoryKey,
        subtitle: defaultName,
      };
    },
  },
});
