import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'statisticsModal',
  title: 'Statistics Modal',
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
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'statisticsModal',
      options: {aiAssist: {exclude: true}},
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',

      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'userInfo',
      title: 'User Info',
      type: 'object',
      fields: [
        defineField({
          name: 'username',
          title: 'Username',
          type: 'string',
          options: {aiAssist: {exclude: true}},

          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'joinDate',
          title: 'Join Date',
          type: 'datetime',
          options: {aiAssist: {exclude: true}},

          validation: (Rule) => Rule.required(),
        }),
      ],
      preview: {
        select: {
          username: 'username',
          joinDate: 'joinDate',
        },
        prepare({username, joinDate}) {
          return {
            title: username || 'No username',
            subtitle: joinDate ? `Joined: ${joinDate}` : 'No join date',
          }
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'filters',
      title: 'Filters',
      type: 'object',
      fields: [
        defineField({
          name: 'typeOptions',
          title: 'Type Options',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Label',
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
              ],
              preview: {
                select: {
                  label: 'label',
                  value: 'value',
                },
                prepare({label, value}) {
                  return {
                    title: label || 'Unnamed type',
                    subtitle: value ? `value: ${value}` : undefined,
                  }
                },
              },
            },
          ],

          validation: (Rule) => Rule.required().min(3),
        }),
        defineField({
          name: 'currencyOptions',
          title: 'Currency Options',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Label',
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
              ],
              preview: {
                select: {
                  label: 'label',
                  value: 'value',
                },
                prepare({label, value}) {
                  return {
                    title: label || 'Unnamed currency',
                    subtitle: value ? `code: ${value}` : undefined,
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(3),
        }),
      ],
      preview: {
        select: {
          types: 'typeOptions',
          currencies: 'currencyOptions',
        },
        prepare({types = [], currencies = []}) {
          return {
            title: 'Filters Configuration',
            subtitle: `${types.length} type options • ${currencies.length} currencies`,
          }
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Stats Data (by Type and Currency)',
      type: 'object',
      fields: [
        defineField({
          name: 'all',
          title: 'All Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Label',
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
              ],
              preview: {
                select: {
                  label: 'label',
                  value: 'value',
                },
                prepare({label, value}) {
                  return {
                    title: label || 'No label',
                    subtitle: value || '—',
                  }
                },
              },
            },
          ],
        }),
        defineField({
          name: 'casino',
          title: 'Casino Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Label',
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
              ],
              preview: {
                select: {
                  label: 'label',
                  value: 'value',
                },
                prepare({label, value}) {
                  return {
                    title: label || 'No label',
                    subtitle: value || '—',
                  }
                },
              },
            },
          ],
        }),
        defineField({
          name: 'sports',
          title: 'Sports Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Label',
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
              ],
              preview: {
                select: {
                  label: 'label',
                  value: 'value',
                },
                prepare({label, value}) {
                  return {
                    title: label || 'No label',
                    subtitle: value || '—',
                  }
                },
              },
            },
          ],
        }),
      ],
      preview: {
        select: {
          allCount: 'all',
          casinoCount: 'casino',
          sportsCount: 'sports',
        },
        prepare({allCount = [], casinoCount = [], sportsCount = []}) {
          const parts = []
          if (allCount.length) parts.push(`${allCount.length} all`)
          if (casinoCount.length) parts.push(`${casinoCount.length} casino`)
          if (sportsCount.length) parts.push(`${sportsCount.length} sports`)

          return {
            title: 'Statistics Data',
            subtitle: parts.length ? parts.join(' • ') : 'No stats defined',
          }
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Request Statistics Button Text',
      type: 'string',

      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      lang: 'language',
      sampleStat: 'stats.all[0].value',
      statCount: 'stats.all',
    },
    prepare({title, lang = 'en', sampleStat, statCount = []}) {
      const langBadge = lang.toUpperCase()
      let subtitle = `${langBadge} • Statistics Modal`

      if (statCount.length > 0) {
        subtitle += ` • ${statCount.length} items`
        if (sampleStat) {
          subtitle += `  –  ${sampleStat}`
        }
      }

      return {
        title: title || 'Unnamed Statistics Modal',
        subtitle,
      }
    },
  },
})
