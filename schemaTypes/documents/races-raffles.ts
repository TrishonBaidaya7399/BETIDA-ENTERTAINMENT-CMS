import { defineType, defineField } from "sanity";

export default defineType({
  name: "racesRaffles",
  title: "Races and Raffles",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      initialValue: "racesRaffles",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hundredRace",
      title: "Hundred Race Section",
      type: "object",
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
          name: "description",
          title: "Description",
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
                      { title: "日本語", value: "ja" },
                      { title: "中文", value: "zh" },
                      { title: "Português", value: "pt" },
                      { title: "Русский", value: "ru" },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "blocks",
                  title: "Blocks",
                  type: "array",
                  of: [{ type: "block" }],
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: "modalDescription",
          title: "Modal Description",
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
                      { title: "日本語", value: "ja" },
                      { title: "中文", value: "zh" },
                      { title: "Português", value: "pt" },
                      { title: "Русский", value: "ru" },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "blocks",
                  title: "Blocks",
                  type: "array",
                  of: [{ type: "block" }],
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: "goalAmount",
          title: "Goal Amount",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: "user",
          title: "User Stats",
          type: "object",
          fields: [
            defineField({
              name: "position",
              title: "Position",
              type: "number",
            }),
            defineField({
              name: "currentPrize",
              title: "Current Prize",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "wagered",
              title: "Wagered Amount",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "timer",
          title: "Timer (Static Values)",
          type: "object",
          fields: [
            defineField({
              name: "days",
              type: "number",
              initialValue: 5,
            }),
            defineField({
              name: "hours",
              type: "number",
              initialValue: 21,
            }),
            defineField({
              name: "minutes",
              type: "number",
              initialValue: 25,
            }),
            defineField({
              name: "seconds",
              type: "number",
              initialValue: 39,
            }),
            defineField({
              name: "storageKey",
              type: "string",
              initialValue: "race_timer",
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "weeklyRaffle",
      title: "Weekly Raffle Section",
      type: "object",
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
          name: "description",
          title: "Description",
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
                      { title: "日本語", value: "ja" },
                      { title: "中文", value: "zh" },
                      { title: "Português", value: "pt" },
                      { title: "Русский", value: "ru" },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "blocks",
                  title: "Blocks",
                  type: "array",
                  of: [{ type: "block" }],
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: "modalDescription",
          title: "Modal Description",
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
                      { title: "日本語", value: "ja" },
                      { title: "中文", value: "zh" },
                      { title: "Português", value: "pt" },
                      { title: "Русский", value: "ru" },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "blocks",
                  title: "Blocks",
                  type: "array",
                  of: [{ type: "block" }],
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: "goalAmount",
          title: "Goal Amount",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: "ticketProgress",
          title: "Ticket Progress (%)",
          type: "number",
          validation: (Rule) => Rule.required().min(0).max(100),
        }),
        defineField({
          name: "entries",
          title: "Number of Entries",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: "timer",
          title: "Timer (Static Values)",
          type: "object",
          fields: [
            defineField({
              name: "days",
              type: "number",
              initialValue: 5,
            }),
            defineField({
              name: "hours",
              type: "number",
              initialValue: 21,
            }),
            defineField({
              name: "minutes",
              type: "number",
              initialValue: 25,
            }),
            defineField({
              name: "seconds",
              type: "number",
              initialValue: 39,
            }),
            defineField({
              name: "storageKey",
              type: "string",
              initialValue: "raffle_timer",
            }),
          ],
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "url",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: "buttonText",
          title: "Button Text",
          type: "internationalizedArrayString",
          options: {
            aiAssist: {
              translateAction: true,
            },
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "ticketData",
          title: "Ticket Modal Data",
          type: "object",
          fields: [
            defineField({
              name: "tickets",
              title: "Tickets",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "id",
                      title: "ID",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "date",
                      title: "Date",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "status",
                      title: "Status",
                      type: "string",
                      options: {
                        list: [
                          { title: "Active", value: "Active" },
                          { title: "Expired", value: "Expired" },
                        ],
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                },
              ],
            }),
            defineField({
              name: "ticketSummary",
              title: "Ticket Summary",
              type: "object",
              fields: [
                defineField({
                  name: "totalEntries",
                  title: "Total Entries",
                  type: "number",
                  validation: (Rule) => Rule.required().min(0),
                }),
                defineField({
                  name: "nextDraw",
                  title: "Next Draw Timer",
                  type: "object",
                  fields: [
                    defineField({
                      name: "days",
                      type: "number",
                      initialValue: 0,
                    }),
                    defineField({
                      name: "hours",
                      type: "number",
                      initialValue: 0,
                    }),
                    defineField({
                      name: "minutes",
                      type: "number",
                      initialValue: 0,
                    }),
                    defineField({
                      name: "seconds",
                      type: "number",
                      initialValue: 0,
                    }),
                    defineField({
                      name: "storageKey",
                      type: "string",
                      initialValue: "ticket_timer",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "hundredRace.title",
    },
    prepare({ title }) {
      return {
        title: title?.[0]?.value || "Races and Raffles",
      };
    },
  },
});
