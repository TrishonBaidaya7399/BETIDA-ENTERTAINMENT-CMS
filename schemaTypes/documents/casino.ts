import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'casino',
  title: 'Casino Bets',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),
    defineField({
      name: 'game',
      title: 'Game',
      type: 'string',
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'string',
      options: {
        aiAssist: {
          exclude: true,
        },
      },
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      options: {
        aiAssist: {
          exclude: true,
        },
      },
    }),
    defineField({
      name: 'betAmount',
      title: 'Bet Amount',
      type: 'string',
      options: {
        aiAssist: {
          exclude: true,
        },
      },
    }),
    defineField({
      name: 'multiplier',
      title: 'Multiplier',
      type: 'string',
      options: {
        aiAssist: {
          exclude: true,
        },
      },
    }),
    defineField({
      name: 'payout',
      title: 'Payout',
      type: 'string',
      options: {
        aiAssist: {
          exclude: true,
        },
      },
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        aiAssist: {
          exclude: true,
        },
      },
    }),
  ],
})
