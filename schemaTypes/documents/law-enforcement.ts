import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'lawEnforcement',
  title: 'Law Enforcement',
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
      name: 'sections',
      title: 'Law Enforcement Sections',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content (Multilingual Blocks)',
              type: 'array',
              validation: (Rule) => Rule.required().min(1),
              of: [{type: 'block'}],
            }),
          ],

          preview: {
            select: {
              title: 'title',
              content: 'content',
            },
            prepare({title, content}: any) {
              const blockCount = Array.isArray(content) ? content.length : 0
              return {
                title: title || 'Untitled Section',
                subtitle: `📝 ${blockCount} content block${blockCount !== 1 ? 's' : ''}`,
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
      sections: 'sections',
    },
    prepare({language, sections}: any) {
      const sectionCount = Array.isArray(sections) ? sections.length : 0
      const firstTitle = sections?.[0]?.title || 'No sections yet'
      return {
        title: `Law Enforcement — ${firstTitle}`,
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${sectionCount} section${sectionCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
