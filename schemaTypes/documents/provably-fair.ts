import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'provablyFair',
  title: 'Provably Fair (Overview, Implementation, Conversions, Game Events)',
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
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Overview', value: 'Overview'},
          {title: 'Implementation', value: 'Implementation'},
          {title: 'Conversions', value: 'Conversions'},
          {title: 'Game Events', value: 'Game Events'},
        ],
        layout: 'dropdown',
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'type',
        maxLength: 96,
        aiAssist: {exclude: true},
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
            .slice(0, 96),
        // ✅ Always return true — sharing slugs across translations is intentional
        isUnique: () => true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      type: 'type',
      language: 'language',
      slug: 'slug',
      description: 'description',
    },
    prepare({type, language, slug, description}: any) {
      const blockCount = Array.isArray(description) ? description.length : 0
      return {
        title: `${type || 'No type'}`,
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • /${slug?.current || 'no-slug'} • 📝 ${blockCount} block${blockCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
