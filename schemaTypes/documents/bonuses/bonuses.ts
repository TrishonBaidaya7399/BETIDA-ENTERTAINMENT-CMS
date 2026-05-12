import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'bonuses',
  title: 'Bonuses',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'details', title: 'Bonus Details'},
    {name: 'terms', title: 'Terms & Conditions'},
    {name: 'visibility', title: 'Visibility & Dates'},
  ],
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),
    // === ID ===
    defineField({
      name: 'id',
      title: 'ID',
      type: 'number',
      group: 'content',
      validation: (Rule) => Rule.required().positive().integer(),
    }),

    // === Title (i18n) ===
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),

    // === SLUG (auto-generated from English title) ===
    defineField({
      name: 'slug',
      title: 'Slug',
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
        // ✅ isUnique only within the same language
        isUnique: async (slugValue, context) => {
          const {document, getClient} = context
          if (!slugValue || !document) return true

          const client = getClient({apiVersion: '2025-12-02'})
          const currentId = document._id?.replace(/^drafts\./, '')

          const query = `*[ _type == "bonuses" && slug.current == $slug && language == $lang && _id != $currentId && !(_id in path("drafts.**")) ][0]._id`

          const result = await client.fetch(query, {
            slug: slugValue,
            lang: document.language,
            currentId,
          })

          return result == null
        },
      },
      validation: (Rule) => Rule.required(),
    }),

    // === Subtitle (i18n) ===
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'content',
    }),

    // === Category: MULTI-SELECT (All, Casino, Sportsbook) ===
    defineField({
      name: 'category',
      title: 'Categories',
      type: 'array',

      options: {
        aiAssist: {
          translateAction: false,
        },
      },

      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'All', value: 'all'},
              {title: 'Casino', value: 'casino'},
              {title: 'Sportsbook', value: 'sportsbook'},
            ],
          },
        },
      ],
      validation: (Rule) => Rule.min(1).unique(),
      group: 'content',
    }),
    // === Status: Offers (Default), In Progress, Used ===
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Offers (Default)', value: 'default'},
          {title: 'In Progress', value: 'inprogress'},
          {title: 'Used', value: 'used'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
      validation: (Rule) => Rule.required(),
    }),

    // === NEW: Claimable (controls Active tab visibility) ===
    defineField({
      name: 'claimable',
      title: 'Claimable',
      type: 'boolean',
      initialValue: true,
      description: 'If true and within date range, this bonus appears in Active tab.',
      group: 'visibility',
    }),
    defineField({
      name: 'claimed',
      title: 'Claimed',
      type: 'boolean',
      initialValue: false,
      description:
        'The claimed operation will be handle from backend and this field is just for CMS reference.',
      group: 'visibility',
    }),

    // === Starts At ===
    defineField({
      name: 'startsAt',
      title: 'Starts At',
      type: 'datetime',
      group: 'visibility',
      validation: (Rule) => Rule.required(),
    }),

    // === Ends At ===
    defineField({
      name: 'endsAt',
      title: 'Ends At',
      type: 'datetime',
      group: 'visibility',
      validation: (Rule) => Rule.required(),
    }),

    // === Thumbnail ===
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      description:
        'Legacy Cloudinary ID. Use the Sanity image field below — this will be removed after frontend migration.',
      type: 'string',
      group: 'content',

      options: {
        aiAssist: {
          translateAction: false,
        },
      },
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail (Format: WebP recommended)',
      description: 'Any image type is accepted, but WebP is recommended for best performance.',
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
          description: 'This text will be used alt text for accessibility and SEO.',
        }),
      ],
    }),
    //  thumbnail title
    defineField({
      name: 'image_title',
      title: 'Thumbnail Title (Localized)',
      description:
        'Add the title of the thumbnail image which will show upon the thumbnail as layer text',
      type: 'string',
      group: 'content',
    }),

    // === DETAILS OBJECT ===
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      group: 'terms',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.min(1),
    }),

    // === TERMS & CONDITIONS (i18n block content) ===
    defineField({
      name: 'termsAndConditions',
      title: 'Terms & Conditions',
      type: 'array',
      group: 'terms',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'termsLink',
      title: 'Terms and Condition link',
      type: 'string',
      group: 'content',

      options: {
        aiAssist: {
          translateAction: false,
        },
      },
    }),
    defineField({
      name: 'detailsButtonTitle',
      title: 'View Details Button Title',
      type: 'string',
    }),

    defineField({
      name: 'detailsButtonLink',
      title: 'View Details Button Link',
      type: 'string',

      options: {
        aiAssist: {
          translateAction: false,
        },
      },
    }),
    defineField({
      name: 'claimButtonText',
      title: 'Claim Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'redeemButtonText',
      title: 'Redeem Button Text',
      type: 'string',
    }),
    defineField({
      name: 'redeemModalRedirectURL',
      title: 'Redeem Button CTA URL',

      options: {
        aiAssist: {
          translateAction: false,
        },
      },

      description:
        'This button will show at the details page bottom. Example URL: /bonuses/${slug}?modal=claim&type=Bonus. If you leave this field empty, it will automatically redirect to the claim modal',
      type: 'string',
    }),
    defineField({
      name: 'modalTitle',
      title: 'Modal Title (View Details)',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
      description: "Title shown in the modal when user clicks 'View Details'",
    }),
    defineField({
      name: 'modalDetails',
      title: 'Modal Content (View Details)',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      language: 'language',
      id: 'id',
      claimable: 'claimable',
      category: 'category',
      status: 'status',
      media: 'image',
    },
    prepare({title, language, id, claimable, category, status, media}) {
      const lang = language ? language.toUpperCase() : '—'

      const categories =
        Array.isArray(category) && category.length > 0
          ? category
              .map((c: string) => (c === 'all' ? 'All' : c === 'casino' ? 'Casino' : 'Sportsbook'))
              .join(', ')
          : '–'

      const statusLabel =
        status === 'default' ? 'Offers' : status === 'inprogress' ? 'In Progress' : 'Used'

      return {
        title: `#${id ?? '—'} ${title}` || 'Untitled Bonus',
        subtitle: `Lang: ${lang} ${claimable && ' • Claimable'} • Cat: ${categories} • Status: ${statusLabel}`,
        media,
      }
    },
  },
})
