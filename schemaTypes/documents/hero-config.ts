// schemaTypes/heroConfig.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heroConfig',
  title: 'Hero Config',
  type: 'document',
  preview: {
    select: {
      enableAnimated: 'enableAnimated',
      language: 'language',
      animatedHeroes: 'animatedHeroes',
      normalHeroes: 'normalHeroes',
    },
    prepare({enableAnimated, language, animatedHeroes, normalHeroes}: any) {
      const animatedCount = Array.isArray(animatedHeroes) ? animatedHeroes.length : 0
      const normalCount = Array.isArray(normalHeroes) ? normalHeroes.length : 0
      return {
        title: `Hero Config`,
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${enableAnimated ? '🎬 Animated' : '🖼️ Normal'} • ${animatedCount} animated, ${normalCount} normal`,
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
      name: 'enableAnimated',
      title: 'Enable Animated Version',
      description:
        'When toggle is ON: show the animated HTML/CSS version. When toggle is OFF: show the normal static image version.',
      type: 'boolean',
      initialValue: false,
    }),
    // new user unauthenticated part's background image
    defineField({
      name: 'newUserUnauthenticatedBg',
      title: 'New User Unauthenticated Background',
      description:
        "This section will show, when the user is not logged in/Registered and it's detected as a new user.",
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'title1',
          title: 'First Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'title2',
          title: 'Second Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text (e.g. Play Now)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        // IMAGE (base layer)
        defineField({
          name: 'imagePublicId',
          title: 'Background Image (Cloudinary Public ID)',
          description:
            'Aspect Ration: 383:360. Use background-less image with transparent bg for better visual effect.',
          type: 'string',
          options: {
            aiAssist: {exclude: true},
          },
        }),

        // GRADIENT TOGGLE
        defineField({
          name: 'isGradient',
          title: 'Use Gradient Background color?',
          type: 'boolean',
          initialValue: true,
        }),

        // SOLID COLOR (when gradient OFF)
        defineField({
          name: 'solidColor',
          title: 'Solid Color',
          type: 'color',
          options: {disableAlpha: false},
          hidden: ({parent}) => parent?.isGradient === true,
        }),

        // GRADIENT COLORS (when gradient ON)
        defineField({
          name: 'gradientStart',
          title: 'Gradient Start Color',
          type: 'color',
          options: {disableAlpha: false},
          hidden: ({parent}) => parent?.isGradient === false,
        }),
        defineField({
          name: 'gradientEnd',
          title: 'Gradient End Color',
          type: 'color',
          options: {disableAlpha: false},
          hidden: ({parent}) => parent?.isGradient === false,
        }),
      ],
    }),
    // animated hero section
    defineField({
      name: 'animatedHeroes',
      title: 'Animated Heroes',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              icon: 'icon',
              url: 'url',
            },
            prepare({title, subtitle, icon, url}: any) {
              const iconEmoji = icon === 'sports' ? '⚽' : icon === 'casino' ? '🎰' : '❓'
              return {
                title: title || 'Untitled',
                subtitle: `${iconEmoji} ${icon || 'No icon'} • ${subtitle || 'No subtitle'} • ${url || 'No URL'}`,
              }
            },
          },
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',

              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'icon',
              title: 'Icon Select',
              type: 'string',
              options: {
                list: [
                  {title: 'Sports', value: 'sports'},
                  {title: 'Casino', value: 'casino'},
                ],
                layout: 'radio',
                aiAssist: {exclude: true},
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Redirect URL',
              type: 'string',
              options: {
                aiAssist: {
                  exclude: true,
                },
              },
            }),
            defineField({
              name: 'imagePublicId',
              title: 'Cloudinary Image String',
              description:
                "Use background-less image for this hero section. If it's leave empty, then it will show placeholder images (Football icon for Sports and Cherry icon for Casino)",
              type: 'string',
              options: {
                aiAssist: {
                  exclude: true,
                },
              },
            }),
          ],
        },
      ],
    }),
    //  normal hero section
    defineField({
      name: 'normalHeroes',
      title: 'Normal Heroes',
      type: 'array',

      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'title',
              imagePublicId: 'imagePublicId',
              url: 'url',
            },
            prepare({title, imagePublicId, url}: any) {
              return {
                title: title || 'Untitled',
                subtitle: `🖼️ ${imagePublicId || 'No image'} • ${url || 'No URL'}`,
              }
            },
          },
          fields: [
            defineField({
              name: 'title',
              title: 'CTA Button Text (e.g. Go to Sports / Go to Casino)',
              type: 'string',

              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'imagePublicId',
              title: 'Image Public ID',
              type: 'string',
              options: {
                aiAssist: {
                  exclude: true,
                },
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Redirect URL (on click to this banner image or CTA button)',
              type: 'string',
              options: {
                aiAssist: {
                  exclude: true,
                },
              },
            }),
            defineField({
              name: 'ctaStyle',
              title: 'CTA Button Style',
              type: 'object',
              description: "Customize the 'Go to Sports' / 'Go to Casino' button appearance",
              options: {
                collapsible: true,
                collapsed: true,
              },
              fields: [
                defineField({
                  name: 'isGradient',
                  title: 'Use Gradient Background?',
                  type: 'boolean',
                  initialValue: true,
                }),
                defineField({
                  name: 'solidBgColor',
                  title: 'Solid Background Color',
                  type: 'color',
                  options: {disableAlpha: false},
                  hidden: ({parent}) => parent?.isGradient === true,
                }),
                defineField({
                  name: 'gradientStart',
                  title: 'Gradient Start Color',
                  type: 'color',
                  options: {disableAlpha: false},
                  hidden: ({parent}) => parent?.isGradient === false,
                }),
                defineField({
                  name: 'gradientEnd',
                  title: 'Gradient End Color',
                  type: 'color',
                  options: {disableAlpha: false},
                  hidden: ({parent}) => parent?.isGradient === false,
                }),
                defineField({
                  name: 'textColor',
                  title: 'Button Text Color',
                  type: 'color',
                  options: {disableAlpha: false},
                  initialValue: {hex: '#ffffff'},
                }),
              ],
            }),
          ],
        },
      ],
    }),
  ],
})
