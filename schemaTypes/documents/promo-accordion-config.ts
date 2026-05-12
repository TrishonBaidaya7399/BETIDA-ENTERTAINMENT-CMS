import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'promoAccordionConfig',
  title: 'Promo Accordion Config',
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
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'items',
      title: 'Accordion Items',
      type: 'array',
      validation: (Rule) => Rule.min(1),
      options: {
        sortable: true,
      },
      of: [
        defineArrayMember({
          type: 'object',
          name: 'promoItem',
          title: 'Promo Item',

          fields: [
            defineField({
              name: 'isActive',
              title: 'Active / Visible?',
              type: 'boolean',
              initialValue: true,
            }),

            defineField({
              name: 'defaultExpanded',
              title: 'Default Expanded',
              type: 'boolean',
              description: 'If ON, this card will be expanded by default',
              initialValue: false,
            }),

            // Background Image
            // defineField({
            //   name: 'backgroundImage',
            //   title: 'Will be Deleted Background Image',
            //   type: 'string',
            //   description:
            //     'Aspect Ratio: 1200/180 (Cloudinary public_id for expanded card background), e.g.: deneme10',
            //   //   validation: (Rule) => Rule.required(),
            // }),
            defineField({
              name: 'backgroundImageDsk',
              title: 'Desktop Version Background Image',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              description:
                'Aspect Ratio: 1200/180 (Cloudinary public_id for expanded card background)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'backgroundImageTab',
              title: 'Tab Version Background Image (Optional)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              description:
                'Aspect Ratio: 743/176. Optional: If not provided, then the Desktop version will be used (Cloudinary public_id for expanded card background)',
            }),
            defineField({
              name: 'backgroundImageMbl',
              title: 'Mobile Version Background Image',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              description:
                'Aspect Ratio: 354/176 (Cloudinary public_id for expanded card background)',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'backgroundImageAlt',
              title: 'Background Image Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'collapsedSideIcon',
              title: 'Collapsed Side icon (Cloudinary Public ID)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              description:
                'Aspect Ratio: 32:32. Cloudinary public_id for collapsed bard left side icon',
            }),

            defineField({
              name: 'collapsedSideIconAlt',
              title: 'Collapsed Side icon Alt Text',
              description: 'Cloudinary public_id for collapsed bard left side icon',
              type: 'string',
            }),

            // Content
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description:
                'Use {placeholderKey} for dynamic values. Example: "+{percentageValue} on every crypto"',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'array',
              of: [{type: 'block'}],
              description: 'Use {placeholderKey} for dynamic values',
            }),

            // Placeholders
            defineField({
              name: 'placeholders',
              title: 'Placeholder Values',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'key',
                      title: 'Token Key',
                      type: 'string',
                      options: {aiAssist: {exclude: true}},
                      validation: (Rule) =>
                        Rule.required().custom((value) => {
                          if (!value) return true
                          if (/\s/.test(value)) return 'Key must not contain spaces'
                          if (/{|}/.test(value)) return 'Do not include curly braces'
                          return true
                        }),
                    }),
                    defineField({
                      name: 'value',
                      title: 'Value',
                      type: 'string',
                      options: {aiAssist: {exclude: true}},
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {key: 'key', value: 'value'},
                    prepare({key, value}) {
                      return {title: `{${key}} → ${value}`}
                    },
                  },
                }),
              ],
            }),

            // CTA
            defineField({
              name: 'ctaLabel',
              title: 'CTA Button Label',
              type: 'string',
            }),

            defineField({
              name: 'ctaUrl',
              title: 'CTA Button URL',
              type: 'string',
              options: {aiAssist: {exclude: true}},
            }),
            defineField({
              name: 'ctaButtonPosition',
              title: 'CTA Button Position',
              description: 'Select where to show the CTA button at the bottom',
              type: 'string',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Center', value: 'center'},
                  {title: 'Right', value: 'right'},
                ],
                layout: 'dropdown', // or 'radio' if you prefer buttons
                aiAssist: {exclude: true},
              },
              initialValue: 'right',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'ctaOpenInNewTab',
              title: 'Open CTA in New Tab?',
              type: 'boolean',
              initialValue: false,
            }),

            // Gradient for expanded border
            defineField({
              name: 'gradientStart',
              title: 'Gradient Border Start Color',
              type: 'color',
              options: {disableAlpha: false},
            }),

            defineField({
              name: 'gradientEnd',
              title: 'Gradient Border End Color',
              type: 'color',
              options: {disableAlpha: false},
            }),
            defineField({
              name: 'textColor',
              title: 'CTA Button Text color',
              description:
                'The CTA button will take the gradient color as above and the text color will be this',
              type: 'color',
              options: {disableAlpha: false},
            }),
          ],

          preview: {
            select: {
              title: 'title',
              isActive: 'isActive',
              defaultExpanded: 'defaultExpanded',
            },
            prepare({title, isActive, defaultExpanded}) {
              const state = defaultExpanded ? '▼ Expanded' : '▶ Collapsed'
              const hidden = isActive === false ? ' • Hidden' : ''
              return {
                title: title || 'Untitled Promo',
                subtitle: `${state}${hidden}`,
              }
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'sectionTitle',
      language: 'language',
    },
    prepare({title, language}) {
      return {
        title: title || 'Promo Accordion',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • Promo Accordion`,
      }
    },
  },
})
