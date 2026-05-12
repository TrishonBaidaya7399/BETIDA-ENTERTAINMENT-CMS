import { defineType, defineField } from "sanity";

export default defineType({
  name: "myBet",
  title: "My Bets",
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
    }),
    defineField({
      name: "user",
      title: "User",
      type: "string",
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
    }),
    defineField({
      name: "betAmount",
      title: "Bet Amount",
      type: "string",
    }),
    defineField({
      name: "multiplier",
      title: "Multiplier",
      type: "string",
    }),
    defineField({
      name: "payout",
      title: "Payout",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
    }),
  ],
});
