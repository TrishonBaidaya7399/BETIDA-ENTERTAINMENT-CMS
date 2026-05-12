import {defineType, defineField} from 'sanity'

export const rgBudgetCalculator = defineType({
  name: 'rgBudgetCalculator',
  title: 'Responsible Gambling - Budget Calculator',
  type: 'document',
  fields: [
    defineField({
      name: 'banner',
      type: 'string',
      title: 'Banner Image URL',
      description: 'Add the banner image URL or path',
    }),
  ],
  preview: {
    select: {
      banner: 'banner',
    },
    prepare({banner}) {
      return {
        title: banner || 'No banner image added',
      }
    },
  },
})
