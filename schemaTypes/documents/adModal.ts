import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'adModal',
  title: 'Advertisement Modal',
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
      name: 'modalActive',
      title: 'Enable Modal',
      type: 'boolean',
      description: 'Turn this on to make the modal visible on the selected pages below.',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'casinoPage',
      title: 'Show on Casino Page?',
      type: 'boolean',
      description: 'If enabled, the modal will appear on all Casino pages.',
      initialValue: false,
    }),

    defineField({
      name: 'sportsPage',
      title: 'Show on Sports Page?',
      type: 'boolean',
      description: 'If enabled, the modal will appear on all Sports pages.',
      initialValue: false,
    }),

    defineField({
      name: 'title',
      title: 'Modal Title',
      type: 'string',

      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Modal Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'image',
      title: 'Modal Image',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'ctaUrl',
      title: 'CTA Link',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'ctaButtonText',
      title: 'Button Text',
      type: 'string',

      initialValue: 'Claim Now',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'openInNewTab',
      title: 'Open Link in New Tab',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      language: 'language',
      active: 'modalActive',
      casino: 'casinoPage',
      sports: 'sportsPage',
    },
    prepare({title, language, active, casino, sports}: any) {
      const pages = []
      if (casino) pages.push('Casino')
      if (sports) pages.push('Sports')
      const pageDisplay = pages.length > 0 ? pages.join(' & ') : 'No pages'

      return {
        title: title || 'Untitled Ad Modal',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${active ? '🟢 Active' : '🔴 Disabled'} • 📄 ${pageDisplay}`,
      }
    },
  },
})
