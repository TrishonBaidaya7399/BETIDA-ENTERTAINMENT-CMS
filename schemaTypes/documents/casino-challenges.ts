import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'casinoChallenges',
  title: 'Casino Challenges',
  type: 'document',
  orderings: [orderRankOrdering],
  preview: {
    select: {
      slug: 'slug',
      language: 'language',
      category: 'category',
      provider: 'provider',
      prizeAmount: 'prizeAmount',
      prizeCurrency: 'prizeCurrency',
      multiplier: 'multiplier',
    },
    prepare({
      slug,
      language,
      category,
      provider,
      prizeAmount,
      prizeCurrency,
      multiplier,
    }: any) {
      const categoryEmoji =
        category === 'active'
          ? '🟢'
          : category === 'all-claimed'
            ? '✅'
            : category === 'my-claimed'
              ? '👤'
              : '❓'

      return {
        title: `${slug.current || 'No title'}`,
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${categoryEmoji} ${category || 'No category'} • 🏢 ${provider || '—'} • 💰 ${prizeAmount || '—'} ${prizeCurrency || ''} • ✖️ ${multiplier || '—'}`,
      }
    },
  },
  fields: [
    orderRankField({type: 'casinoChallenges'}),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subTitle',
      title: 'Sub Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: async (slug, context) => {
          const client = context.getClient({apiVersion: '2024-01-01'})
          const currentId = context.document?._id?.replace(/^drafts\./, '') || null
          const currentLanguage = context.document?.language || 'en'
          const query = `
        *[
          _type == "casinoChallenges" &&
          slug.current == $slug &&
          language == $currentLanguage &&
          !(_id in path("drafts.**")) &&
          (!defined($currentId) || _id != $currentId)
        ][0]
      `

          const conflict = await client.fetch(query, {
            slug,
            currentId,
            currentLanguage,
          })

          return !conflict
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',

      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'All Claimed', value: 'all-claimed'},
          {title: 'My Claimed', value: 'my-claimed'},
        ],
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'multiplier',
      title: 'Multiplier',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'minBet',
      title: 'Min Bet',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'betCurrency',
      title: 'Bet Currency',
      type: 'string',
      options: {
        list: [
          {title: 'Bitcoin', value: 'bitcoin'},
          {title: 'Ethereum', value: 'ethereum'},
          {title: 'USDT', value: 'usdt'},
          {title: 'Binance', value: 'binance'},
        ],
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prizeAmount',
      title: 'Prize Amount',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prizeCurrency',
      title: 'Prize Currency',
      type: 'string',
      options: {
        list: [
          {title: 'Bitcoin', value: 'bitcoin'},
          {title: 'Ethereum', value: 'ethereum'},
          {title: 'USDT', value: 'usdt'},
          {title: 'Binance', value: 'binance'},
        ],
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdBy',
      title: 'Created By',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdByImage',
      title: 'Created By Image',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'ctaURL',
      title: 'Redirect URL (Click to card)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      // validation: (Rule) => Rule.required(),
    }),
  ],
})
