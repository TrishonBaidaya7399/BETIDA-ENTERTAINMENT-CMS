import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'rgTabLabelItem',
  title: 'RG Tab Label Item',
  type: 'object',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
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
    defineField({
      name: 'order',
      title: 'Order Index',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],
})
