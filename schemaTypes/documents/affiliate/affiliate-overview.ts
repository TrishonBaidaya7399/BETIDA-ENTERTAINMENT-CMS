import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'affiliateOverview',
  title: 'Affiliate Overview',
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
      name: 'referAndEarn',
      title: 'Refer and Earn',
      type: 'object',
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
          title: 'Image (URL or Public ID)',
          type: 'string',
          options: {aiAssist: {exclude: true}},
          validation: (Rule) => Rule.required(),
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
                  title: 'Image (Optional: URL or Public ID)',
                  description: "If you don't want to show video, you can add an image here",
                  type: 'string',
                  options: {aiAssist: {exclude: true}},
                }),
                defineField({
                  name: 'video',
                  title: 'Video (URL or Public ID)',
                  type: 'string',
                  options: {aiAssist: {exclude: true}},
                  validation: (Rule) => Rule.required(),
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
                          title: 'Video (URL or Public ID)',
                          type: 'string',
                          options: {aiAssist: {exclude: true}},
                          validation: (Rule) => Rule.required(),
                        }),
                      ],
                      preview: {
                        select: {title: 'video'},
                        prepare({title}: any) {
                          return {
                            title: title || 'Additional Video',
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
      fields: [
        defineField({
          name: 'image',
          title: 'Image (URL or Public ID)',
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
  ],
  preview: {
    select: {
      language: 'language',
      referAndEarn: 'referAndEarn',
      partneringWithUs: 'partneringWithUs',
    },
    prepare({language, referAndEarn, partneringWithUs}: any) {
      const stepCount = Array.isArray(partneringWithUs?.steps) ? partneringWithUs.steps.length : 0
      const statCount = Array.isArray(referAndEarn?.stats) ? referAndEarn.stats.length : 0
      return {
        title: referAndEarn?.title || 'Affiliate Overview',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${statCount} stats • ${stepCount} steps`,
      }
    },
  },
})
