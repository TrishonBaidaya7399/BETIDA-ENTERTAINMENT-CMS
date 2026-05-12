import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'bonusTabLabels',
  title: 'Bonus Tab Labels',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),

    // === ALL OFFERS ===
    defineField({
      name: 'allOffers',
      title: 'All Offers Tab',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'allOffersVisible',
      title: 'Show All Offers Tab',
      type: 'boolean',
      initialValue: true,
    }),

    // === ACTIVE ===
    defineField({
      name: 'active',
      title: 'Active Tab',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'activeVisible',
      title: 'Show Active Tab',
      type: 'boolean',
      initialValue: true,
    }),

    // === REDEEMED ===
    defineField({
      name: 'redeemed',
      title: 'Redeemed Tab',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'redeemedVisible',
      title: 'Show Redeemed Tab',
      type: 'boolean',
      initialValue: true,
    }),

    // === HISTORY ===
    defineField({
      name: 'history',
      title: 'History Tab',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'historyVisible',
      title: 'Show History Tab',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      language: 'language',
      allOffers: 'allOffers',
    },
    prepare({language, allOffers}) {
      return {
        title: `Bonus Tab Labels`,
        subtitle: `${language?.toUpperCase() || '—'} • ${allOffers}` || 'No labels set',
      }
    },
  },
})
