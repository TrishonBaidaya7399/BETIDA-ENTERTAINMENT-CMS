// schemas/promotionModal.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'promotionModal',
  title: 'Promotion Modals',
  type: 'document',

  fields: [
    // ==================== LANGUAGE (REQUIRED for document i18n) ====================
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),

    defineField({
      name: 'isActive',
      title: 'Active (Show on Homepage Cards)',
      type: 'boolean',
      initialValue: true,
      description: 'Turn OFF to hide this promotion from Races & Raffles section',
      validation: (Rule) => Rule.required(),
    }),

    // ==================== TRANSLATABLE FIELDS (now simple fields) ====================
    defineField({
      name: 'title',
      title: 'Modal Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subTitle',
      title: 'Card Sub-Title',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .substring(0, 96),
        isUnique: async (slugValue, context) => {
          const {document, getClient} = context
          if (!slugValue || !document) return true

          const client = getClient({apiVersion: '2024-01-01'})
          const currentId = document._id?.replace(/^drafts\./, '')

          const query = `*[ 
            _type == "promotionModal" && 
            slug.current == $slug && 
            language == $lang && 
            _id != $currentId && 
            !(_id in path("drafts.**")) 
          ][0]._id`

          const result = await client.fetch(query, {
            slug: slugValue,
            lang: document.language,
            currentId,
          })

          return result == null
        },
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'bannerImage',
      title: 'Banner Image (Cloudinary publicId)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'expiredAt',
      title: 'Expiry Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    // ==================== TICKET SECTION ====================
    defineField({
      name: 'ticketSection',
      title: 'Ticket Section (Optional)',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'goalAmount',
          title: 'Goal Amount',
          type: 'number',
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'ticketProgress',
          title: 'Progress (%)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'entriesTitle',
          title: 'Entries Label',
          type: 'string',
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'entries',
          title: 'Number of Entries',
          type: 'number',
          hidden: ({parent}) => !parent?.enabled,
        }),
      ],
    }),

    // ==================== USER STATS ====================
    defineField({
      name: 'userStats',
      title: 'Your Stats',
      type: 'object',
      fields: [
        defineField({
          name: 'positionLabel',
          title: 'Position Label',
          type: 'string',
        }),
        defineField({
          name: 'position',
          title: 'Position',
          type: 'number',
        }),
        defineField({
          name: 'currentPrizeLabel',
          title: 'Current Prize Label',
          type: 'string',
        }),
        defineField({
          name: 'currentPrize',
          title: 'Current Prize',
          type: 'string',
        }),
        defineField({
          name: 'wageredLabel',
          title: 'Wagered Label',
          type: 'string',
        }),
        defineField({
          name: 'wagered',
          title: 'Wagered',
          type: 'number',
        }),
      ],
    }),

    // ==================== DESCRIPTION (Rich Text) ====================
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),

    // ==================== REDIRECT BUTTON ====================
    defineField({
      name: 'redirect',
      title: 'Redirect Button',
      type: 'object',
      fields: [
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'Redirect URL',
          type: 'string',
          options: {aiAssist: {exclude: true}},
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      language: 'language',
      slug: 'slug.current',
      media: 'bannerImage',
    },
    prepare({title, language, slug, media}) {
      return {
        title: title || 'No title',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${slug ? `/${slug}` : 'No slug'}`,
        media,
      }
    },
  },
})
