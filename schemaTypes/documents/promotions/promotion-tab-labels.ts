// schemas/promotion-tab-labels.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'promotionTabLabels',
  title: 'Promotion Tab Labels',
  type: 'document',

  // ───────────────────────────────────────────────
  // Document-level internationalization (exactly like your promotion.ts schema)
  // ───────────────────────────────────────────────
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),

    defineField({
      name: 'activePromotions',
      title: 'Active Promotions Tab',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string', // ← changed from internationalizedArrayString
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'visible',
          title: 'Visible',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),

    defineField({
      name: 'allPromotions',
      title: 'All Promotions Tab',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string', // ← changed from internationalizedArrayString
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'visible',
          title: 'Visible',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),

    defineField({
      name: 'casino',
      title: 'Casino Tab',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string', // ← changed from internationalizedArrayString
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'visible',
          title: 'Visible',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),

    defineField({
      name: 'sports',
      title: 'Sports Tab',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string', // ← changed from internationalizedArrayString
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'visible',
          title: 'Visible',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),

    defineField({
      name: 'community',
      title: 'Community Tab',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string', // ← changed from internationalizedArrayString
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'visible',
          title: 'Visible',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),

    defineField({
      name: 'poker',
      title: 'Poker Tab',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string', // ← changed from internationalizedArrayString
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'visible',
          title: 'Visible',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),

    defineField({
      name: 'history',
      title: 'History Tab',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string', // ← changed from internationalizedArrayString
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'visible',
          title: 'Visible',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
  ],

  preview: {
    select: {
      language: 'language',
    },
    prepare({language = 'en'}) {
      return {
        title: 'Promotion Tab Labels',
        subtitle: `Language: ${language.toUpperCase()}`,
      }
    },
  },
})
