import { defineType, defineField } from "sanity";

export default defineType({
  name: "localizedBlogs",
  title: "Localized Blogs",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      options: {
        aiAssist: {
          translateAction: true,
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail (Image URL)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "internationalizedArrayText",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "language",
              title: "Language",
              type: "string",
              options: {
                list: [
                      { title: "English", value: "en" },
                      { title: "Türkçe", value: "tr" },
                      { title: "Deutsch", value: "de" },
                      { title: "Español", value: "es" },
                      { title: "Français", value: "fr" },
                      { title: "Português", value: "pt" },
                      { title: "Русский", value: "ru" },
                      { title: "العربية", value: "ar" },
                      { title: "हिन्दी", value: "hi" },
                      { title: "中文 (简体)", value: "zh" },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "array",
              of: [{ type: "block" }],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              language: "language",
            },
            prepare({ language }) {
              return {
                title: language ? language.toUpperCase() : "Unknown",
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "X (Twitter)", value: "x" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "url",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "oldCategories",
      title: "Old Categories (Deprecated)",
      type: "array",
      of: [{ type: "string" }],
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "localizedBlogCategories" }],
        },
      ],
    }),
  ],
});
