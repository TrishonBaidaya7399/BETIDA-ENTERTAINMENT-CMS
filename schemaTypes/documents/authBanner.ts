// schemaTypes/documents/authBanner.ts
import {defineType, defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'authBanner',
  title: 'Auth Modal Banner',
  type: 'document',
  icon: ImageIcon,

  preview: {
    select: {
      heading: 'heading',
      highlight: 'highlight',
      benefits: 'benefits',
      language: 'language',
    },
    prepare({heading, highlight, benefits = [], language}: any) {
      const benefitCount = Array.isArray(benefits) ? benefits.length : 0
      return {
        title: heading || 'Auth Banner',
        subtitle: `${language?.toUpperCase() || 'EN'} • ${benefitCount} benefits • ${highlight || 'No highlight'}`,
      }
    },
  },

  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      description: "First line of the banner (e.g. 'Most Casinos Take.')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight Text',
      type: 'string',
      description: "Second line with accent color (e.g. 'This One Pays.')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits List',
      type: 'array',
      options: {
        aiAssist: {exclude: true},
      },
      of: [
        defineField({
          type: 'string',
          name: 'benefit',
          title: 'Benefit',
        }),
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image (Cloudinary Public ID)',
      type: 'string',
      description: 'Enter the Cloudinary public ID for the banner background',
      options: {
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
