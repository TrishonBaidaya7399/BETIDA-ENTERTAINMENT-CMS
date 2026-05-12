import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "viewAllButtonConfig",
  title: "View All Buttons Configuration",
  description:
    "Central place to manage 'View All' button links for all carousels/sections",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      description: "Just for internal reference (not displayed anywhere)",
      initialValue: "View All Buttons Links",
      readOnly: true,
    }),

    defineField({
      name: "buttons",
      title: "View All Buttons",
      description:
        "Add one entry for each carousel/section that needs a View All button",
      type: "array",
      of: [
        defineArrayMember({
          name: "viewAllButton",
          type: "object",
          title: "View All Button",
          fields: [
            defineField({
              name: "section",
              title: "Section / Carousel",
              type: "string",
              options: {
                list: [
                  { title: "Featured Games", value: "featured-games" },
                  { title: "Trending Sports", value: "trending-sports" },
                  { title: "E-Sports", value: "e-sports" },
                  { title: "Trending Games", value: "trending-games" },
                  { title: "Slots", value: "slots" },
                  { title: "Betida Originals", value: "betida-originals" },
                  { title: "Live Casino", value: "live-casino" },
                  { title: "Promotions", value: "promotions" },
                  { title: "Publishers", value: "publishers" },
                  { title: "Jackpot Cards", value: "jackpots" },
                  { title: "Betida Picks Combo - Cards Carousel Label", value: "betida-picks" },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "redirectUrl",
              title: "Redirect URL",
              type: "url",
              description:
                "Full URL or internal path (e.g. /games/trending or /promotions)",
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ["http", "https", "/"],
                  allowRelative: true,
                }),
            }),

            defineField({
              name: "isVisible",
              title: "Show View All Button",
              type: "boolean",
              description:
                "Toggle visibility of the View All button for this section",
              initialValue: true,
              options: {
                layout: "switch",
              },
            }),
          ],

          preview: {
            select: {
              section: "section",
              url: "redirectUrl",
              visible: "isVisible",
            },
            prepare({ section, url, visible }) {
              const sectionTitle = section
                ? section
                    .split("-")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")
                : "Unnamed";

              return {
                title: sectionTitle,
                subtitle: visible ? `→ ${url || "No URL set"}` : "Hidden",
                media: visible ? "✅" : "❌",
              };
            },
          },
        }),
      ],
    }),
  ],

  // Optional: make it look nicer in studio
  preview: {
    prepare() {
      return {
        title: "View All Buttons Configuration",
        subtitle: "Manage redirect links for carousels",
      };
    },
  },
});
