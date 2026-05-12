import {defineType, defineField} from 'sanity'

export const selfAssessmentContent = defineType({
  name: 'SelfAssessmentContent',
  title: 'Responsible Gambling Self-Assessment - content',
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
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'Your Gambling Habits',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'banner',
      type: 'string',
      title: 'Banner Image URL',
      description: 'Add the banner image URL or path',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      branchName: 'title',
      language: 'language',
    },
    prepare({branchName, language}) {
      const langDisplay = language ? language.toUpperCase() : '—'

      return {
        title: branchName || 'Unnamed Responsible Gambling Page',
        subtitle: `Language: ${langDisplay}`,
      }
    },
  },
})

export const selfAssessmentQuestions = defineType({
  name: 'SelfAssessmentQuestions',
  title: 'Responsible Gambling Self-Assessment - Questions',
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
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Question Text',
              type: 'string',

              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'learnMoreUrl',
      title: 'Learn More URL',
      type: 'string',
    }),
    defineField({
      name: 'liveSupportUrl',
      title: 'Live Support link',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      language: 'language',
      questions: 'questions',
    },
    prepare({language, questions}) {
      const lang = language ? language.toUpperCase() : '—'
      const count = Array.isArray(questions) ? questions.length : 0

      return {
        title: 'Self-Assessment Questions',
        subtitle: `${lang} • ${count} question${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
