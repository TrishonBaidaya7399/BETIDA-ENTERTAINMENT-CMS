// sanity/schemas/kycConfig.ts
import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const kycConfig = defineType({
  name: 'kycConfig',
  title: 'Settings / KYC Configuration',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'general', title: 'General Settings'},
    {name: 'levels', title: 'KYC Levels'},
  ],
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
      title: 'Main Title (i18n)',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'description',
      title: 'Main Description (i18n)',
      type: 'text',
      group: 'general',
    }),

    defineField({
      name: 'levels',
      title: 'KYC Levels',
      type: 'array',
      group: 'levels',
      of: [
        defineField({
          name: 'level',
          title: 'Level',
          type: 'object',
          fields: [
            defineField({
              name: 'levelName',
              title: 'Level Name',
              type: 'string',

              validation: (Rule) => Rule.required().min(1).max(10),
            }),
            defineField({
              name: 'levelNumber',
              title: 'Level Number',
              type: 'number',
              validation: (Rule) => Rule.required().min(1).max(10),
            }),
            defineField({
              name: 'enabled',
              title: 'Enable this level?',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'title',
              title: 'Level Title (i18n)',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Level Subtitle (i18n)',
              type: 'text',
            }),
            defineField({
              name: 'alert',
              title: 'Alert Message (i18n)',
              type: 'text',
            }),

            defineField({
              name: 'uploadLayout',
              title: 'Upload Layout',
              type: 'string',
              initialValue: 'single',
              options: {
                list: [
                  {title: 'Single Upload', value: 'single'},
                  {title: 'Double Side', value: 'double'},
                ],
                aiAssist: {exclude: true},
              },
            }),

            defineField({
              name: 'acceptedFileTypes',
              title: 'Accepted File Types',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              description: 'e.g. .png,.jpg,.pdf',
              hidden: ({parent}) => (parent as any)?.uploadLayout === 'single',
            }),

            defineField({
              name: 'fields',
              title: 'Form Fields',
              type: 'array',
              of: [
                // TEXT FIELD
                {
                  type: 'object',
                  name: 'textField',
                  title: 'Text Input',
                  fields: [
                    defineField({
                      name: 'key',
                      title: 'API Key',
                      type: 'string',
                      options: {aiAssist: {exclude: true}},
                      validation: (r) => r.required(),
                    }),
                    defineField({
                      name: 'label',
                      title: 'Label (i18n)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'placeholder',
                      title: 'Placeholder (i18n)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'inputType',
                      title: 'Type',
                      type: 'string',
                      initialValue: 'text',
                      options: {
                        list: ['text', 'email', 'tel', 'number'],
                        aiAssist: {exclude: true},
                      },
                    }),
                    defineField({
                      name: 'required',
                      title: 'Required',
                      type: 'boolean',
                      initialValue: true,
                    }),
                  ],
                  preview: {
                    select: {label: 'label', key: 'key', inputType: 'inputType'},
                    prepare: ({label, key, inputType}: any) => ({
                      title: label || 'Text Field',
                      subtitle: `${key || '—'} • ${inputType || 'text'}`,
                    }),
                  },
                },

                // SELECT FIELD — NOW 100% SAFE
                {
                  type: 'object',
                  name: 'selectField',
                  title: 'Select / Dropdown',
                  fields: [
                    defineField({
                      name: 'key',
                      title: 'API Key',
                      type: 'string',
                      options: {aiAssist: {exclude: true}},
                      validation: (r) => r.required(),
                    }),
                    defineField({
                      name: 'label',
                      title: 'Label (i18n)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'placeholder',
                      title: 'Placeholder (i18n)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'required',
                      title: 'Required',
                      type: 'boolean',
                      initialValue: true,
                    }),
                    defineField({
                      name: 'options',
                      title: 'Options',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          name: 'option',
                          title: 'Option',
                          fields: [
                            defineField({
                              name: 'value',
                              title: 'Value (internal)',
                              type: 'string',
                              options: {aiAssist: {exclude: true}},
                              validation: (r) => r.required(),
                            }),
                            defineField({
                              name: 'label',
                              title: 'Label (i18n)',
                              type: 'string',
                            }),
                          ],
                          preview: {
                            select: {label: 'label', value: 'value'},
                            prepare: ({label, value}: any) => ({
                              title: label || value || '(no label)',
                            }),
                          },
                        },
                      ],
                    }),
                  ],
                  preview: {
                    select: {label: 'label', key: 'key', options: 'options'},
                    prepare: ({label, key, options}: any) => ({
                      title: label ? `${label} (Select)` : 'Select Field',
                      subtitle: `${key || '—'} • ${Array.isArray(options) ? options.length : 0} options`,
                    }),
                  },
                },

                // DATE FIELD
                {
                  type: 'object',
                  name: 'dateField',
                  title: 'Date Picker',
                  fields: [
                    defineField({
                      name: 'key',
                      title: 'API Key',
                      type: 'string',
                      options: {aiAssist: {exclude: true}},
                      validation: (r) => r.required(),
                    }),
                    defineField({
                      name: 'label',
                      title: 'Label (i18n)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'placeholder',
                      title: 'Placeholder (i18n)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'required',
                      title: 'Required',
                      type: 'boolean',
                      initialValue: true,
                    }),
                  ],
                  preview: {
                    select: {label: 'label', key: 'key'},
                    prepare: ({label, key}: any) => ({
                      title: label ? `${label} (Date)` : 'Date Field',
                      subtitle: key || '—',
                    }),
                  },
                },

                // UPLOAD FIELD
                {
                  type: 'object',
                  name: 'uploadField',
                  title: 'File Upload',
                  fields: [
                    defineField({
                      name: 'key',
                      title: 'API Key (prefix)',
                      type: 'string',
                      options: {aiAssist: {exclude: true}},
                      validation: (r) => r.required(),
                    }),
                    defineField({
                      name: 'labelFront',
                      title: 'Front Label (i18n)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'labelBack',
                      title: 'Back Label (i18n)',
                      type: 'string',

                      hidden: ({parent}) => (parent as any)?.uploadLayout === 'single',
                    }),
                    defineField({
                      name: 'required',
                      title: 'Required',
                      type: 'boolean',
                      initialValue: true,
                    }),
                  ],
                  preview: {
                    select: {labelFront: 'labelFront', key: 'key', labelBack: 'labelBack'},
                    prepare: ({labelFront, key, labelBack}: any) => ({
                      title: labelFront ? `Upload: ${labelFront}` : 'Upload Field',
                      subtitle: `${key || '—'} ${labelBack ? '• Double side' : '• Single'}`,
                    }),
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {levelNumber: 'levelNumber', title: 'title'},
            prepare: ({levelNumber, title}) => ({
              title: `Level ${levelNumber}${title?.[0]?.value ? `: ${title[0].value}` : ''}`,
              subtitle: 'KYC Level',
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      language: 'language',
      title: 'title',
      levels: 'levels',
    },
    prepare({language, title, levels}: any) {
      const levelCount = Array.isArray(levels) ? levels.length : 0
      const enabledCount = Array.isArray(levels) ? levels.filter((l: any) => l.enabled).length : 0
      return {
        title: title || 'KYC Verification Configuration',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${enabledCount}/${levelCount} levels enabled`,
      }
    },
  },
})
