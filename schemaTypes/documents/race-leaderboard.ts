import { defineType, defineField } from "sanity";

export default defineType({
  name: "raceLeaderboard",
  title: "Race Leaderboard",
  type: "document",
  fields: [
    defineField({
      name: "game",
      title: "Game",
      type: "internationalizedArrayString",
      options: {
        aiAssist: {
          translateAction: true,
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "user",
      title: "User",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "betAmount",
      title: "Bet Amount",
      type: "string",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "multiplier",
      title: "Multiplier",
      type: "string",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "payout",
      title: "Payout",
      type: "string",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
});
