import {defineType, defineField} from 'sanity'

export const rgGamblingFaqs = defineType({
  name: 'RgGamblingFaqs',
  title: "Responsible Gambling FAQ's",
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
      name: 'branchName',
      type: 'string',

      title: 'Branch Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'banner',
      type: 'string',
      title: 'Banner Image URL',
      description: 'Add the banner image URL or path',
    }),
    defineField({
      name: 'content',
      title: 'Main Content',
      type: 'array',
      description: 'Rich text or blog-style content section 1',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      branchName: 'branchName',
      language: 'language',
    },
    prepare({branchName, language}) {
      const langDisplay = language ? language.toUpperCase() : '—'

      return {
        title: branchName || 'Unnamed Responsible Gambling Page',
        subtitle: `Language: ${langDisplay}`,
      }
    },
  },
})
