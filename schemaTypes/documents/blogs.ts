import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'blogs',
  title: 'Blogs Content',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),

    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) =>
        Rule.integer()
          .min(0)
          .custom(async (value, context) => {
            if (value === null || value === undefined) return true

            const documentId = context?.document?._id
            const client = context?.getClient({apiVersion: '2023-05-03'})
            if (!client || !documentId) return true

            const id = documentId.replace(/^drafts\./, '')
            const query = `count(*[_type == "blogs" && defined(order) && order == $value && _id != $published && _id != $draft])`

            const params = {
              value,
              draft: `drafts.${id}`,
              published: id,
            }

            const duplicateCount = await client.fetch(query, params)
            return duplicateCount === 0 || 'This order number is already used.'
          }),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   options: {
    //     source: 'title',
    //     maxLength: 96,
    //     slugify: (input) =>
    //       input
    //         .toLowerCase()
    //         .trim()
    //         .replace(/[^a-z0-9\s-]/g, '')
    //         .replace(/\s+/g, '-')
    //         .replace(/--+/g, '-')
    //         .substring(0, 96),
    //   },
    //   validation: (Rule) => Rule.required(),
    // }),
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

          const query = `*[ _type == "blogs" && slug.current == $slug && language == $lang && _id != $currentId && !(_id in path("drafts.**")) ][0]._id`

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
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail - Cloudinary Public ID (5:7 Portrait)',
      description:
        'Legacy Cloudinary ID (5:7, 832×1164). Use the Sanity image field below — this will be removed after frontend migration.',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail (5:7 Portrait)',
      description:
        'Master image: 832×1164 (5:7 ratio). Any image type is accepted, but WebP is recommended for best performance.',
      type: 'image',
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
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'X (Twitter)', value: 'x'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'LinkedIn', value: 'linkedin'},
                ],
                layout: 'dropdown',
                aiAssist: {exclude: true},
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) =>
                Rule.custom((value, ctx) => {
                  const parent = ctx?.parent as {platform?: string}
                  if (parent?.platform && !value) return 'Link is required if Platform is selected.'
                  return true
                }),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'All Blogs', value: 'all'},
              {title: 'Crypto', value: 'crypto'},
              {title: 'How to Guides', value: 'how-to-guides'},
              {title: 'Stake News', value: 'stake-news'},
              {title: 'Sport', value: 'sport'},
              {title: 'Poker', value: 'poker'},
              {title: 'Casino', value: 'casino'},
              {title: 'VIP & Bonuses', value: 'vipBonuses'},
              {title: 'Other', value: 'other'},
            ],
            layout: 'dropdown',
            aiAssist: {exclude: true},
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      slug: 'slug.current',
      language: 'language',
      order: 'order',
      categories: 'categories',
      title: 'title',
      publishDate: 'publishDate',
      media: 'image',
    },
    prepare({slug, language, order, categories, title, publishDate, media}) {
      const langFlag: Record<string, string> = {
        en: '🇬🇧',
        tr: '🇹🇷',
        de: '🇩🇪',
        es: '🇪🇸',
        fr: '🇫🇷',
        pt: '🇵🇹',
        ru: '🇷🇺',
        ar: '🇸🇦',
        hi: '🇮🇳',
        zh: '🇨🇳',
      }

      const flag = langFlag[language] || '🌐'

      const orderText = order != null ? `#${order}` : ''

      const categoriesText =
        Array.isArray(categories) && categories.length > 0 ? categories.join(', ') : 'No categories'

      const date = publishDate
        ? new Date(publishDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : 'Unpublished'

      return {
        title: `${slug || title || 'Untitled'}`,
        subtitle: `Lang: ${flag} • 📅 ${date} • ${orderText ? `${orderText} • ` : ''} 📃 ${categoriesText}`,
        media,
      }
    },
  },
})
