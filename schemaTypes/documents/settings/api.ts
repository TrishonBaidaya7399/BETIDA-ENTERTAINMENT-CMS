import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'settingsApi',
  title: 'Settings / API Page',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      lang: 'language',
      sampleCell: 'table.rows[0].cells[0].value',
      rowCount: 'table.rows',
    },
    prepare({title, lang = 'en', sampleCell, rowCount}) {
      const langBadge = lang ? lang.toUpperCase() : '??'

      let subtitle = `${langBadge} • API Settings`

      if (rowCount?.length) {
        subtitle += ` • ${rowCount.length} token${rowCount.length === 1 ? '' : 's'}`
        if (sampleCell) {
          subtitle += `  –  ${sampleCell}`
        }
      }

      return {
        title: title || 'Unnamed API Page',
        subtitle,
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
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      initialValue: 'settingsApi',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'activeTokensTitle',
      title: 'Active Tokens Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'activeTokensDescription',
      title: 'Active Tokens Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'table',
      title: 'Active Tokens Table',
      type: 'object',
      fields: [
        defineField({
          name: 'columns',
          title: 'Columns',
          type: 'array',
          of: [
            {
              name: 'column',
              type: 'object',
              title: 'Column',
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
                  key: 'key.current',
                },
                prepare({label, key}) {
                  return {
                    title: label || 'Unnamed column',
                    subtitle: key ? `key: ${key}` : undefined,
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
              name: 'row',
              type: 'object',
              title: 'Row',
              fields: [
                defineField({
                  name: 'cells',
                  title: 'Cells',
                  type: 'array',
                  of: [
                    {
                      name: 'cell',
                      type: 'object',
                      title: 'Cell',
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
                        prepare({value}) {
                          return {
                            title: value || '—',
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
                  cells: 'cells',
                },
                prepare({cells = []}) {
                  if (cells.length === 0) {
                    return {title: 'Empty row'}
                  }

                  const displayed = cells
                    .slice(0, 3)
                    .map((cell: any) => cell?.value || '—')
                    .join('  •  ')

                  const more = cells.length > 3 ? ` +${cells.length - 3}` : ''

                  return {
                    title: displayed + more || 'Empty row',
                    subtitle: `${cells.length} cell${cells.length === 1 ? '' : 's'}`,
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
          colCount: 'columns',
          rowCount: 'rows',
        },
        prepare({colCount = [], rowCount = []}) {
          return {
            title: 'Token Table',
            subtitle: `${colCount.length} column${colCount.length === 1 ? '' : 's'} • ${rowCount.length} row${rowCount.length === 1 ? '' : 's'}`,
          }
        },
      },
    }),
  ],
})
