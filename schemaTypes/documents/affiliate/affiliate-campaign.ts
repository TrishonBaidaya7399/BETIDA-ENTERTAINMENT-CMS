import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'affiliateCampaign',
  title: 'Affiliate Campaign',
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
      language: 'language',
      value: 'value',
      hits: 'hits',
      commissionRate: 'commissionRate',
    },
    prepare({name, language, value, hits, commissionRate}: any) {
      return {
        title: `${name || 'Unnamed Campaign'} — ${value || '—'}`,
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • 👆 ${hits ?? 0} hits • 💰 ${commissionRate || '—'}`,
      }
    },
  },
})
