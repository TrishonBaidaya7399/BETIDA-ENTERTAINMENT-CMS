import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'sponsorship',
  title: 'Sponsorship',
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
      title: 'Title',
      type: 'string',

      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        aiAssist: {exclude: true},
        isUnique: async (slug, context) => {
          const client = context.getClient({apiVersion: '2024-01-01'})
          const currentId = context.document?._id?.replace(/^drafts\./, '') || null
          const currentLanguage = context.document?.language || 'en'

          const conflict = await client.fetch(
            `*[
          _type == "sponsorship" &&
          slug.current == $slug &&
          language == $currentLanguage &&
          !(_id in path("drafts.**")) &&
          (!defined($currentId) || _id != $currentId)
        ][0]`,
            {slug, currentId, currentLanguage},
          )

          return !conflict
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo (publicId)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'section1',
      title: 'Section 1',
      type: 'object',
      fields: [
        defineField({
          name: 'thumbnail',
          title: 'Thumbnail (publicId)',
          type: 'string',
          options: {aiAssist: {exclude: true}},
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'array',
          of: [{type: 'block'}],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: 'section2',
      title: 'Section 2',
      type: 'object',
      fields: [
        defineField({
          name: 'thumbnail',
          title: 'Thumbnail (publicId)',
          type: 'string',
          options: {aiAssist: {exclude: true}},
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'array',
          of: [{type: 'block'}],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: 'footerTitle',
      title: 'Footer Title',
      type: 'string',
    }),
    defineField({
      name: 'redirectUrl',
      title: 'Redirect URL',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'youtubeEmbed',
      title: 'YouTube Embed Code (iframe)',
      type: 'text',
      rows: 4,
      options: {aiAssist: {exclude: true}},
      description: 'Same embed code for all languages',
    }),
  ],
  preview: {
    select: {
      title: 'slug.current',
      language: 'language',
      slug: 'slug',
      subtitle: 'subtitle',
    },
    prepare({title, language, slug, subtitle}: any) {
      return {
        title: title || 'Untitled Sponsorship',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • /${slug?.current || 'no-slug'} ${subtitle ? `• ${subtitle}` : ''}`,
      }
    },
  },
})
