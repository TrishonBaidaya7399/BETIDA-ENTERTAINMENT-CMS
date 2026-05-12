// schemas/jackpotTeaser.ts
import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'jackpotTeaser',
  title: 'Jackpot Teaser Module (Lobby)',
  type: 'document',

  groups: [
    {name: 'general', title: 'General & Visibility'},
    {name: 'counters', title: 'Counters & Animation'},
    {name: 'cards', title: 'Jackpot Game Cards'},
    {name: 'ctas', title: 'CTAs & Links'},
    {name: 'disclaimer', title: 'Disclaimer'},
  ],

  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),
    // ────────────────────── GENERAL ──────────────────────
    defineField({
      name: 'isEnabled',
      title: 'Enable Module on Lobby',
      type: 'boolean',
      initialValue: true,
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'updateMode',
      title: 'Update Mode',
      type: 'string',
      options: {
        list: [{title: 'Teaser (Indicative)', value: 'teaser'}],
        layout: 'radio',
        aiAssist: {exclude: true},
      },
      initialValue: 'teaser',
      group: 'general',
      readOnly: true, // For now only teaser mode
    }),

    defineField({
      name: 'bodyImg',
      title: 'Main background image (Local public image path)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      description:
        "If you don't add the cloudinary image public id, the this static image will be used: /jackpot/Jackpot_Section_BG.png",
    }),
    defineField({
      name: 'carouselTitle',
      title: 'Right side carousel Title (e.g. "Jackpots Games")',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    // ────────────────────── LEFT SIDE CONTENT ──────────────────────
    defineField({
      name: 'title',
      title: 'Main Title (e.g. "Jackpots")',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'leftSideHeroImg',
      title: 'Left side Hero Card image (Local public image path)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      description:
        "If you don't add the cloudinary image public id, the this static image will be used: /jackpot/Jackpot_Section_BG.png",
    }),

    // ────────────────────── COUNTERS (Fixed 3) ──────────────────────
    defineField({
      name: 'counters',
      title: 'Teaser Counters (MEGA / MAJOR / DAILY)',
      type: 'array',
      group: 'counters',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'counter',
          title: 'Counter',
          fields: [
            defineField({
              name: 'key',
              title: 'Key (fixed)',
              type: 'string',

              options: {
                list: [
                  {title: 'MEGA', value: 'mega'},
                  {title: 'MAJOR', value: 'major'},
                  {title: 'DAILY', value: 'daily'},
                ],
                layout: 'dropdown',
                aiAssist: {exclude: true},
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Display Label',
              type: 'string',

              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon (Cloudinary public_id)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
            }),
            defineField({
              name: 'startingValue',
              title: 'Starting Value (Base for animation)',
              type: 'number',
              validation: (Rule) => Rule.required().positive(),
              initialValue: 1000000,
            }),
            defineField({
              name: 'lastUpdatedAt',
              title: 'Last Updated At (Read Only)',
              type: 'datetime',
              readOnly: true,
            }),
            defineField({
              name: 'currentValue',
              title: 'Current Value (for smooth animation - Read Only)',
              type: 'number',
              readOnly: true,
            }),
            defineField({
              name: 'currency',
              title: 'Currency Symbol',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              initialValue: '$',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'decimals',
              title: 'Decimal Places',
              type: 'number',
              initialValue: 2,
              validation: (Rule) => Rule.integer().min(0).max(2),
            }),
            defineField({
              name: 'badgeText',
              title: 'Badge Text (optional)',
              type: 'string',
              description: 'e.g. "SUPER HOT", "HOT", leave empty for none',
              initialValue: 'SUPER HOT',
            }),
            defineField({
              name: 'endsAt',
              title: 'Ends At (for countdown timer)',
              type: 'datetime',
              description:
                'If set, shows countdown timer instead of badgeText (only makes sense for DAILY)',
            }),
            defineField({
              name: 'primaryColor',
              title: 'Solid Primary Color',
              type: 'color',
              options: {disableAlpha: false},
            }),
          ],
          preview: {
            select: {
              key: 'key',
              label: 'label',
              value: 'startingValue',
              currency: 'currency',
              badge: 'badgeText',
              endsAt: 'endsAt',
              primaryColor: 'primaryColor',
            },
            prepare({key, label, value, currency, badge, endsAt}: any) {
              const parts = []
              if (currency && value != null) parts.push(`${currency}${value.toLocaleString()}`)
              if (badge) parts.push(`🔥 ${badge}`)
              if (endsAt) parts.push(`⏰ Ends: ${new Date(endsAt).toLocaleDateString()}`)

              return {
                title: `${key?.toUpperCase() || 'Counter'} — ${label || 'No label'}`,
                subtitle: parts.length ? parts.join(' • ') : 'No value set',
              }
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.length(3).error('Exactly 3 counters required (MEGA, MAJOR, DAILY)'),
    }),

    // ────────────────────── ANIMATION CONFIG ──────────────────────
    defineField({
      name: 'animationConfig',
      title: 'Counter Animation Settings',
      type: 'object',
      group: 'counters',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'incrementPerSecond',
          title: 'Increment per Second (base speed)',
          type: 'number',
          initialValue: 0.2,
          validation: (Rule) => Rule.required().positive(),
        }),
        defineField({
          name: 'tickMs',
          title: 'Tick Interval (ms)',
          type: 'number',
          initialValue: 3000,
          validation: (Rule) => Rule.required().integer().min(50),
        }),
        defineField({
          name: 'jitterPercent',
          title: 'Jitter (random variation %)',
          type: 'number',
          initialValue: 15,
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: 'maxStepPerTick',
          title: 'Max Step per Tick (safety cap)',
          type: 'number',
          initialValue: 0.5,
          validation: (Rule) => Rule.required().positive(),
        }),
        defineField({
          name: 'refreshIntervalMinutes',
          title: 'Refresh Base Value Every (minutes)',
          type: 'number',
          initialValue: 10,
          description: 'How often to pull new startingValue from Sanity (smooth transition)',
          validation: (Rule) => Rule.integer().min(1),
        }),
      ],
    }),

    // ────────────────────── JACKPOT GAME CARDS ──────────────────────
    defineField({
      name: 'gameCards',
      title: 'Jackpot Game Cards',
      type: 'array',
      group: 'cards',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'gameCard',
          title: 'Game Card',
          fields: [
            defineField({
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'title',
              title: 'Game Title',
              type: 'string',

              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image (Cloudinary public_id)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Game Link (route or URL)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'badgeText',
              title: 'Badge Text',
              type: 'string',
              initialValue: 'JACKPOT',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              active: 'isActive',
              image: 'image',
              link: 'link',
              badgeText: 'badgeText',
            },
            prepare({title, active, image, link, badgeText}: any) {
              const parts = []
              parts.push(active === false ? '🔴 Hidden' : '🟢 Active')
              if (badgeText) parts.push(`🏷️ ${badgeText}`)
              if (link) parts.push(`→ ${link}`)
              if (image) parts.push(`🖼️ ${image}`)

              return {
                title: title || 'Game Card',
                subtitle: parts.join(' • '),
              }
            },
          },
        }),
      ],
    }),

    // ────────────────────── CTAs ──────────────────────
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label (e.g., "View More" Button)',
      type: 'string',
      group: 'ctas',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link (e.g., view more)',
      type: 'string',
      group: 'ctas',
      options: {aiAssist: {exclude: true}},
    }),
    
    defineField({
      name: 'ctaLabel2',
      title: 'Optional CTA Button Label',
      type: 'string',
      group: 'ctas',
    }),
    defineField({
      name: 'ctaLink2',
      title: 'Optional CTA Button Link',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      group: 'ctas',
    }),

    // ────────────────────── DISCLAIMER ──────────────────────
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer Text (multi-language)',
      type: 'string',
      group: 'disclaimer',
      description:
        'Shown small below counters, e.g. "Jackpot amounts are shown inside the game..."',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      language: 'language',
      isEnabled: 'isEnabled',
      title: 'title',
      counters: 'counters',
      gameCards: 'gameCards',
    },
    prepare({language, isEnabled, title, counters, gameCards}: any) {
      const counterCount = Array.isArray(counters) ? counters.length : 0
      const cardCount = Array.isArray(gameCards) ? gameCards.length : 0
      const activeCards = Array.isArray(gameCards)
        ? gameCards.filter((c: any) => c.isActive).length
        : 0

      return {
        title: `Jackpot Teaser — ${title || 'No title'}`,
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${isEnabled ? '🟢 Enabled' : '🔴 Disabled'} • ${counterCount} counters • ${activeCards}/${cardCount} cards active`,
      }
    },
  },
})
