import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'affiliates',
  title: 'Affiliates',
  type: 'document',
  groups: [
    {
      name: 'overview',
      title: 'Overview',
    },
    {
      name: 'campaigns',
      title: 'Campaigns',
    },
    {
      name: 'commission',
      title: 'Commission',
    },
    {
      name: 'referredUsers',
      title: 'Referred Users',
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
      group: 'overview',
    }),

    // Overview Tab
    defineField({
      name: 'referAndEarn',
      title: 'Refer and Earn',
      type: 'object',
      group: 'overview',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                  options: {aiAssist: {exclude: true}},
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {value: 'value', label: 'label'},
                prepare({value, label}: any) {
                  return {
                    title: value || '—',
                    subtitle: label || 'No label',
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'image',
          title: 'Thumbnail (1:1 Square)',
          description:
            'Master image: 720×720 (1:1 ratio). Any image type is accepted, but WebP is recommended for best performance.',
          type: 'image',
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
          name: 'affiliateCode',
          title: 'Affiliate Code',
          type: 'string',
          options: {aiAssist: {exclude: true}},
        }),
        defineField({
          name: 'unauthenticatedText',
          title: 'Text for Unauthenticated Users',
          type: 'string',
          description:
            'Text shown to users who are not logged in (e.g. login prompt on the Refer & Earn section)',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'partneringWithUs',
      title: 'Partnering With Us',
      type: 'object',
      group: 'overview',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'id',
                  title: 'ID',
                  type: 'number',
                  validation: (Rule) => Rule.required().integer().positive(),
                }),
                defineField({
                  name: 'step',
                  title: 'Step',
                  type: 'string',
                  options: {aiAssist: {exclude: true}},
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'image',
                  title: 'Image (1:1 Square)',
                  description:
                    'Master image: 720×720 (1:1 ratio). Any image type is accepted, but WebP is recommended for best performance.',
                  type: 'image',
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
                  name: 'video',
                  title: 'Video',
                  type: 'file',
                  options: {
                    accept: 'video/*',
                  },
                  // validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'additionalVideos',
                  title: 'Additional Videos (optional)',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      name: 'additionalVideoItem',
                      title: 'Additional Video',
                      fields: [
                        defineField({
                          name: 'video',
                          title: 'Video',
                          type: 'file',
                          options: {
                            accept: 'video/*',
                          },
                          validation: (Rule) => Rule.required(),
                        }),
                      ],
                      preview: {
                        select: {title: 'video'},
                        prepare({title}: any) {
                          return {
                            title: title?.originalFilename || 'Additional Video',
                          }
                        },
                      },
                    },
                  ],
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      {
                        title: 'Affiliate Icon SVG',
                        value: 'AffiliateIconSVGV1',
                      },
                      {title: 'Link Icon SVG', value: 'LinkIconSVG'},
                      {title: 'Flower Icon SVG', value: 'FlowerIconSVG'},
                    ],
                    aiAssist: {exclude: true},
                  },
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {id: 'id', title: 'title', step: 'step'},
                prepare({id, title, step}: any) {
                  return {
                    title: `${id || '?'}. ${title || 'Untitled Step'}`,
                    subtitle: step || 'No step label',
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'exclusiveAdvantages',
      title: 'Exclusive Advantages',
      type: 'object',
      group: 'overview',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'Advantages',
          title: 'Advantages',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'id',
                  title: 'ID',
                  type: 'number',
                  validation: (Rule) => Rule.required().integer().positive(),
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'details',
                  title: 'Details',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {aiAssist: {exclude: true}},
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {id: 'id', title: 'title', details: 'details'},
                prepare({id, title, details}: any) {
                  return {
                    title: `${id || '?'}. ${title || 'Untitled Advantage'}`,
                    subtitle: details
                      ? details.length > 50
                        ? details.slice(0, 47) + '...'
                        : details
                      : '—',
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'commissionRules',
      title: 'Commission Rules',
      type: 'object',
      group: 'overview',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'rules',
          title: 'Rules',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'id',
                  title: 'ID',
                  type: 'number',
                  validation: (Rule) => Rule.required().integer().positive(),
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'details',
                  title: 'Details',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'rate',
                  title: 'Rate',
                  type: 'string',
                  options: {aiAssist: {exclude: true}},
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {id: 'id', title: 'title', rate: 'rate'},
                prepare({id, title, rate}: any) {
                  return {
                    title: `${id || '?'}. ${title || 'Untitled Rule'}`,
                    subtitle: rate ? `Rate: ${rate}` : 'No rate set',
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'templates',
      title: 'Templates',
      type: 'object',
      group: 'overview',
      fields: [
        defineField({
          name: 'image',
          title: 'Image (Ratio: 121×32)',
          description:
            'Recommended size: 968×256 pixels. Any image type is accepted, but WebP is recommended for best performance.',
          type: 'image',
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
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
        }),
        defineField({
          name: 'browseTemplateLink',
          title: 'Browse Template Link',
          type: 'string',
          options: {aiAssist: {exclude: true}},
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Campaigns Tab
    defineField({
      name: 'campaigns',
      title: 'Campaigns List',
      type: 'array',
      group: 'campaigns',
      of: [
        {
          type: 'object',
          name: 'campaign',
          title: 'Campaign',
          fields: [
            defineField({
              name: 'name',
              title: 'Campaign Name',
              type: 'string',
              description: 'Localized campaign name',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Campaign Value',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'createdDate',
              title: 'Created Date',
              options: {aiAssist: {exclude: true}},
              type: 'datetime',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hits',
              title: 'Hits',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'referredUsers',
              title: 'Referred Users',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'firstTimeDeposits',
              title: 'First Time Deposits',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'totalDeposits',
              title: 'Total Deposits',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'commissionRate',
              title: 'Commission Rate',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'overallCommission',
              title: 'Overall Commission',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'availableCommission',
              title: 'Available Commission',
              type: 'string',
              description: 'Localized available commission',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'campaignLink',
              title: 'Campaign Link',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              name: 'name',
              value: 'value',
              hits: 'hits',
              commissionRate: 'commissionRate',
            },
            prepare({name, value, hits, commissionRate}: any) {
              return {
                title: `${name || 'Unnamed Campaign'} — ${value || '—'}`,
                subtitle: `👆 ${hits ?? 0} hits • 💰 ${commissionRate || '—'}`,
              }
            },
          },
        },
      ],
    }),

    // Commission Tab
    defineField({
      name: 'commissionData',
      title: 'Commission Information',
      type: 'array',
      group: 'commission',
      of: [
        {
          type: 'object',
          name: 'commissionEntry',
          title: 'Commission Entry',
          fields: [
            defineField({
              name: 'currencies',
              title: 'Currencies',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'available_commission',
              title: 'Available Commission',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'withdrawn_commission',
              title: 'Withdrawn Commission',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'lifetime_commission',
              title: 'Lifetime Commission',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              currencies: 'currencies',
              type: 'type',
              available_commission: 'available_commission',
              lifetime_commission: 'lifetime_commission',
            },
            prepare({currencies, type, available_commission, lifetime_commission}: any) {
              return {
                title: `${currencies || 'No currency'} — ${type || 'No type'}`,
                subtitle: `💰 Available: ${available_commission || '—'} • 🏆 Lifetime: ${lifetime_commission || '—'}`,
              }
            },
          },
        },
      ],
    }),

    // Referred Users Tab
    defineField({
      name: 'referredUsersList',
      title: 'Referred Users',
      type: 'array',
      group: 'referredUsers',
      of: [
        {
          type: 'object',
          name: 'referredUser',
          title: 'Referred User',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'createdDate',
              title: 'Created Date',
              type: 'datetime',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hits',
              title: 'Hits',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'referredUsers',
              title: 'Referred Users Count',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'firstTimeDeposits',
              title: 'First Time Deposits',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'totalDeposits',
              title: 'Total Deposits',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'commissionRate',
              title: 'Commission Rate',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'overallCommission',
              title: 'Overall Commission',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'availableCommission',
              title: 'Available Commission',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'userLink',
              title: 'User Link',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              name: 'name',
              value: 'value',
              hits: 'hits',
              commissionRate: 'commissionRate',
              createdDate: 'createdDate',
            },
            prepare({name, value, hits, commissionRate, createdDate}: any) {
              return {
                title: `${name || 'Unnamed'} (${value || '—'})`,
                subtitle: `👆 ${hits ?? 0} hits • 💰 ${commissionRate || '—'} • 📅 ${createdDate ? new Date(createdDate).toLocaleDateString() : '—'}`,
              }
            },
          },
        },
      ],
    }),

    // FAQs Tab
    defineField({
      name: 'faqsCta',
      title: 'Call-to-Action Button',
      type: 'object',
      group: 'faqs',
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

    defineField({
      name: 'faqsList',
      title: 'FAQs',
      type: 'array',
      group: 'faqs',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          preview: {
            select: {
              title: 'title',
              category: 'category',
            },
            prepare({title, category}: any) {
              const categoryEmoji =
                category === 'general'
                  ? '📋'
                  : category === 'affiliate-program'
                    ? '🤝'
                    : category === 'earnings'
                      ? '💰'
                      : '❓'
              return {
                title: title || 'Untitled FAQ',
                subtitle: `${categoryEmoji} ${category || 'No category'}`,
              }
            },
          },
          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  {title: 'General', value: 'general'},
                  {title: 'Affiliate Program', value: 'affiliate-program'},
                  {title: 'Earnings', value: 'earnings'},
                ],
                aiAssist: {exclude: true},
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
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
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      language: 'language',
      referAndEarn: 'referAndEarn',
      campaigns: 'campaigns',
      commissionData: 'commissionData',
      referredUsers: 'referredUsersList',
      faqs: 'faqsList',
    },
    prepare({language, referAndEarn, campaigns, commissionData, referredUsers, faqs}: any) {
      const campaignCount = Array.isArray(campaigns) ? campaigns.length : 0
      const commissionCount = Array.isArray(commissionData) ? commissionData.length : 0
      const userCount = Array.isArray(referredUsers) ? referredUsers.length : 0
      const faqCount = Array.isArray(faqs) ? faqs.length : 0

      return {
        title: referAndEarn?.title || 'Affiliates Data',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • 🎯 ${campaignCount} campaigns • 💰 ${commissionCount} commissions • 👥 ${userCount} users • ❓ ${faqCount} FAQs`,
      }
    },
  },
})
