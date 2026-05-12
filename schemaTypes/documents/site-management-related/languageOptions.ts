// schemas/languageOptions.ts
import { defineType, defineField, defineArrayMember } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";

export default defineType({
  name: "languageOptions",
  title: "Language Options",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "languages",
      title: "Supported Languages",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "language",
          title: "Language",
          fields: [
            defineField({
              name: "label",
              title: "Display Label (Native Name)",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: 'e.g., "English" for en, "Türkçe" for tr',
            }),
            defineField({
              name: "value",
              title: "Locale Code",
              type: "string",
              validation: (Rule) => Rule.required().length(2).lowercase(),
              description:
                'Only for - "en", "tr", "de", "es", "fr", "pt", "ru", "ar", "hi", "zh"',
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Language Options",
        subtitle: "Global language configuration",
      };
    },
  },
});
