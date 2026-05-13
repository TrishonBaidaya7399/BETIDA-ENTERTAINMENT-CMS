import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'responsibleGamblingData',
  title: 'Responsible Gambling',
  type: 'document',
  groups: [
    {
      name: 'betidasmart',
      title: 'BETIDA Smart',
    },
    {
      name: 'recogniseSigns',
      title: 'Recognise the Signs',
    },
    {
      name: 'gamblingLimits',
      title: 'Gambling Limits',
    },
    {
      name: 'depositLimits',
      title: 'Deposit Limits',
    },
    {
      name: 'selfExclusion',
      title: 'Self Exclusion',
    },
    {
      name: 'selfAssessment',
      title: 'Self-Assessment',
    },
    {
      name: 'budgetCalculator',
      title: 'Budget Calculator',
    },
    {
      name: 'faqs',
      title: 'FAQs',
    },
  ],
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),

    // Tab Labels (Drag & Drop Ordering)
    defineField({
      name: 'tabLabels',
      title: 'Tab Labels Configuration (Drag to Reorder)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tabLabel',
          title: 'Tab Label',
          fields: [
            defineField({
              name: 'tabName',
              title: 'Tab',
              type: 'string',
              options: {
                list: [
                  {title: 'BETIDA Smart', value: 'betidasmart'},
                  {title: 'Recognise the Signs', value: 'recogniseSigns'},
                  {title: 'Responsible Gambling FAQs', value: 'faqs'},
                  {title: 'Self Exclusion', value: 'selfExclusion'},
                  {title: 'Gambling Limits', value: 'gamblingLimits'},
                  {title: 'Deposit Limits', value: 'depositLimits'},
                  {title: 'Self-Assessment', value: 'selfAssessment'},
                  {title: 'Budget Calculator', value: 'budgetCalculator'},
                ],
                aiAssist: {exclude: true},
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {tabName: 'tabName', label: 'label', isActive: 'isActive'},
            prepare({tabName, label, isActive}: any) {
              return {
                title: label || 'Untitled',
                subtitle: `${tabName || '—'} ${isActive ? '✓' : '✗'}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // BETIDA Smart Tab
    defineField({
      name: 'betidasmartData',
      title: 'BETIDA Smart Content',
      type: 'object',
      group: 'betidasmart',
      fields: [
        defineField({
          name: 'branchName',
          type: 'string',
          title: 'Branch Name',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'banner',
          type: 'image',
          title: 'Banner Image (920x256 PIXELS)',
          options: {
            accept: 'image/*',
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'This text will be used alt text for accessibility and SEO.',
            }),
          ],
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
                  iconValue: 'icon',
                },
                prepare({text, iconValue}) {
                  const displayText =
                    typeof text === 'string' && text.trim()
                      ? text.trim().substring(0, 60) + (text.length > 60 ? '…' : '')
                      : 'No tip text'

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
                    title: displayText,
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
      validation: (Rule) => Rule.required(),
    }),

    // Recognise the Signs Tab
    defineField({
      name: 'recogniseSignsData',
      title: 'Recognise the Signs Content',
      type: 'object',
      group: 'recogniseSigns',
      fields: [
        defineField({
          name: 'branchName',
          type: 'string',
          title: 'Branch Name',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'banner',
          type: 'image',
          title: 'Banner Image (920x256 PIXELS)',
          options: {
            accept: 'image/*',
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'This text will be used alt text for accessibility and SEO.',
            }),
          ],
        }),
        defineField({
          name: 'content1',
          title: 'Main Content',
          type: 'array',
          description: 'Rich text or blog-style content',
          of: [{type: 'block'}],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Gambling Limits Tab
    defineField({
      name: 'gamblingLimitsData',
      title: 'Gambling Limits Content',
      type: 'object',
      group: 'gamblingLimits',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Set Your Gambling Limits',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'banner',
          type: 'image',
          title: 'Banner Image (920x256 PIXELS)',
          options: {
            accept: 'image/*',
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'This text will be used alt text for accessibility and SEO.',
            }),
          ],
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'array',
          of: [{type: 'block'}],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Deposit Limits Tab
    defineField({
      name: 'depositLimitsData',
      title: 'Deposit Limits Content',
      type: 'object',
      group: 'depositLimits',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Set Your Deposit Limits',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'banner',
          type: 'image',
          title: 'Banner Image (920x256 PIXELS)',
          options: {
            accept: 'image/*',
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'This text will be used alt text for accessibility and SEO.',
            }),
          ],
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
      validation: (Rule) => Rule.required(),
    }),

    // Self Exclusion Tab
    defineField({
      name: 'selfExclusionData',
      title: 'Self Exclusion Content',
      type: 'object',
      group: 'selfExclusion',
      fields: [
        defineField({
          name: 'branchName',
          type: 'string',
          title: 'Branch Name',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'banner',
          type: 'image',
          title: 'Banner Image (920x256 PIXELS)',
          options: {
            accept: 'image/*',
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'This text will be used alt text for accessibility and SEO.',
            }),
          ],
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
              preview: {
                select: {title: 'title'},
                prepare({title}: any) {
                  return {
                    title: title || 'Unnamed Tool',
                  }
                },
              },
            }),
          ],
          description: 'Array of tool cards with title, content, and redirect URL',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Self-Assessment Tab
    defineField({
      name: 'selfAssessmentData',
      title: 'Self-Assessment Content',
      type: 'object',
      group: 'selfAssessment',
      fields: [
        defineField({
          name: 'contentTitle',
          type: 'string',
          title: 'Title',
          initialValue: 'Your Gambling Habits',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'banner',
          type: 'image',
          title: 'Banner Image (920x256 PIXELS)',
          options: {
            accept: 'image/*',
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'This text will be used alt text for accessibility and SEO.',
            }),
          ],
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'array',
          of: [{type: 'block'}],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'questions',
          title: 'Questions',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Question Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {title: 'text'},
                prepare({title}: any) {
                  return {
                    title: title || 'Untitled Question',
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'learnMoreUrl',
          title: 'Learn More URL',
          type: 'string',
        }),
        defineField({
          name: 'liveSupportUrl',
          title: 'Live Support URL',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Budget Calculator Tab
    defineField({
      name: 'budgetCalculatorData',
      title: 'Budget Calculator Content',
      type: 'object',
      group: 'budgetCalculator',
      fields: [
        defineField({
          name: 'banner',
          type: 'image',
          title: 'Banner Image (920x256 PIXELS)',
          options: {
            accept: 'image/*',
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'This text will be used alt text for accessibility and SEO.',
            }),
          ],
        }),
      ],
      // validation: (Rule) => Rule.required(),
    }),

    // FAQs Tab
    defineField({
      name: 'faqsData',
      title: 'FAQs Content',
      type: 'object',
      group: 'faqs',
      fields: [
        defineField({
          name: 'branchName',
          type: 'string',
          title: 'Branch Name',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'banner',
          type: 'image',
          title: 'Banner Image (920x256 PIXELS)',
          options: {
            accept: 'image/*',
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'This text will be used alt text for accessibility and SEO.',
            }),
          ],
        }),
        defineField({
          name: 'content',
          title: 'Main Content',
          type: 'array',
          description: 'Rich text or blog-style content',
          of: [{type: 'block'}],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      language: 'language',
    },
    prepare({language}: any) {
      return {
        title: 'Responsible Gambling Data',
        subtitle: `Language: ${language?.toUpperCase() || 'NO-LANG'}`,
      }
    },
  },
})
