import {defineType, defineField, defineArrayMember} from 'sanity'
import {EarthGlobeIcon, LinkIcon} from '@sanity/icons'

export default defineType({
  name: 'footerconfig',
  title: 'Footer Configuration',
  type: 'document',
  icon: EarthGlobeIcon,

  groups: [
    {name: 'sections', title: 'Footer Sections'},
    {name: 'legal', title: 'Legal & Info Texts'},
    {name: 'social', title: 'Social Links'},
    {name: 'branding', title: 'Branding'},
  ],

  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      readOnly: true,
      //   hidden: true,
      initialValue: 'en',
    }),

    // ================================
    // Footer Sections & Links
    // ================================
    defineField({
      name: 'sections',
      title: 'Footer Sections',
      type: 'array',
      group: 'sections',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          title: 'Section',
          icon: LinkIcon,
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              initialValue: 999,
              validation: (Rule) => Rule.integer().min(0),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'footerLink',
                  title: 'Link',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Link Text',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'url',
                      title: 'URL',
                      type: 'string',
                      description: 'Example: /casino or https://facebook.com',
                      validation: (Rule) =>
                        Rule.required().custom((value: string | undefined) => {
                          if (!value) return 'URL is required'
                          if (value.startsWith('/')) return true
                          if (/^https?:\/\//i.test(value)) return true
                          return 'URL must start with / (internal) or http/https (external)'
                        }),
                    }),
                    defineField({
                      name: 'newTab',
                      title: 'Open in New Tab?',
                      type: 'boolean',
                      initialValue: true,
                      description: 'External links open in new tab by default',
                    }),
                  ],
                  preview: {
                    select: {
                      text: 'text',
                      url: 'url',
                    },
                    prepare({text, url}: {text?: string; url?: string}) {
                      const type = url?.startsWith('http') ? 'External' : 'Internal'
                      return {
                        title: text || 'No text',
                        subtitle: `${type}: ${url || '—'}`,
                      }
                    },
                  },
                }),
              ],
              validation: (Rule) => Rule.min(1),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              order: 'order',
            },
            prepare({title, order}: {title?: string; order?: number}) {
              return {
                title: title || 'Untitled Section',
                subtitle: `Order: ${order ?? 999}`,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),

    // ================================
    // Legal / Info Texts (Portable Text – per language now)
    // ================================
    defineField({
      name: 'legalContent',
      title: 'Legal & Info Texts (Copyright, Ownership, etc.)',
      type: 'array',
      group: 'legal',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),

    // ================================
    // Social Media Links (shared across languages)
    // ================================
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  'facebook',
                  'x',
                  'instagram',
                  'youtube',
                  'tiktok',
                  'linkedin',
                  'telegram',
                  'discord',
                ],
                aiAssist: {
                  exclude: true,
                },
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {platform: 'platform', url: 'url'},
            prepare({platform, url}: {platform?: string; url?: string}) {
              return {
                title: platform
                  ? platform.charAt(0).toUpperCase() + platform.slice(1)
                  : 'Social Link',
                subtitle: url,
              }
            },
          },
        }),
      ],
    }),

    // ================================
    // Branding (shared across languages)
    // ================================
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      group: 'branding',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
      group: 'branding',
      options: {
        accept: 'image/svg+xml',
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'For accessibility',
        }),
      ],
    }),
    // defineField({
    //   name: 'licenseLogo',
    //   title: 'License Logo',
    //   type: 'image',
    //   group: 'branding',
    //   options: {
    //     accept: 'image/svg+xml',
    //   },
    //   fields: [
    //     defineField({
    //       name: 'alt',
    //       type: 'string',
    //       title: 'Alternative text',
    //       description: 'For accessibility',
    //     }),
    //   ],
    // }),
    // defineField({
    //   name: 'licenseLink',
    //   title: 'License URL',
    //   type: 'string',
    //   group: 'branding',
    // }),
  ],

  preview: {
    select: {
      language: 'language',
    },
    prepare({language}) {
      return {
        title: 'Footer Configuration',
        subtitle: language ? `Language: ${language.toUpperCase()}` : 'Language: not set',
      }
    },
  },
})
