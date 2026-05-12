import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'ctaButtonConfig',
  title: 'Search Panel CTA Buttons Configuration',
  description: 'Manage all CTA buttons across the site (singleton-like, one per language)',
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
      title: 'Internal Title',
      type: 'string',
      description: 'Just for reference (not shown anywhere)',
      initialValue: 'CTA Buttons Global Config',
      group: 'general',
      readOnly: true,
    }),

    defineField({
      name: 'buttons',
      title: 'CTA Buttons List',
      description:
        'Add one entry for each CTA button you want to manage. Recommended to add only 4. Otherwise, it may cause UI inconsistency',
      type: 'array',
      group: 'buttons',
      of: [
        defineArrayMember({
          name: 'ctaButton',
          type: 'object',
          title: 'CTA Button',
          fields: [
            defineField({
              name: 'label',
              title: 'Button Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'link',
              title: 'Redirect Link',
              type: 'string',
              description: 'Full URL or internal path (e.g. /jackpots or https://example.com)',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              initialValue: false,
              description: 'If enabled, link opens in new browser tab',
            }),

            defineField({
              name: 'isVisible',
              title: 'Show This Button',
              type: 'boolean',
              initialValue: true,
              description: 'Toggle visibility site-wide',
            }),
          ],

          preview: {
            select: {
              label: 'label',
              visible: 'isVisible',
              link: 'link',
            },
            prepare({label, visible, link}) {
              return {
                title: label || 'Unnamed Button',
                subtitle: visible ? link || 'No link' : 'Hidden – will not appear on site',
                media: visible ? '✅' : '❌',
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(4).warning('Recommended max 4 buttons to avoid UI issues'),
    }),
  ],

  groups: [
    {name: 'general', title: 'General'},
    {name: 'buttons', title: 'CTA Buttons'},
  ],

  preview: {
    select: {
      language: 'language',
    },
    prepare({language}) {
      const lang = language ? language.toUpperCase() : '?'
      return {
        title: 'CTA Buttons Configuration',
        subtitle: `Lan: ${lang} • Global search panel CTAs`,
      }
    },
  },
})
