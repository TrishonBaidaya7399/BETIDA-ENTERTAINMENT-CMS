// schemas/termsDocument.ts
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'termsDocument',
  title: 'Terms & Legal Document',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'termsDocument'}),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),
    defineField({
      name: 'isActive',
      title: 'Active / Visible on site',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide this document from the website without deleting it.',
    }),
    defineField({
      name: 'isAuthTerm',
      title: 'Is Authentication Term',
      description:
        "This terms and condition's data will show on the register terms and condition flow",
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Title (Multilingual)',
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
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, ''),
        aiAssist: {exclude: true},
        isUnique: async (slug, context) => {
          const client = context.getClient({apiVersion: '2024-01-01'})
          const currentId = context.document?._id?.replace(/^drafts\./, '') || null
          const currentLanguage = context.document?.language || 'en'

          const query = `
        *[
          _type == "termsDocument" &&
          slug.current == $slug &&
          language == $currentLanguage &&
          !(_id in path("drafts.**")) &&
          (!defined($currentId) || _id != $currentId)
        ][0]
      `

          const conflict = await client.fetch(query, {
            slug,
            currentId,
            currentLanguage,
          })

          return !conflict
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'index',
              title: 'Index',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{type: 'block'}],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              index: 'index',
            },
            prepare({index}) {
              return {
                title: `${index || '?'}. Section`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'table',
      title: 'Dynamic Table',
      type: 'object',
      fields: [
        defineField({
          name: 'columns',
          title: 'Columns',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'key',
                  title: 'Key',
                  type: 'slug',
                  options: {aiAssist: {exclude: true}},
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',

                  options: {aiAssist: {exclude: true}},
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'align',
                  title: 'Align',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Left', value: 'left'},
                      {title: 'Center', value: 'center'},
                      {title: 'Right', value: 'right'},
                    ],
                    aiAssist: {exclude: true},
                  },
                  initialValue: 'left',
                }),
              ],
              preview: {
                select: {
                  label: 'label',
                  key: 'key',
                  align: 'align',
                },
                prepare({label, key, align}: any) {
                  return {
                    title: label || key?.current || 'Unnamed Column',
                    subtitle: `align: ${align || 'left'}`,
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'cells',
                  title: 'Cells',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'value',
                          title: 'Value',
                          type: 'string',
                          options: {aiAssist: {exclude: true}},
                        }),
                      ],
                      preview: {
                        select: {
                          value: 'value',
                        },
                        prepare({value}: any) {
                          return {
                            title: value || 'Empty cell',
                          }
                        },
                      },
                    },
                  ],
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  cells: 'cells',
                },
                prepare({cells}: any) {
                  const cellCount = Array.isArray(cells) ? cells.length : 0
                  const firstValue = cells?.[0]?.value || 'Empty'
                  return {
                    title: firstValue.length > 50 ? firstValue.slice(0, 47) + '...' : firstValue,
                    subtitle: `${cellCount} cell${cellCount !== 1 ? 's' : ''}`,
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
      preview: {
        select: {
          columns: 'columns',
          rows: 'rows',
        },
        prepare({columns, rows}) {
          const columnCount = columns?.length || 0
          const rowCount = rows?.length || 0

          return {
            title: `Table (${columnCount} column${columnCount !== 1 ? 's' : ''})`,
            subtitle: `${rowCount} row${rowCount !== 1 ? 's' : ''}`,
          }
        },
      },
    }),
  ],
  preview: {
    select: {
      language: 'language',
      slug: 'slug',
      isActive: 'isActive',
      isAuthTerm: 'isAuthTerm',
    },
    prepare({ language, slug, isActive, isAuthTerm}: any) {
      return {
        title: slug.current || 'Untitled',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • /${slug?.current || 'no-slug'} • ${isActive ? '🟢 Active' : '🔴 Hidden'} ${isAuthTerm ? '• 🔐 Auth Term' : ''}`,
      }
    },
  },
})
