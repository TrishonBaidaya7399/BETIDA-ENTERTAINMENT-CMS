// schemaTypes/trendingSport.ts
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'slots',
  title: 'Game Slots',
  type: 'document',
  orderings: [orderRankOrdering],
  preview: {
    select: {
      language: 'language',
      id: 'id',
      provider: 'provider',
      players: 'players',
      slug: 'slug.current',
      cta: 'cta',
    },
    prepare({ language, id, provider, players, slug, cta}: any) {
      const parts = []
      if (provider) parts.push(`🏢 ${provider}`)
      if (players != null) parts.push(`👥 ${players.toLocaleString()}`)
      if (cta) parts.push(`🔗 ${cta}`)
      else if (slug?.current) parts.push(`🔗 /casino/${slug.current}`)

      return {
        title: `${slug || 'No slug'}`,
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${parts.length ? parts.join(' • ') : 'No details'}`,
      }
    },
  },
  fields: [
    orderRankField({type: 'slots'}),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),
    defineField({
      name: 'src',
      title: 'Image Source',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        aiAssist: {exclude: true},
        isUnique: async (slug, context) => {
          const client = context.getClient({apiVersion: '2024-01-01'})
          const currentId = context.document?._id?.replace(/^drafts\./, '') || null
          const currentLanguage = context.document?.language || 'en'

          const query = `
        *[
          _type == "slots" &&
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
      name: 'provider',
      title: 'Provider Name',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      description: '(Optional): Need to show on the sports details page',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: '(Optional): Need to show on the sports details page',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        aiAssist: {exclude: true},
      },
    }),

    defineField({name: 'players', title: 'Players', type: 'number'}),
    defineField({
      name: 'cta',
      title: 'CTA Link (Optional)',
      options: {aiAssist: {exclude: true}},
      description:
        "If you leave this field empty, the click action will be automatically redirect to the casino Slug page '/casino/{slug}'",
      type: 'string',
    }),
  ],
})
