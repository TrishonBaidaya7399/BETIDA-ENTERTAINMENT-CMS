// schemas/ticketModal.ts
import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "ticketModal",
  title: "Ticket Modal",
  type: "document",
  fields: [
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Toggle to show/hide the ticket modal",
    }),

    defineField({
      name: "tickets",
      title: "User Tickets",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "Ticket ID",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "date",
              title: "Earned Date",
              type: "datetime",
              description: "e.g. 'Dec 16, 2025'",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: ["Active", "Expired"],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "id",
              subtitle: "status",
            },
            prepare({ title, subtitle }) {
              return {
                title: `Ticket #${title}`,
                subtitle: subtitle,
              };
            },
          },
        }),
      ],
      description: "List of tickets the user has earned",
    }),

    defineField({
      name: "nextDrawDate",
      title: "Next Draw Date & Time",
      type: "datetime",
      description:
        "When the next raffle draw happens. Timer will count down to this date.",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Ticket Modal Configuration",
      };
    },
  },
});
