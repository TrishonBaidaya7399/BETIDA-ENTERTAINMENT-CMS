// schemas/marquee.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'marquee',
  title: 'Announcement Promo Bar',
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
      title: 'Internal Title (for studio)',
      type: 'string',
      options: {
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'messages',
      title: 'Messages',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'marqueeMessage',
          title: 'Message',
          fields: [
            defineField({
              name: 'text',
              title: 'Text (use {placeholders})',
              type: 'string',

              validation: (Rule) => Rule.required(),
              description:
                'Examples:\n• 100% match up to {amount}\n• Use code {promoCode}\n• {bonusPercent}% bonus up to {amount}',
            }),

            defineField({
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'link',
              title: 'CTA Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
              options: {
                aiAssist: {exclude: true},
              },
            }),

            defineField({
              name: 'placeholders',
              title: 'Placeholders & Values',
              description: 'Define values for each {placeholder} used in the text above',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'placeholderItem',
                  title: 'Placeholder',
                  fields: [
                    defineField({
                      name: 'key',
                      title: 'Placeholder Key',
                      type: 'string',
                      options: {
                        aiAssist: {exclude: true},
                      },
                      validation: (Rule) => Rule.required().regex(/^[a-zA-Z0-9_]+$/),
                      description: 'Without braces → e.g. "amount", "promoCode", "bonusPercent"',
                    }),
                    defineField({
                      name: 'value',
                      title: 'Replacement Value',
                      type: 'string',
                      options: {
                        aiAssist: {exclude: true},
                      },
                      validation: (Rule) => Rule.required(),
                      description:
                        'What should appear instead of {key} → e.g. "$500", "WELCOME500", "100"',
                    }),
                  ],
                  preview: {
                    select: {
                      key: 'key',
                      value: 'value',
                    },
                    prepare({key, value}: any) {
                      return {
                        title: key ? `{${key}}` : 'No key',
                        subtitle: value ? `→ ${value}` : 'No value',
                      }
                    },
                  },
                },
              ],
            }),
            defineField({
              name: 'displayOn',
              title: 'Show on pages',
              description:
                "Select one or more pages where this message should appear. If 'All Pages' is selected, it will ignore other selections and show everywhere.",
              type: 'array',
              of: [
                {
                  type: 'string',
                  options: {
                    list: [
                      {title: 'All Pages', value: 'all'},
                      {title: 'Home Page', value: 'home'},
                      {title: 'Casino Page', value: 'casino'},
                      {title: 'Sports Page', value: 'sports'},
                      {title: 'Bonuses Page', value: 'bonuses'},
                      {title: 'Promotion Page', value: 'promotions'},
                    ],
                    layout: 'grid', // or "tags" — grid usually looks nicer for 5–8 items
                    aiAssist: {exclude: true},
                  },
                },
              ],
              options: {
                layout: 'grid', // optional – reinforces the visual style
              },
              initialValue: ['all'], // ← good default: show everywhere unless changed
              validation: (Rule) => Rule.required().min(1).error('Select at least one page'),
            }),

            defineField({
              name: 'showDiamondIcon',
              title: 'Show diamond icon before text',
              type: 'boolean',
              initialValue: false,
              description: 'If checked, a diamond icon will appear before this message in the UI',
            }),
            defineField({
              name: 'ctas',
              title: 'CTA Buttons',
              description:
                'Add CTA buttons for this message. If multiple buttons are added they will appear as a button group.',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'ctaItem',
                  title: 'CTA Button',
                  fields: [
                    defineField({
                      name: 'ctaText',
                      title: 'CTA Text',
                      type: 'string',

                      validation: (Rule) => Rule.required(),
                    }),

                    defineField({
                      name: 'ctaURL',
                      title: 'CTA URL',
                      type: 'string',
                      options: {
                        aiAssist: {exclude: true},
                      },
                      validation: (Rule) => Rule.required(),
                    }),

                    defineField({
                      name: 'buttonVariant',
                      title: 'Button Variant',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Gray', value: 'gray'},
                          {title: 'Ghost', value: 'ghost'},
                          {title: 'Outline', value: 'outline'},
                          {title: 'Link', value: 'link'},
                          {title: 'Orange Gradient', value: 'orangeGradient'},
                          {title: 'Purple Gradient', value: 'purpleGradient'},
                          {title: 'Green Gradient', value: 'greenGradient'},
                        ],
                        layout: 'dropdown',
                        aiAssist: {exclude: true},
                      },
                      initialValue: 'gray',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],

                  preview: {
                    select: {
                      ctaText: 'ctaText',
                      ctaURL: 'ctaURL',
                      buttonVariant: 'buttonVariant',
                    },
                    prepare({ctaText, ctaURL, buttonVariant}: any) {
                      return {
                        title: ctaText || 'No CTA text',
                        subtitle: `${buttonVariant || 'No variant'} • ${ctaURL || 'No URL'}`,
                      }
                    },
                  },
                },
              ],
            }),
          ],

          preview: {
            select: {
              text: 'text',
              active: 'isActive',
              displayOn: 'displayOn',
              ctas: 'ctas',
              showDiamondIcon: 'showDiamondIcon',
            },
            prepare({text, active, order, displayOn, ctas, showDiamondIcon}: any) {
              const previewText = typeof text === 'string' ? text.trim() : 'No message text'

              let showOnLabel = '—'
              if (Array.isArray(displayOn) && displayOn.length > 0) {
                if (displayOn.includes('all')) {
                  showOnLabel = 'All Pages'
                } else {
                  showOnLabel = displayOn
                    .map((page: string) => page.charAt(0).toUpperCase() + page.slice(1))
                    .join(', ')
                }
              }

              const ctaCount = Array.isArray(ctas) ? ctas.length : 0
              const parts = []
              parts.push(active ? '🟢 Active' : '🔴 Inactive')
              parts.push(`📄 ${showOnLabel}`)
              if (ctaCount > 0) parts.push(`🔗 ${ctaCount} CTA${ctaCount !== 1 ? 's' : ''}`)
              if (showDiamondIcon) parts.push('💎')

              return {
                title: previewText.length > 70 ? previewText.slice(0, 67) + '...' : previewText,
                subtitle: parts.join(' • '),
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      messages: 'messages',
    },
    prepare({title, language, messages}: any) {
      const total = Array.isArray(messages) ? messages.length : 0
      const active = Array.isArray(messages) ? messages.filter((m: any) => m.isActive).length : 0

      return {
        title: title || 'Announcement Promo Bar',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${active} active / ${total} total messages`,
      }
    },
  },
})
