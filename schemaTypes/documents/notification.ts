import { defineField, defineType } from "sanity";

export const notification = defineType({
  name: "notification",
  title: "Notification",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      readOnly: true,
      initialValue: "en",
    }),

    defineField({
      name: "translationGroup",
      title: "Translation Group ID",
      type: "slug",
      options: {
        source: "title",
        aiAssist: { exclude: true },
      },
      description:
        "Auto-generated from title. All language variants of the same notification share this ID.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().min(2),
    }),

    defineField({
      name: "time",
      title: "Time",
      type: "string",
      options: {
        aiAssist: { exclude: true },
      },
    }),

    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        aiAssist: { exclude: true },
      },
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "time",
      language: "language",
      icon: "icon",
      translationGroup: "translationGroup.current",
    },
    prepare({ title, subtitle, language, icon, translationGroup }: any) {
      const langFlag: Record<string, string> = {
        en: "🇬🇧", tr: "🇹🇷", de: "🇩🇪", es: "🇪🇸",
        fr: "🇫🇷", pt: "🇵🇹", ru: "🇷🇺", ar: "🇸🇦",
        hi: "🇮🇳", zh: "🇨🇳",
      };

      return {
        title: `${translationGroup || title || "Untitled"} ${langFlag[language] || language?.toUpperCase() || "🌐"}`,
        subtitle: [icon && `${icon}`, subtitle && `⏰ ${subtitle}`]
          .filter(Boolean)
          .join(" • "),
      };
    },
  },
});