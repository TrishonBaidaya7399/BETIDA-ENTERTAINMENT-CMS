// schemas/menuItem.ts
import {defineType, defineField, defineArrayMember} from 'sanity'
import {formatIconName} from '../../../../utils/format-icon-name'

const ICONS = [
  'PromotionsIconSVGV1',
  'PromotionsIconSVGV2',
  'AffiliateIconSVGV1',
  'AffiliateIconSVGV2',
  'VipIconSVGV1',
  'VipIconSVGV2',
  'BlogIconSVGV1',
  'BlogIconSVGV2',
  'ForumIconSVGV1',
  'ForumIconSVGV2',
  'SponsorShipIconSVGV1',
  'SponsorShipIconSVGV2',
  'ResponsibleIconSVGV1',
  'ResponsibleIconSVGV2',
  'LiveSupportIconSVGV1',
  'LiveSupportIconSVGV2',
  'SportsIconSVG',
  'FavouritesIconSvgV1',
  'RecentIconSvgV1',
  'RecentIconSvgV2',
  'FilterByIconSvg',
  'ChallengesIconSvgV1',
  'MyBetsIconSvgV1',
  'MyBetsIconSvgV2',
  'GameIconSvgV1',
  'GameIconSvgV2',
  'LiveEventsIconSvgV1',
  'ClockSVG',
  'FootballIconSvg',
  'TennisIconSvg',
  'BaseballIconSvg',
  'AmericanFootballIconSvg',
  'RacingIconSvgV1',
  'CricketIconSvg',
  'PublisherIconSVGV1',
  'RankingIcon',
  'AllSPortsIconSVGV1',
  'AllEsportsIconSVGV1',
  'GlobeIconSVG',
  'BonusIconSVGV1',
  // all sports icons
  'Alp_Disiplini',
  'Amerikan_Futbolu',
  'Aussie_rules',
  'Badminton',
  'Bandy',
  'Basketball_3x3',
  'Basketbol',
  'Beyzbol',
  'Biatlon',
  'Bisiklet',
  'Boks',
  'Buz_Hokeyi',
  'Call_of_Duty',
  'Counter_Strike',
  'Cricket_24',
  'Crossfire',
  'Dart',
  'Dota_2',
  'eBasketbol',
  'eBasketbol_Blitz',
  'eCricket',
  'eFighting',
  'eFutbol',
  'eFutbol_Penalti',
  'eFutbol_Volta',
  'eFutbol_X_Battle_FC',
  'eHorse_Racing',
  'eKriket_X_Savas_Sopalari',
  'Esports_Hub',
  'eTennis',
  'eVaquejada',
  'FC_26',
  'Floorball',
  'Formula_1',
  'Futbol',
  'Futsal',
  'Futvole',
  'Golf',
  'Hentbol',
  'Indy_Racing',
  'Kabaddi',
  'King_of_Glory',
  'Korling',
  'Kriket',
  'Kros_Kayak',
  'Lakros',
  'League_of_Legends',
  'Martial_arts',
  'Masa_tenisi',
  'Mobile_Legends',
  'Motorcycle_Racing',
  'Nascar',
  'NBA_2K26',
  'Olimpiyat_Oyunlari',
  'Ozel',
  'Premier_Ligi',
  'Ragbi_Ligi',
  'Rainbow_Six',
  'Satranc',
  'Skeleton',
  'Snooker',
  'Squash',
  'Su_Topu',
  'Super_Lig',
  'Tenis',
  'Teqball',
  'Valorant',
  'Voleybol',
]

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  fields: [
    // defineField({
    //   name: 'language',
    //   title: 'Language',
    //   type: 'string',
    //   readOnly: true,
    //   initialValue: 'en',
    // }),
    defineField({
      name: 'text',
      title: 'Menu Text',
      type: 'string',
      
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image (New Mobile Browse Panel)',
      type: 'string',
      description: `Cloudinary image used as card background.
• For items WITH children → this image is IGNORED (parent shows as simple row with +/-).
• For items WITHOUT children OR for child items → image is shown with icon + title overlaid in center.`,
      options: {
        aiAssist: {exclude: true},
      },
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text (Mobile Browse Panel)',
      type: 'string',
      description:
        'Badge shown at top-right corner when background image is present. E.g., "New", "Hot", "100% RTP", "Live". Leave empty to hide.',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Component Name',
      type: 'string',
      description:
        'Select the V1 icons to match with the old figma icons, and select other versions (V2, V3...) for latest icons',
      options: {
        list: ICONS.map((icon) => ({
          title: formatIconName(icon),
          value: icon,
        })),
        aiAssist: {exclude: true},
      },
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text (for parents with children)',
      type: 'string',
      description:
        'Text for the right button when this parent has submenu items. E.g., "See All", "View More", "Browse". Leave empty to hide button.',
      initialValue: 'See All',
    }),
    defineField({
      name: 'href',
      title: 'CTA URL',
      description:
        'This link will work as the cta link for the parent. e.g.: /promotions, /responsible-gambling',
        type: 'string',
        options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'navigateTo',
      title: 'Navigate To (Alternative to href for modal navigation query)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      description: 'e.g.: ?modal=weeklyRaffle, ?modal=100kRace',
    }),

    defineField({
      name: 'requiresAuth',
      title: 'Login Required?',
      type: 'boolean',
      initialValue: false,
    }),

    // defineField({
    //   name: 'order',
    //   title: 'Item Order',
    //   type: 'number',
    //   initialValue: 999,
    //   validation: (Rule) => Rule.min(0).integer(),
    // }),

    defineField({
      name: 'onClick',
      title: 'Special Action (Parent Item Only)',
      type: 'string',
      description: 'only for parent items without submenu. E.g., Live Support, Forum',
      options: {
        list: [
          {title: 'Coming Soon Toast', value: 'comingSoon'},
          {title: 'Open Weekly Raffle Modal', value: 'openWeeklyRaffle'},
          {title: 'Open 100k Race Modal', value: 'open100kRace'},
        ],
        aiAssist: {exclude: true},
      },
      hidden: ({parent}) => parent?.children && parent.children.length > 0,
    }),
    defineField({
      name: 'defaultExpanded',
      title: 'Default Expanded (Mobile Browse Panel)',
      type: 'boolean',
      initialValue: false,
      description:
        'If enabled, this parent section will be expanded by default when the mobile menu opens.',
    }),

    // Submenu Items
    defineField({
      name: 'children',
      title: 'Submenu Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'childItem',
          fields: [
            defineField({
              name: 'backgroundImage',
              title: 'Background Image (New Mobile Browse Panel)',
              type: 'string',
              description:
                'Cloudinary background for this child card. Icon + title will be overlaid in the center.',
              options: {
                aiAssist: {exclude: true},
              },
            }),
            defineField({
              name: 'badge',
              title: 'Badge Text (Mobile Browse Panel)',
              type: 'string',
              description: 'Badge shown at top-right corner of this child card.',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',

              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon (optional)',
              type: 'string',
              description: 'Icon for this submenu item',
              options: {
                list: ICONS.map((icon) => ({
                  title: formatIconName(icon),
                  value: icon,
                })),
                aiAssist: {exclude: true},
              },
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              options: {aiAssist: {exclude: true}},
            }),

            // defineField({
            //   name: "navigateTo",
            //   title:
            //     "Navigate To (Alternative to href for modal navigation query)",
            //   type: "string",
            //   description: "e.g.: ?modal=weeklyRaffle, ?modal=100kRace",
            // }),
            defineField({
              name: 'navigateTo',
              title: 'Open Promotion Modal (by Slug)',
              type: 'string',
              description:
                'Enter only the slug of the promotion modal (e.g. free-spins-2025, weekly-raffle). Do NOT change the slug. Just go to the promotion modal document , copy the slug of the modal you what to open from this and paste here.',
            }),
            defineField({
              name: 'locale',
              title: 'Language Code',
              type: 'string',
              description: 'যেমন: en, es, tr, de, ja, zh',
              options: {
                list: [
                  'en',
                  'es',
                  'tr',
                  'de',
                  'ja',
                  'zh',
                  'pt',
                  'ru',
                  'fr',
                  'hi',
                  'id',
                  'ko',
                  'pl',
                  'vi',
                  'fi',
                  'ar',
                ],
              },
            }),

            defineField({
              name: 'childOnClick',
              title: 'Special Action (Submenu Item)',
              type: 'string',
              options: {
                list: [
                  {
                    title: 'Open Weekly Raffle Modal',
                    value: 'openWeeklyRaffle',
                  },
                  {title: 'Open 100k Race Modal', value: 'open100kRace'},
                  {title: 'Coming Soon Toast', value: 'comingSoon'},
                ],
                aiAssist: {exclude: true},
              },
            }),

            // defineField({
            //   name: 'order',
            //   title: 'Order',
            //   type: 'number',
            //   initialValue: 999,
            // }),
          ],

          preview: {
            select: {
              title: 'text',
              href: 'href',
              navigateTo: 'navigateTo',
              locale: 'locale',
              action: 'childOnClick',
              icon: 'icon',
            },
            prepare({title, href, navigateTo, locale, action, icon}: any) {
              const parts = []
              if (locale) parts.push(`🌐 ${locale.toUpperCase()}`)
              if (href) parts.push(`→ ${href}`)
              if (navigateTo) parts.push(`🔗 ${navigateTo}`)
              if (action) parts.push(`⚡ ${action}`)
              if (icon) parts.push(`🎨 ${icon}`)

              return {
                title: title || 'No text',
                subtitle: parts.length ? parts.join(' • ') : 'No action or link',
              }
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'text',
      icon: 'icon',
      href: 'href',
      navigateTo: 'navigateTo',
      onClick: 'onClick',
      requiresAuth: 'requiresAuth',
      children: 'children',
    },
    prepare({title, icon, href, navigateTo, onClick, requiresAuth, children}: any) {
      const childCount = Array.isArray(children) ? children.length : 0
      const parts = []
      if (href) parts.push(`→ ${href}`)
      if (navigateTo) parts.push(`🔗 ${navigateTo}`)
      if (onClick) parts.push(`⚡ ${onClick}`)
      if (icon) parts.push(`🎨 ${icon}`)
      if (requiresAuth) parts.push('🔒 Auth required')
      if (childCount > 0) parts.push(`📂 ${childCount} submenu item${childCount !== 1 ? 's' : ''}`)

      return {
        title: title || 'No text',
        subtitle: parts.length ? parts.join(' • ') : 'No link or action',
      }
    },
  },
})
