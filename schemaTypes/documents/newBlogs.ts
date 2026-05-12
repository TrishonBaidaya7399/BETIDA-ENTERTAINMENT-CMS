import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'newBlogs',
  title: 'New Blogs',
  type: 'document',
  fields: [
    // ✅ Required by documentInternationalization
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),

    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Optional ordering number within the same language',
      validation: (Rule) =>
        Rule.integer()
          .min(0)
          .custom(async (value, context) => {
            if (value === null || value === undefined) return true
            const documentId = context?.document?._id
            const client = context?.getClient({apiVersion: '2025-02-19'})
            if (!client || !documentId) return true
            const id = documentId.replace(/^drafts\./, '')
            const query = `count(*[
              _type == "newBlogs"
              && defined(order)
              && order == $value
              && _id != $published
              && _id != $draft
              && language == $lang
            ])`
            const params = {
              value,
              draft: `drafts.${id}`,
              published: id,
              lang: context.document?.language,
            }
            const duplicateCount = await client.fetch(query, params)
            return duplicateCount === 0 || 'This order number is already used in this language.'
          }),
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
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .substring(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail (Image URL)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      validation: (Rule) => Rule.max(200),
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
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
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
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'title', language: 'language', order: 'order'},
    prepare({title, language, order}) {
      return {
        title: title || 'Untitled',
        subtitle: `${language ? language.toUpperCase() : '?'} • Order: ${order ?? '-'}`,
      }
    },
  },
})
