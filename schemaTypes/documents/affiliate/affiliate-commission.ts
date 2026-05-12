import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'affiliateCommission',
  title: 'Affiliate Commission',
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
})
