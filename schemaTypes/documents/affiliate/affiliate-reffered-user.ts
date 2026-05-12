import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'affiliateReferredUser',
  title: 'Affiliate Referred Users',
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
      name: 'users',
      title: 'Referred Users',
      type: 'array',
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
  ],

  preview: {
    select: {
      language: 'language',
      users: 'users',
    },
    prepare({language, users}: any) {
      const userCount = Array.isArray(users) ? users.length : 0
      return {
        title: 'Affiliate Referred Users',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${userCount} user${userCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
