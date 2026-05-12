import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'faqConfig',
  title: 'FAQ Configuration',
  type: 'document',

  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),

    // Section title
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // CTA button at bottom
    defineField({
      name: 'cta',
      title: 'Call-to-Action Button',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Button Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Redirect URL',
          type: 'string',
          options: {aiAssist: {exclude: true}},
        }),
      ],
    }),

    // Questions array
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'question',
          title: 'Question',

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
            defineField({
              name: 'icon',
              title: 'Title Icon (Cloudinary Public ID)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              description:
                'Aspect Ration: 32/32. This icon will show at the left side of the title',
            }),
            defineField({
              name: 'title',
              title: 'Question Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'content',
              title: 'Answer',
              type: 'array',
              of: [{type: 'block'}],
              validation: (Rule) => Rule.required().min(1),
            }),

            defineField({
              name: 'image',
              title: 'Right Side Image (Cloudinary Public ID)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              description: 'Enter Cloudinary public_id only (Ratio: 16:9)',
            }),

            defineField({
              name: 'imageAlt',
              title: 'Image Alt Text',
              type: 'string',
            }),

            defineField({
              name: 'gradientStart',
              title: 'Tab Gradient Start Color',
              type: 'color',
              options: {disableAlpha: false},
            }),

            defineField({
              name: 'gradientEnd',
              title: 'Tab Gradient End Color',
              type: 'color',
              options: {disableAlpha: false},
            }),

            defineField({
              name: 'tabsShadow',
              title: 'Hover Glow & Border Color',
              type: 'color',
              options: {disableAlpha: false},
            }),

            // CTA Button 1
            defineField({
              name: 'ctaButton1',
              title: 'CTA Button 1',
              type: 'object',
              options: {
                collapsible: true,
                collapsed: true,
                columns: 1,
              },
              fields: [
                defineField({
                  name: 'label',
                  title: 'Button Text',
                  type: 'string',
                }),

                defineField({
                  name: 'url',
                  title: 'Link URL',
                  type: 'string',
                  options: {aiAssist: {exclude: true}},
                }),

                defineField({
                  name: 'openInNewTab',
                  title: 'Open in New Tab?',
                  type: 'boolean',
                  initialValue: false,
                }),

                defineField({
                  name: 'style',
                  title: 'Button Style',
                  type: 'object',
                  options: {
                    collapsible: true,
                    collapsed: true,
                  },
                  fields: [
                    defineField({
                      name: 'isGradient',
                      title: 'Use Gradient Background?',
                      type: 'boolean',
                      initialValue: true,
                    }),

                    defineField({
                      name: 'solidBgColor',
                      title: 'Solid Background Color',
                      type: 'color',
                      options: {disableAlpha: false},
                      hidden: ({parent}) => parent?.isGradient === true,
                    }),

                    defineField({
                      name: 'gradientStart',
                      title: 'Gradient Start Color',
                      type: 'color',
                      options: {disableAlpha: false},
                      hidden: ({parent}) => parent?.isGradient === false,
                    }),

                    defineField({
                      name: 'gradientEnd',
                      title: 'Gradient End Color',
                      type: 'color',
                      options: {disableAlpha: false},
                      hidden: ({parent}) => parent?.isGradient === false,
                    }),

                    defineField({
                      name: 'textColor',
                      title: 'Text Color',
                      type: 'color',
                      options: {disableAlpha: false},
                    }),

                    defineField({
                      name: 'hoverBgColor',
                      title: 'Hover Background (Solid)',
                      type: 'color',
                      options: {disableAlpha: false},
                      hidden: ({parent}) => parent?.isGradient === true,
                    }),

                    defineField({
                      name: 'hoverTextColor',
                      title: 'Hover Text Color',
                      type: 'color',
                      options: {disableAlpha: false},
                    }),
                  ],
                }),
              ],
            }),

            // CTA Button 2
            defineField({
              name: 'ctaButton2',
              title: 'CTA Button 2',
              type: 'object',
              options: {
                collapsible: true,
                collapsed: true,
                columns: 1,
              },
              fields: [
                defineField({
                  name: 'label',
                  title: 'Button Text',
                  type: 'string',
                }),

                defineField({
                  name: 'url',
                  title: 'Link URL',
                  type: 'string',
                  options: {aiAssist: {exclude: true}},
                }),

                defineField({
                  name: 'openInNewTab',
                  title: 'Open in New Tab?',
                  type: 'boolean',
                  initialValue: false,
                }),

                defineField({
                  name: 'style',
                  title: 'Button Style',
                  type: 'object',
                  options: {
                    collapsible: true,
                    collapsed: true,
                  },
                  fields: [
                    defineField({
                      name: 'isGradient',
                      title: 'Use Gradient Background?',
                      type: 'boolean',
                      initialValue: true,
                    }),

                    defineField({
                      name: 'solidBgColor',
                      title: 'Solid Background Color',
                      type: 'color',
                      options: {disableAlpha: false},
                      hidden: ({parent}) => parent?.isGradient === true,
                    }),

                    defineField({
                      name: 'gradientStart',
                      title: 'Gradient Start Color',
                      type: 'color',
                      options: {disableAlpha: false},
                      hidden: ({parent}) => parent?.isGradient === false,
                    }),

                    defineField({
                      name: 'gradientEnd',
                      title: 'Gradient End Color',
                      type: 'color',
                      options: {disableAlpha: false},
                      hidden: ({parent}) => parent?.isGradient === false,
                    }),

                    defineField({
                      name: 'textColor',
                      title: 'Text Color',
                      type: 'color',
                      options: {disableAlpha: false},
                    }),

                    defineField({
                      name: 'hoverBgColor',
                      title: 'Hover Background (Solid)',
                      type: 'color',
                      options: {disableAlpha: false},
                      hidden: ({parent}) => parent?.isGradient === true,
                    }),

                    defineField({
                      name: 'hoverTextColor',
                      title: 'Hover Text Color',
                      type: 'color',
                      options: {disableAlpha: false},
                    }),
                  ],
                }),
              ],
            }),
          ],

          preview: {
            select: {
              title: 'title',
              isActive: 'isActive',
            },

            prepare({title, isActive}) {
              return {
                title: title || 'Untitled Question',
                subtitle: isActive === false ? '(Hidden)' : undefined,
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
      title: 'sectionTitle',
      language: 'language',
    },

    prepare({title, language}) {
      return {
        title: title || 'FAQ Section',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • FAQ Section`,
      }
    },
  },
})
