// schemas/medal.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'medal',
  title: 'Betting Competition Medals',
  type: 'document',

  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),
    defineField({
      name: 'name',
      title: 'Medal Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'icon',
      title: 'Medal Icon (Cloudinary Public ID)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'earned_on',
      title: 'Earned this Medal on',
      type: 'datetime',
    }),

    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      initialValue: 'Unlimited',
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      initialValue: 'Unlimited',
    }),

    defineField({
      name: 'numbersOfAchievements',
      title: 'Number of Achievements',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      description: 'Global count, e.g. "23824"',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      language: 'language',
      icon: 'icon',
    },
    prepare({title, icon, language}) {
      return {
        title: title || 'Untitled Medal',
        media: `${language?.toUpperCase() || 'NO-LANG'} • ${icon ? icon : 'No Icon'}`,
      }
    },
  },
})
