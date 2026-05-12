import {defineType, defineField} from 'sanity'

export const rgBranchName = defineType({
  name: 'RgBranchName',
  title: 'Responsible Gambling - Branch Name',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content1',
      title: 'Main Content 1',
      description: 'Rich text or blog-style content section 1',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'tipsTitle',
      type: 'string',
      title: 'Tips Title',
      description: 'e.g., 6 Tips For Effective Management of Your Gambling Activities',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tipsForEffect',
      title: 'Tips for Effective Management',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              validation: (Rule) => Rule.required().integer().min(0),
            }),
            defineField({
              name: 'text',
              title: 'Tip Text',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Tip Icon',
              type: 'string',
              options: {
                list: [
                  {
                    title: 'Control Icon',
                    value: '/tips-icons/Control-icon.png',
                  },
                  {
                    title: 'Integration Control Icon',
                    value: '/tips-icons/IntegrationControl-icon-1.png',
                  },
                  {
                    title: 'Maximising Player Value Icon',
                    value: '/tips-icons/MaximisingPlayerValue-Icon.png',
                  },
                  {
                    title: 'Real-Time Analytics Icon',
                    value: '/tips-icons/Real-TimeAnalytics-Icon.png',
                  },
                  {
                    title: 'Simplicity Icon',
                    value: '/tips-icons/Simplicity-icon.png',
                  },
                  {
                    title: 'Speed-2 Icon',
                    value: '/tips-icons/Speed-2-icon.png',
                  },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              text: 'text',
              order: 'order',
              iconValue: 'icon',
            },
            prepare({text, order, iconValue}) {
              const displayText =
                typeof text === 'string' && text.trim()
                  ? text.trim().substring(0, 60) + (text.length > 60 ? '…' : '')
                  : 'No tip text'

              const title = order != null ? `${order}. ${displayText}` : displayText

              const iconOptions = [
                {title: 'Control Icon', value: '/tips-icons/Control-icon.png'},
                {
                  title: 'Integration Control Icon',
                  value: '/tips-icons/IntegrationControl-icon-1.png',
                },
                {
                  title: 'Maximising Player Value Icon',
                  value: '/tips-icons/MaximisingPlayerValue-Icon.png',
                },
                {
                  title: 'Real-Time Analytics Icon',
                  value: '/tips-icons/Real-TimeAnalytics-Icon.png',
                },
                {title: 'Simplicity Icon', value: '/tips-icons/Simplicity-icon.png'},
                {title: 'Speed-2 Icon', value: '/tips-icons/Speed-2-icon.png'},
              ]

              const selectedIcon = iconOptions.find((opt) => opt.value === iconValue)
              const iconName =
                selectedIcon?.title || (iconValue ? 'Unknown icon' : 'No icon selected')

              return {
                title,
                subtitle: `Icon: ${iconName}`,
              }
            },
          },
        },
      ],
      description: 'Tips for responsible gambling',
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'content2',
      title: 'Main Content 2',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rich text or blog-style content section 2',
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
