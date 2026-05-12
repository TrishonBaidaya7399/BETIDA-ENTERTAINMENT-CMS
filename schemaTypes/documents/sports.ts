// schemaTypes/sports.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'sportsTableData',
  title: 'Sports Table Data Config',
  type: 'document',
  preview: {
    select: {
      game: 'game',
      user: 'user',
      language: 'language',
      payout: 'payout',
      multiplier: 'multiplier',
      time: 'time',
    },
    prepare({game, user, language, payout, multiplier, time}: any) {
      return {
        title: `${game || 'No game'} — ${user || 'No user'}`,
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • 💰 ${payout || '—'} • ✖️ ${multiplier || '—'} • 🕐 ${time || '—'}`,
      }
    },
  },
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'string',
      options: {
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      options: {
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'betAmount',
      title: 'Bet Amount',
      type: 'string',
      options: {
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'multiplier',
      title: 'Multiplier',
      type: 'string',
      options: {
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'payout',
      title: 'Payout',
      type: 'string',
      options: {
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
