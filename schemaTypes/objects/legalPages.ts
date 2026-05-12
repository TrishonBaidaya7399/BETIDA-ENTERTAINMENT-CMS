import { defineType, defineField } from 'sanity'

export const LegalPages = defineType({
  type: 'object',
  name: 'LegalPages',
  title: 'Legal Pages',
  fields: [
    defineField({
      type: 'reference',
      name: 'Terms',
      title: 'Terms and Conditions',
      to: [{ type: 'Page' }],
    }),
    defineField({
      type: 'reference',
      name: 'Privacy',
      title: 'Privacy Policy',
      to: [{ type: 'Page' }],
    }),
    defineField({
      type: 'reference',
      name: 'Responsible',
      title: 'Responsible Gaming',
      to: [{ type: 'Page' }],
    }),
    defineField({
      type: 'reference',
      name: 'SportsbookRules',
      title: 'Sportsbook Rules',
      to: [{ type: 'Page' }],
    }),
  ],
})
