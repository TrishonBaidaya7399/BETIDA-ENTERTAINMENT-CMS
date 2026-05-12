import {defineType, defineField, defineArrayMember} from 'sanity'

export const rgSelfExclusion = defineType({
  name: 'RgSelfExclusion',
  title: 'Responsible Gambling - Self Exclusion',
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
      name: 'tools',
      type: 'array',
      title: 'Tools',
      of: [
        defineArrayMember({
          name: 'tool',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{type: 'block'}],
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'redirectURL',
              type: 'string',
              title: 'Redirect URL',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      description: 'Array of tool cards with title, content, and redirect URL',
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
