// schemas/promotion.ts
import {defineType, defineField} from 'sanity'
import {isSlugUniqueAcrossAllPromotionTypes} from '../../../utils/isSlugUniqueAcrossPromotions'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

type PromotionCategory = 'casino' | 'sports' | 'poker' | 'community'

export default defineType({
  name: 'promotion',
  title: 'Promotion',
  type: 'document',
  orderings: [orderRankOrdering],
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'details', title: 'Details'},
    {name: 'actions', title: 'Actions'},
  ],

  fields: [
    orderRankField({type: 'promotion'}),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),
    defineField({
      name: 'category',
      title: 'Promotion Category',
      type: 'string',
      options: {
        list: [
          {title: 'Casino', value: 'casino'},
          {title: 'Sports', value: 'sports'},
          {title: 'Poker', value: 'poker'},
          {title: 'Community', value: 'community'},
        ],
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required().error('Please select a category'),
      initialValue: 'casino',
      group: 'content',
    }),

    // defineField({
    //   name: 'id',
    //   title: 'Serial ID',
    //   type: 'number',
    //   description: 'Unique serial number for this promotion (e.g. 101, 102, 103…)',
    //   validation: (Rule) =>
    //     Rule.required()
    //       .min(1)
    //       .integer()
    //       .custom(async (value, context) => {
    //         if (value == null) return true

    //         const client = context.getClient({apiVersion: '2024-01-01'})
    //         const currentId = context.document?._id?.replace(/^drafts\./, '') || null
    //         const query = `
    //       *[
    //         _type == "promotion" &&
    //         id == $value &&
    //         !(_id in path("drafts.**")) &&   // ← EXCLUDE ALL DRAFTS
    //         (!defined($currentId) || _id != $currentId)
    //       ][0]
    //     `

    //         const params = {
    //           value,
    //           currentId,
    //         }

    //         const conflict = await client.fetch(query, params)

    //         return conflict ? 'This Serial ID is already used by another promotion.' : true
    //       }),
    // }),
    defineField({
      name: 'icon',
      title: 'Title Icon (Cloudinary Public ID)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      description: 'Aspect Ration: 32/32. This icon will show at the left side of the title',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'type',
      title: 'Type (e.g. Tournament, Bonus)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.max(12),
      group: 'content',
    }),

    defineField({
      name: 'startsAt',
      title: 'Starts At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'endsAt',
      title: 'Ends At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'thumbnail',
      title: 'Thumbnail - Cloudinary Public ID (5:7 Portrait)',
      description:
        'Legacy Cloudinary ID (5:7, 832×1164). Use the Sanity image field below — this will be removed after frontend migration.',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail (5:7 Portrait)',
      description:
        'Master image: 832×1164 (5:7 ratio). Any image type is accepted, but WebP is recommended for best performance.',
      type: 'image',
      group: 'content',
      options: {
        accept: 'image/*',
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description:
            'This text will be used alt text for accessibility and SEO.',
        }),
      ],
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .substring(0, 96),
        isUnique: isSlugUniqueAcrossAllPromotionTypes,
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
      group: 'content',
    }),

    // === DETAILS GROUP ===

    defineField({
      name: 'details',
      title: 'Promotion Details',
      type: 'object',
      group: 'details',
      fields: [
        defineField({
          name: 'details',
          title: 'Promotion Details',
          type: 'text',
        }),

        defineField({
          name: 'howToEnterTitle',
          title: 'How to Enter Title',
          type: 'string',
        }),
        defineField({
          name: 'howToEnter',
          title: 'How to Enter Content',
          type: 'array',
          of: [{type: 'block'}],
        }),

        defineField({
          name: 'selectedGamesTitle',
          title: 'Selected Games Title',
          type: 'string',
        }),
        defineField({
          name: 'selectedGames',
          title: 'Selected Games',
          type: 'array',
          of: [{type: 'block'}],
        }),

        defineField({
          name: 'prizesBreakdownTitle',
          title: 'Prizes Breakdown Title',
          type: 'string',
        }),
        defineField({
          name: 'prizesBreakdown',
          title: 'Prizes Breakdown',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'position',
                  title: 'Position',
                  type: 'string',
                }),
                defineField({
                  name: 'prize',
                  title: 'Prize',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
        }),

        defineField({
          name: 'leaderboardTitle',
          title: 'Leaderboard Title',
          type: 'string',
        }),
        defineField({
          name: 'leaderboard',
          title: 'Leaderboard',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'position',
                  title: 'Position',
                  type: 'string',
                }),
                defineField({name: 'user', title: 'User', type: 'string'}),
                defineField({
                  name: 'result',
                  title: 'Result',
                  type: 'string',
                }),
              ],
            },
          ],
        }),

        defineField({
          name: 'leaderboardNote',
          title: 'Leaderboard Note',
          type: 'array',
          of: [{type: 'block'}],
        }),

        defineField({
          name: 'termsTitle',
          title: 'Terms & Conditions Title',
          type: 'string',
        }),
        defineField({
          name: 'terms',
          title: 'Terms & Conditions',
          type: 'array',
          of: [{type: 'block'}],
        }),
      ],
    }),

    // === ACTIONS GROUP ===
    // defineField({
    //   name: "redirectButtonTitle",
    //   title: "Main Button Title",
    //   type: "string",
    //
    //   group: "actions",
    // }),

    // defineField({
    //   name: "redirectButtonUrl",
    //   title: "Main Button URL",
    //   type: "string",
    //   group: "actions",
    // }),

    // defineField({
    //   name: "redirectButton2Title",
    //   title: "Secondary Button Title",
    //   description: "Extra button (not shown in slider cards)",
    //   type: "string",
    //
    //   group: "actions",
    // }),

    // defineField({
    //   name: "redirectButton2Url",
    //   title: "Secondary Button URL",
    //   description: "Extra button (not shown in slider cards)",
    //   type: "string",
    //   group: "actions",
    // }),

    // === cta buttons for promotion cards ===
    defineField({
      name: 'cardButtonTitle',
      title: 'Card Button Title (First Button)',
      type: 'string',
      group: 'actions',
    }),

    defineField({
      name: 'cardButtonLink',
      title: 'Card Button Link (First Button)',
      type: 'string',
      group: 'actions',
      options: {aiAssist: {exclude: true}},
    }),

    defineField({
      name: 'cardButton2Title',
      title: 'Card Button Title (Second Button)',
      type: 'string',
      group: 'actions',
    }),

    defineField({
      name: 'cardButton2Link',
      title: 'Card Button Link (Second Button)',
      description: 'Extra button (not shown in slider cards)',
      type: 'string',
      group: 'actions',
      options: {aiAssist: {exclude: true}},
    }),
    // === cta buttons for promotion details page ===
    defineField({
      name: 'detailsButtonTitle',
      title: 'Details Button Title (First Button)',
      type: 'string',
      group: 'actions',
    }),

    defineField({
      name: 'detailsButtonLink',
      title: 'Details Button Link (First Button)',
      type: 'string',
      group: 'actions',
      options: {aiAssist: {exclude: true}},
    }),

    defineField({
      name: 'detailsButton2Title',
      title: 'Details Button Title (Second Button)',
      type: 'string',
      group: 'actions',
    }),

    defineField({
      name: 'detailsButton2Link',
      title: 'Details Button Link (Second Button)',
      description: 'Extra button (not shown in slider cards)',
      type: 'string',
      group: 'actions',
      options: {aiAssist: {exclude: true}},
    }),
  ],

  preview: {
    select: {
      slug: 'slug.current',
      language: 'language',
      category: 'category',
      startsAt: 'startsAt',
      media: 'image',
    },
    prepare({slug, language, category, startsAt, media}) {
      const categoryLabels: Record<PromotionCategory, string> = {
        casino: 'Casino',
        sports: 'Sports',
        poker: 'Poker',
        community: 'Community',
      }

      const categoryLabel = category
        ? (categoryLabels[category as PromotionCategory] ?? 'Unknown')
        : 'Unknown'

      return {
        title: slug || 'No slug',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${categoryLabel} • ${
          startsAt ? new Date(startsAt).toLocaleDateString() : 'No date'
        }`,
        media,
      }
    },
  },
})
