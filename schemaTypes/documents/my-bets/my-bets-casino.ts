// schemaTypes/myBets.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "myBetsData",
  title: "My Bets Data",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Casino", value: "casino" },
          { title: "Sports", value: "sports" },
          { title: "Archive", value: "archive" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "gameTitle",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = context.document?.type;
          if (type !== "archive" && (!value || !value.current)) {
            return "Slug is required for non-archive types";
          }
          return true;
        }),
      hidden: ({ document }) => document?.type === "archive",
    }),
    defineField({
      name: "gameTitle",
      title: "Game Title",
      type: "internationalizedArrayString",
      options: {
        aiAssist: {
          translateAction: true,
        },
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = context.document?.type;
          if (type !== "archive" && !value) {
            return "Game Title is required for non-archive types";
          }
          return true;
        }),
      hidden: ({ document }) => document?.type === "archive",
    }),
    // Archive-specific
    defineField({
      name: "archiveDate",
      title: "Archive Date",
      type: "date",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = context.document?.type;
          if (type === "archive" && !value) {
            return "Archive Date is required for archive type";
          }
          return true;
        }),
      hidden: ({ document }) => document?.type !== "archive",
    }),
    defineField({
      name: "betCount",
      title: "Bet Count",
      type: "number",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = context.document?.type;
          if (
            type === "archive" &&
            (value === undefined || value === null || value < 0)
          ) {
            return "Bet Count is required and must be a positive number for archive type";
          }
          return true;
        }),
      hidden: ({ document }) => document?.type !== "archive",
    }),
    // Shared for casino/sports
    defineField({
      name: "betId",
      title: "Bet ID",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = context.document?.type;
          if (type !== "archive" && !value) {
            return "Bet ID is required for non-archive types";
          }
          return true;
        }),
      hidden: ({ document }) => document?.type === "archive",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = context.document?.type;
          if (type !== "archive" && !value) {
            return "Date is required for non-archive types";
          }
          return true;
        }),
      hidden: ({ document }) => document?.type === "archive",
    }),
    defineField({
      name: "betAmount",
      title: "Bet Amount",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = context.document?.type;
          if (type !== "archive" && !value) {
            return "Bet Amount is required for non-archive types";
          }
          return true;
        }),
      hidden: ({ document }) => document?.type === "archive",
    }),
    defineField({
      name: "multiplier",
      title: "Multiplier",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = context.document?.type;
          if (type !== "archive" && !value) {
            return "Multiplier is required for non-archive types";
          }
          return true;
        }),
      hidden: ({ document }) => document?.type === "archive",
    }),
    defineField({
      name: "profitLoss",
      title: "Profit/Loss",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = context.document?.type;
          if (type !== "archive" && !value) {
            return "Profit/Loss is required for non-archive types";
          }
          return true;
        }),
      hidden: ({ document }) => document?.type === "archive",
    }),
  ],
});
