import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'sportsLandingConfig',
  title: 'Sports Landing Config',
  type: 'document',

  groups: [
    {name: 'general', title: 'General & Visibility'},
    {name: 'items', title: 'Picks Items'},
    {name: 'cards', title: 'Game Cards'},
    {name: 'ctas', title: 'CTAs & Links'},
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
      name: 'carouselTitle',
      title: 'Right side carousel Title (e.g. "BETIDA Picks Games")',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    // ────────────────────── LEFT SIDE CONTENT ──────────────────────
    defineField({
      name: 'title',
      title: 'Main Title (e.g. "Betida Picks (Combo)")',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'general',
    }),
    // ────────────────────── CTAs ──────────────────────
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      description: ' e.g. “See More”',
      group: 'ctas',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link URL',
      group: 'ctas',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      description: 'Betby Sports hub / landing page link',
    }),
    // ────────────────────── items ──────────────────────
    defineField({
      name: 'items',
      title: 'Picks Items (Boosted  / Acca / Flash, max 3–6)',
      type: 'array',
      group: 'items',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'cards',
          title: 'Picks Card',
          preview: {
            select: {
              type: 'type',
              isActive: 'isActive',
              priority: 'priority',
              badgeText: 'badgeText',
              eventTitle: 'eventTitle',
              odds: 'odds',
              expiresAt: 'expiresAt',
            },
            prepare({type, isActive, priority, badgeText, eventTitle, odds, expiresAt}: any) {
              const parts = []
              parts.push(isActive === false ? '🔴 Hidden' : '🟢 Active')
              if (priority) parts.push(`⚡ ${priority.toUpperCase()}`)
              if (badgeText) parts.push(`🏷️ ${badgeText}`)
              if (odds) parts.push(`📊 ${odds}`)
              if (expiresAt) parts.push(`⏰ ${new Date(expiresAt).toLocaleDateString()}`)

              return {
                title: `${type?.toUpperCase() || 'Item'} — ${eventTitle || 'No event title'}`,
                subtitle: parts.join(' • '),
              }
            },
          },
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Boosted', value: 'boosted'},
                  {title: 'Acca', value: 'acca'},
                  {title: 'Flash', value: 'flash'},
                ],
                layout: 'dropdown',
                aiAssist: {exclude: true},
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isActive',
              title: 'Active Module on Lobby',
              type: 'boolean',
              initialValue: true,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'priority',
              title: 'Priority',
              description: 'e.g., High, Medium , Low',
              type: 'string',
              options: {
                list: [
                  {title: 'HIGH', value: 'high'},
                  {title: 'MEDIUM', value: 'medium'},
                  {title: 'LOW', value: 'low'},
                ],
                layout: 'dropdown',
                aiAssist: {exclude: true},
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'badgeText',
              title: 'Badge Text (optional)',
              type: 'string',
              options: {
                list: [
                  {title: 'SUPER HOT', value: 'super-hot'},
                  {title: 'HOT', value: 'hot'},
                  {title: 'Live', value: 'live'},
                ],
                layout: 'dropdown',
                aiAssist: {exclude: true},
              },
              description: 'e.g. "SUPER HOT", "HOT", "Live" leave empty for none',
              initialValue: 'super-hot',
            }),
            defineField({
              name: 'eventTitle',
              title: 'Event Title',
              description: ' e.g. “Man City vs Arsenal”',
              type: 'string',

              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'marketText',
              title: 'Market Text',
              description: ' e.g. “Next goal: Home Team”',
              type: 'array',
              of: [{type: 'block'}],
              validation: (Rule) => Rule.required().min(1),
            }),

            defineField({
              name: 'odds',
              title: 'Odds Value',
              type: 'string',
              options: {aiAssist: {exclude: true}},
            }),
            defineField({
              name: 'oddsOld',
              title: 'Odds Old Value',
              type: 'string',
              options: {aiAssist: {exclude: true}},
            }),
            defineField({
              name: 'boostPercent',
              title: 'Boost Percent (e.g. 20%)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
            }),
            defineField({
              name: 'expiresAt',
              title: 'Expires At',
              type: 'datetime',
            }),
            defineField({
              name: 'ctaLabel',
              title: 'CTA Label',
              type: 'string',
              description: ' e.g. “Bet Now / Take it”',
            }),
            defineField({
              name: 'deepLink',
              title: 'Deep Link URL',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              description: 'Betby event/market link',
            }),
          ],
        }),
      ],
      validation: (Rule) =>
        Rule.max(6).min(3).error('Max 3-6 items required (Boosted, Acca, Flash)'),
    }),

    // ────────────────────── BETIDA Picks Cards ──────────────────────
    defineField({
      name: 'gameCards',
      title: 'BETIDA Picks Game Cards',
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
              validation: (Rule) => Rule.required(),
            }),

            // ─── Main content fields ───
            defineField({
              name: 'title',
              title: 'Game Title',
              type: 'string',

              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'score',
              title: 'Score / Format (e.g. 20/70, 20/80)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              description: "Displayed usually under the title (like '20/70')",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'amount',
              title: 'Prize Amount',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              description: 'e.g. "$38,000.00" or "€ 125 000"',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'backgroundImage',
              title: 'Background Image (optional - Cloudinary PublicID)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              description: 'If set → used as background. If empty → use static gradient fallback',
            }),

            defineField({
              name: 'ctaLabel',
              title: 'CTA Button Label',
              type: 'string',

              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'ctaUrl',
              title: 'CTA Button URL / Deep link',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              description: 'Usually game route or betting deep link',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'startsAt',
              title: 'Next Draw Starts At',
              type: 'datetime',
              description: 'Used to calculate countdown timer',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              isActive: 'isActive',
              score: 'score',
              amount: 'amount',
              ctaUrl: 'ctaUrl',
              startsAt: 'startsAt',
            },
            prepare({title, isActive, score, amount, ctaUrl, startsAt}: any) {
              const parts = []
              parts.push(isActive === false ? '🔴 Hidden' : '🟢 Active')
              if (score) parts.push(`📊 ${score}`)
              if (amount) parts.push(`💰 ${amount}`)
              if (startsAt) parts.push(`⏰ ${new Date(startsAt).toLocaleDateString()}`)
              if (ctaUrl) parts.push(`→ ${ctaUrl}`)

              return {
                title: title || 'Game Card',
                subtitle: parts.join(' • '),
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
      isEnabled: 'isEnabled',
      title: 'title',
      items: 'items',
      gameCards: 'gameCards',
    },
    prepare({language, isEnabled, title, items, gameCards}: any) {
      const itemCount = Array.isArray(items) ? items.length : 0
      const activeItems = Array.isArray(items) ? items.filter((i: any) => i.isActive).length : 0
      const cardCount = Array.isArray(gameCards) ? gameCards.length : 0
      const activeCards = Array.isArray(gameCards)
        ? gameCards.filter((c: any) => c.isActive).length
        : 0

      return {
        title: `Sports Landing — ${title || 'No title'}`,
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${isEnabled ? '🟢 Enabled' : '🔴 Disabled'} • ${activeItems}/${itemCount} picks • ${activeCards}/${cardCount} cards`,
      }
    },
  },
})
