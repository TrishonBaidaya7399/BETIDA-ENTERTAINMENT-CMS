import {defineType, defineField} from 'sanity'

export const depositLimitsContent = defineType({
  name: 'DepositLimitsContent',
  title: 'Responsive Gambling Deposit Limits',
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
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Set Your Deposit Limits',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'banner',
      type: 'string',
      title: 'Banner Image URL',
      description: 'Add the banner image URL or path',
    }),
    defineField({
      name: 'description',
      title: 'Description Paragraph',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'tableTitle',
      title: 'Table Title',
      type: 'string',
      initialValue: 'Your Deposit Limits',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      branchName: 'title',
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
