import {CubeIcon, HashIcon, InfoFilledIcon, LockIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const provablyFairUnhashConfig = defineType({
  name: 'provablyFairUnhashConfig',
  title: 'Provably Fair – Unhash Server Seed',
  type: 'document',
  icon: HashIcon,
  groups: [
    {name: 'general', title: 'General'},
    {name: 'fields', title: 'Fields & Layout'},
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
      title: 'Page / Section Title (i18n)',
      type: 'string',
      group: 'general',
    }),

    defineField({
      name: 'description',
      title: 'Description / Intro Text (i18n)',
      type: 'string',
      group: 'general',
    }),

    defineField({
      name: 'validationErrorMessage',
      title: 'Validation Error Message (i18n)',
      type: 'string',
      group: 'general',
    }),

    defineField({
      name: 'successToastMessage',
      title: 'Success Toast – Seed Revealed (i18n)',
      type: 'string',
      group: 'general',
    }),

    defineField({
      name: 'copiedToastMessage',
      title: 'Copied to Clipboard Toast (i18n)',
      type: 'string',
      group: 'general',
    }),

    defineField({
      name: 'invalidInputToast',
      title: 'Invalid Input Toast (i18n)',
      type: 'string',
      group: 'general',
    }),

    // Main content – ordered array of blocks/fields
    defineField({
      name: 'content',
      title: 'Content Blocks (order matters)',
      type: 'array',
      group: 'fields',
      of: [
        defineArrayMember({
          name: 'hashedSeedInput',
          title: 'Hashed Seed Input + Unhash Button',
          type: 'object',
          icon: LockIcon,

          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
            }),
            defineField({
              name: 'buttonText',
              title: 'Unhash Button Text',
              type: 'string',
            }),
            defineField({
              name: 'helpTextWhenInvalid',
              title: 'Help text when invalid (shown below input)',
              type: 'string',
            }),
          ],
          preview: {
            prepare: () => ({title: 'Hashed Seed Input + Unhash Button'}),
          },
        }),

        // 2. Revealed Server Seed (display + copy button)
        defineArrayMember({
          name: 'revealedSeedDisplay',
          title: 'Revealed Seed Display + Copy',
          type: 'object',
          icon: HashIcon,
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'initialPlaceholder',
              title: 'Initial Placeholder (before reveal)',
              type: 'string',
            }),
          ],
          preview: {
            prepare: () => ({title: 'Revealed Seed (with copy button)'}),
          },
        }),

        // 3. Simple CTA Button (internal or external)
        defineArrayMember({
          name: 'ctaButton',
          title: 'CTA Button',
          type: 'object',
          icon: CubeIcon,
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text (i18n)',
              type: 'string',

              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'External URL (leave empty for internal action)',
              type: 'string',
              description: 'If filled → becomes external link',
              options: {aiAssist: {exclude: true}},
            }),
            defineField({
              name: 'variant',
              title: 'Style',
              type: 'string',
              options: {
                list: [
                  {
                    title: 'Primary (orangeGradient)',
                    value: 'orangeGradient',
                  },
                  {title: 'Secondary (gray)', value: 'gray'},
                  {title: 'Outline', value: 'outline'},
                ],
                aiAssist: {exclude: true},
              },
              initialValue: 'orangeGradient',
            }),
          ],
          preview: {
            select: {text: 'text', url: 'url', variant: 'variant'},
            prepare({text, url, variant}: any) {
              return {
                title: text || 'CTA Button',
                subtitle: `${variant || 'orangeGradient'} ${url ? `→ ${url}` : '• Action button'}`,
              }
            },
          },
        }),

        // 4. Static Text / Help / Info block (optional)
        defineArrayMember({
          name: 'infoBlock',
          title: 'Static Info / Help Text',
          type: 'object',
          icon: InfoFilledIcon,
          fields: [
            defineField({
              name: 'text',
              title: 'Text (i18n)',
              type: 'string',
            }),
            defineField({
              name: 'variant',
              title: 'Style',
              type: 'string',
              options: {
                list: [
                  {title: 'Default', value: 'default'},
                  {title: 'Warning', value: 'warning'},
                  {title: 'Success', value: 'success'},
                ],
                aiAssist: {exclude: true},
              },
              initialValue: 'default',
            }),
          ],
          preview: {
            select: {text: 'text', variant: 'variant'},
            prepare({text, variant}: any) {
              return {
                title: `Info block ${variant ? `(${variant})` : ''}`,
                subtitle: text ? text.slice(0, 60) + (text.length > 60 ? '...' : '') : '—',
              }
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      language: 'language',
      title: 'title',
      content: 'content',
    },
    prepare({language, title, content}: any) {
      const blockCount = Array.isArray(content) ? content.length : 0
      return {
        title: title || 'Provably Fair – Unhash Server Seed Config',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${blockCount} content block${blockCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
