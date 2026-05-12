import {CubeIcon, ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const provablyFairCalculationConfig = defineType({
  name: 'provablyFairCalculationConfig',
  title: 'Provably Fair – Calculation Tool',
  type: 'document',

  groups: [
    {name: 'general', title: 'General'},
    {name: 'fields', title: 'Fields & Layout'},
  ],

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
      title: 'Page / Section Title (i18n)',
      type: 'string',

      group: 'general',
    }),

    defineField({
      name: 'description',
      title: 'Description / Intro Text (i18n)',
      type: 'string',

      group: 'general',
    }),

    // Main content blocks – controls order & what appears
    defineField({
      name: 'content',
      title: 'Content Blocks (order matters)',
      type: 'array',
      group: 'fields',
      of: [
        defineArrayMember({
          name: 'gameSelect',
          title: 'Game Selection Dropdown',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder (when nothing selected)',
              type: 'string',
            }),
            defineField({
              name: 'options',
              title: 'Available Games (add / remove / reorder here)',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'gameOption',
                  title: 'Game Option',
                  fields: [
                    defineField({
                      name: 'value',
                      title: 'Value (internal / English key)',
                      type: 'string',
                      options: {aiAssist: {exclude: true}},
                      validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/),
                      description: 'Used in code/backend, e.g. dice, dragon-tower',
                    }),
                    defineField({
                      name: 'label',
                      title: 'Display Label (i18n)',
                      type: 'string',

                      validation: (Rule) => Rule.required().min(1),
                    }),
                  ],
                  preview: {
                    select: {label: 'label', value: 'value'},
                    prepare({label, value}: any) {
                      return {
                        title: label || '(no label)',
                        subtitle: value || '—',
                      }
                    },
                  },
                }),
              ],
              initialValue: [
                {
                  _key: 'dice',
                  value: 'dice',
                  label: 'Dice',
                },
                {
                  _key: 'dragon-tower',
                  value: 'dragon-tower',
                  label: 'Dragon Tower',
                },
              ],
            }),
          ],
          preview: {
            select: {label: 'label', options: 'options'},
            prepare({label, options}: any) {
              const optionCount = Array.isArray(options) ? options.length : 0
              return {
                title: 'Game Selection Dropdown',
                subtitle: `${label || 'No label'} • ${optionCount} game${optionCount !== 1 ? 's' : ''}`,
              }
            },
          },
        }),

        // 2. Client Seed Input
        defineArrayMember({
          name: 'clientSeedInput',
          title: 'Client Seed Input',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
            }),
          ],
          preview: {
            prepare: () => ({title: 'Client Seed Input'}),
          },
        }),

        // 3. Server Seed Input
        defineArrayMember({
          name: 'serverSeedInput',
          title: 'Server Seed Input',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
            }),
          ],
          preview: {
            prepare: () => ({title: 'Server Seed Input'}),
          },
        }),

        // 4. Nonce Input
        defineArrayMember({
          name: 'nonceInput',
          title: 'Nonce Input (number)',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
            }),
          ],
          preview: {
            prepare: () => ({title: 'Nonce Input'}),
          },
        }),

        // 5. CTA Button (new)
        defineArrayMember({
          name: 'ctaButton',
          title: 'Call-to-Action Button',
          type: 'object',
          fields: [
            defineField({
              name: 'ctaText',
              title: 'Button Text (i18n)',
              type: 'string',
              validation: (Rule) => Rule.required(),
              options: {
                aiAssist: {
                  translateAction: true,
                },
              },
            }),

            defineField({
              name: 'ctaExternalUrl',
              title: 'Redirect URL',
              type: 'url',
              options: {aiAssist: {exclude: true}},
              description: 'Full URL[](https://...) where the button should redirect',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                  allowRelative: false,
                }),
            }),

            defineField({
              name: 'openInNewTab',
              title: 'Open link in new tab?',
              type: 'boolean',
              initialValue: true,
              description: 'If checked, link opens in new browser tab (_blank)',
              options: {
                layout: 'switch',
              },
            }),

            defineField({
              name: 'variant',
              title: 'Style',
              type: 'string',
              options: {
                list: [
                  {
                    title: 'Primary (orangeGradient)',
                    value: 'orangeGradient',
                  },
                  {title: 'Secondary (gray)', value: 'gray'},
                  {title: 'Outline', value: 'outline'},
                ],
                aiAssist: {exclude: true},
              },
              initialValue: 'orangeGradient',
            }),
          ],

          preview: {
            select: {
              text: 'ctaText',
              url: 'ctaExternalUrl',
              newTab: 'openInNewTab',
              variant: 'variant',
            },
            prepare({text, url, newTab, variant}: any) {
              const parts = []
              if (url) parts.push(`→ ${url}`)
              if (newTab) parts.push('new tab')
              if (variant) parts.push(variant)
              return {
                title: `CTA: ${text || '(no text)'}`,
                subtitle: parts.length > 0 ? parts.join(' • ') : 'Action button',
              }
            },
          },
        }),

        // 6. Cloudinary Image
        defineArrayMember({
          name: 'cloudinaryImage',
          title: 'Cloudinary Image',
          type: 'object',
          options: {aiAssist: {exclude: true}},
          icon: ImageIcon,
          fields: [
            defineField({
              name: 'publicId',
              title: 'Cloudinary Public ID',
              type: 'string',
              description: 'e.g. fair-calculation, banners/result-bg, etc.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              initialValue: 'Provably fair calculation illustration',
            }),
          ],
          preview: {
            select: {id: 'publicId'},
            prepare({id}) {
              return {
                title: 'Cloudinary Image',
                subtitle: id || '(missing public ID)',
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
      title: 'title',
      content: 'content',
    },
    prepare({language, title, content}: any) {
      const blockCount = Array.isArray(content) ? content.length : 0
      return {
        title: title || 'Provably Fair – Calculation Tool Config',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${blockCount} content block${blockCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
