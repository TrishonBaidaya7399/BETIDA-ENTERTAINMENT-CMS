import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'telegramPromo',
  title: 'Telegram Promo',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),

    defineField({
      name: 'body',
      type: 'text',
      title: 'Body (Plain Text Only)',
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'buttons',
      type: 'array',
      title: 'Buttons',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              type: 'string',
              title: 'Text',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'type',
              type: 'string',
              title: 'Type',
              initialValue: 'url',
              options: {
                list: [
                  {title: 'URL', value: 'url'},
                  {title: 'Web App', value: 'webapp'},
                ],
                layout: 'radio',
              },
            }),
          ],

          preview: {
            select: {
              title: 'text',
              subtitle: 'url',
              type: 'type',
            },
            prepare({title, subtitle, type}) {
              return {
                title: title || 'Button',
                subtitle: `${type?.toUpperCase() || 'URL'} → ${subtitle || ''}`,
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Is Active',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      body: 'body',
      media: 'image',
      isActive: 'isActive',
    },

    prepare({title, body, media, isActive}) {
      return {
        title: title || 'Telegram Promo',
        subtitle: `${isActive ? '🟢 Active' : '🔴 Inactive'} • ${
          body ? body.slice(0, 60) + '...' : 'No content'
        }`,
        media,
      }
    },
  },
})
