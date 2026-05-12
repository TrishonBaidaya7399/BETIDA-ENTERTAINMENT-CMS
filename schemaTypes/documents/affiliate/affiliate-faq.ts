import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'affiliateFaqs',
  title: 'Affiliate FAQs',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),
    // Root-level CTA button
    defineField({
      name: 'cta',
      title: 'Call-to-Action Button',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Button Label',
          type: 'string',

          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Redirect URL',
          type: 'string',
          options: {aiAssist: {exclude: true}},
        }),
      ],
    }),

    // Array of FAQ items (each with category, title, content)
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          preview: {
            select: {
              title: 'title',
              category: 'category',
            },
            prepare({title, category}: any) {
              const categoryEmoji =
                category === 'general'
                  ? '📋'
                  : category === 'affiliate-program'
                    ? '🤝'
                    : category === 'earnings'
                      ? '💰'
                      : '❓'
              return {
                title: title || 'Untitled FAQ',
                subtitle: `${categoryEmoji} ${category || 'No category'}`,
              }
            },
          },
          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  {title: 'General', value: 'general'},
                  {title: 'Affiliate Program', value: 'affiliate-program'},
                  {title: 'Earnings', value: 'earnings'},
                ],
                aiAssist: {exclude: true},
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',

              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Answer',
              type: 'array',
              of: [{type: 'block'}],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      language: 'language',
      faqs: 'faqs',
      cta: 'cta',
    },
    prepare({language, faqs, cta}: any) {
      const faqCount = Array.isArray(faqs) ? faqs.length : 0
      const firstTitle = faqs?.[0]?.title || 'No FAQs yet'
      return {
        title: `Affiliate FAQs — ${firstTitle}`,
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${faqCount} FAQ${faqCount !== 1 ? 's' : ''} ${cta?.label ? `• CTA: ${cta.label}` : ''}`,
      }
    },
  },
})
