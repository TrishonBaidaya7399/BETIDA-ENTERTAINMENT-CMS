// schemas/sidebarMenu.ts
import {defineType, defineField, defineArrayMember} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export default defineType({
  name: 'sidebarMenu',
  title: 'Sidebar Menu Configuration',
  type: 'document',
  icon: MenuIcon,
  groups: [{name: 'sections', title: 'Menu Sections'}],

  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),
    defineField({
      name: 'sections',
      title: 'All Menu Sections',
      type: 'array',
      group: 'sections',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title (optional)',
              type: 'string',
             
              description: 'e.g, Top Sports, More Links',
            }),
            // defineField({
            //   name: 'order',
            //   title: 'Section Order',
            //   type: 'number',
            //   description: 'Lower numbers appear first',
            //   validation: (Rule) => Rule.min(0).integer(),
            //   initialValue: 999,
            // }),

            defineField({
              name: 'type',
              title: 'Section Style',
              type: 'string',
              initialValue: 'default',
              options: {
                list: [
                  {title: 'Default (transparent)', value: 'default'},
                  {title: 'Group (with background)', value: 'group'},
                ],
                layout: 'radio',
                aiAssist: {exclude: true},
              },
            }),
            // defineField({
            //   name: "casinoActive",
            //   title: "Show in Casino Page?",
            //   type: "boolean",
            //   initialValue: false,
            // }),
            // defineField({
            //   name: "sportsActive",
            //   title: "Show in Sports Page?",
            //   type: "boolean",
            //   initialValue: false,
            // }),
            defineField({
              name: 'showOnHomepage',
              title: 'Show on Homepage',
              description: 'This item will be shown in the Home page sidebar only if enabled.',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'showOnCasino',
              title: 'Show on Casino Page',
              description: 'This item will be shown in the casino sidebar only if enabled.',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'showOnSports',
              title: 'Show on Sports Page',
              description: 'This item will be shown in the sports sidebar only if enabled.',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'items',
              title: 'Menu Items',
              type: 'array',
              of: [{type: 'menuItem'}],
              validation: (Rule) => Rule.min(1),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              type: 'type',
              showOnHomepage: 'showOnHomepage',
              showOnCasino: 'showOnCasino',
              showOnSports: 'showOnSports',
              items: 'items',
            },
            prepare({title, type, showOnHomepage, showOnCasino, showOnSports, items}: any) {
              const itemCount = Array.isArray(items) ? items.length : 0
              const pages = []
              if (showOnHomepage) pages.push('Home')
              if (showOnCasino) pages.push('Casino')
              if (showOnSports) pages.push('Sports')

              return {
                title: title || 'Untitled Section',
                subtitle: `${type === 'group' ? '📦 Grouped' : '📋 Default'} • ${itemCount} item${itemCount !== 1 ? 's' : ''} • Page${pages.length !== 1 ? 's' : ''}: ${pages.length ? pages.join(', ') : 'Hidden on all pages'}`,
              }
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      language: 'language',
      sections: 'sections',
    },
    prepare({language, sections}: any) {
      const sectionCount = Array.isArray(sections) ? sections.length : 0
      return {
        title: 'Sidebar Menu Configuration',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${sectionCount} section${sectionCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
