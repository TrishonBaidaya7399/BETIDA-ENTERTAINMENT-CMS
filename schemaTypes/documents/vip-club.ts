import {defineType, defineField, defineArrayMember} from 'sanity'
const requiredTrimmed = (fieldName: string) => (Rule: any) =>
  Rule.required().custom((value: string) => {
    if (!value || !value.trim()) return `${fieldName} cannot be empty`
    return true
  })
export default defineType({
  name: 'vipClub',
  title: 'VIP Club',
  type: 'document',
  groups: [
    {name: 'yourRewards', title: 'Your Rewards'},
    {name: 'cards', title: 'XP Cards Section'},
    {name: 'ranks', title: 'VIP Ranks & Rewards'},
    {name: 'perksTable', title: 'Perks Table'},
    {name: 'content', title: 'Content & Copy'},
  ],
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),

    // =============================================
    // 0. Your Rewards Section (appears first in UI)
    // =============================================
    defineField({
      name: 'yourRewards',
      title: 'Your Rewards',
      type: 'object',
      group: 'yourRewards',
      options: {collapsible: true, collapsed: false},

      fields: [
        // Page Header
        defineField({
          name: 'pageHeader',
          title: 'Reward Page Header Text',
          type: 'string',

          validation: (Rule) => Rule.required(),
        }),

        // Reward Cards (unified – cashback, free spins, anything)
        defineField({
          name: 'rewardCards',
          title: 'Reward Cards',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'rewardCard',
              title: 'Reward Card',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {aiAssist: {exclude: true}},
                  description: 'Emoji or icon name (e.g. money-bag, slot-machine, trophy)',
                }),
                defineField({
                  name: 'title',
                  title: 'Card Title',
                  type: 'string',

                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'subtitle',
                  title: 'Card Subtitle',
                  type: 'string',
                }),
                defineField({
                  name: 'redirectButtonTitle',
                  title: 'Button Title (on card)',
                  type: 'string',
                }),
                defineField({
                  name: 'redirectButtonURL',
                  title: 'Button Redirect URL',
                  type: 'string',
                  options: {aiAssist: {exclude: true}},
                }),
                defineField({
                  name: 'modalContent',
                  title: 'Modal Content (Rich Text + Images)',
                  type: 'array',
                  of: [{type: 'block'}],
                  validation: (Rule) => Rule.required().min(1),
                }),
                // defineField({
                //   name: "modalText",
                //   title: "Modal Content (Rich Text + Images)",
                //   type: "array",
                //   of: [
                //     defineArrayMember({
                //       type: "object",
                //       name: "localizedModal",
                //       fields: [
                //         defineField({
                //           name: "language",
                //           title: "Language",
                //           type: "string",
                //           options: {
                //             list: [
                //               "en",
                //               "tr",
                //               "de",
                //               "es",
                //               "ja",
                //               "zh",
                //               "pt",
                //               "ru",
                //             ].map((l) => ({
                //               title: l.toUpperCase(),
                //               value: l,
                //             })),
                //           },
                //           validation: (Rule) => Rule.required(),
                //         }),
                //         defineField({
                //           name: "content",
                //           title: "Content Blocks",
                //           type: "array",
                //           of: [
                //             { type: "block" },
                //             {
                //               type: "image",
                //               options: { hotspot: true },
                //               fields: [
                //                 {
                //                   name: "alt",
                //                   type: "string",
                //                   title: "Alt Text",
                //                 },
                //               ],
                //             },
                //           ],
                //           validation: (Rule) => Rule.min(1),
                //         }),
                //       ],
                //     }),
                //   ],
                //   validation: (Rule) => Rule.min(1),
                // }),
                defineField({
                  name: 'isActive',
                  title: 'Active',
                  type: 'boolean',
                  initialValue: true,
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  icon: 'icon',
                  isActive: 'isActive',
                  hasModal: 'modalContent',
                },
                prepare({title, icon, isActive, hasModal}) {
                  return {
                    title: `${icon ? icon + '  ' : ''}${title || 'Unnamed Reward'}`,
                    subtitle: `${isActive ? 'Active' : 'Inactive'} • ${hasModal?.length ? 'Has modal' : 'No modal'}`,
                  }
                },
              },
            }),
          ],

          validation: (Rule) => Rule.min(1).max(12),
        }),

        // Footer Text
        defineField({
          name: 'pageFooterText',
          title: 'Reward Page Footer Text',
          type: 'string',
        }),

        // Footer Redirect URL
        defineField({
          name: 'pageFooterURL',
          title: 'Reward Page Footer Redirect URL',
          type: 'string',
          options: {aiAssist: {exclude: true}},
          description: 'Optional link for the footer text',
        }),
      ],

      // Nice preview for the whole section in the document list
      preview: {
        select: {
          header: 'pageHeader',
          count: 'rewardCards.length',
        },
        prepare({header, count = 0}) {
          return {
            title: header || 'Your Rewards Section',
            subtitle: `${count} reward card${count !== 1 ? 's' : ''}`,
          }
        },
      },
    }),
    // =============================================
    // 1. XP Cards Section (Casino & Sports)
    // =============================================
    defineField({
      name: 'bannerImg',
      title: 'Banner Image (Cloudinary ID)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'xpCards',
      title: 'XP Earning Cards',
      type: 'array',
      group: 'cards',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title (e.g. CASINO / SPORTS)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'amount',
              title: 'Amount (e.g. $1 USD)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'xp',
              title: 'XP Earned (e.g. 1XP / 2XP)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              amount: 'amount',
              xp: 'xp',
            },
            prepare({title, amount, xp}) {
              return {
                title: title || 'XP Card',
                subtitle: `${amount || '?'} → ${xp || '?'}`,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(2).max(2),
    }),

    // =============================================
    // 2. VIP Ranks & Rewards (Carousel Data)
    // =============================================
    defineField({
      name: 'vipTiers',
      title: 'VIP Tiers & Levels',
      type: 'array',
      group: 'ranks',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tier',
          fields: [
            defineField({
              name: 'key',
              title: 'Key (lowercase, unique)',
              type: 'string',
              options: {
                list: [
                  'bronze',
                  'silver',
                  'gold',
                  'platinum',
                  'emerald',
                  'ruby',
                  'diamond',
                  'obsidian',
                ],
                aiAssist: {exclude: true},
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Display Name (e.g. BRONZE, Emerald)',
              type: 'string',

              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'badgeImage',
              title: 'Tier Badge Image (Cloudinary PublicId)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'xpRange',
              title: 'XP Range (e.g. 1,000 - 10,000 XP)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'levels',
              title: 'Levels (1–10 per tier)',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'level',
                      title: 'Level Number',
                      type: 'number',
                      validation: (Rule) => Rule.required().min(1).max(99),
                    }),
                    defineField({
                      name: 'badgeImage',
                      title: 'Level Badge Image',
                      type: 'string',
                      options: {aiAssist: {exclude: true}},
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'description',
                      title: 'Card Description',
                      type: 'string',

                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'xpRequired',
                      title: 'XP Required',
                      type: 'string',
                      options: {aiAssist: {exclude: true}},
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'unlocked',
                      title: 'Is Unlocked by Default?',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {
                      level: 'level',
                      xp: 'xpRequired',
                      unlocked: 'unlocked',
                    },
                    prepare({level, xp, unlocked}) {
                      return {
                        title: `Level ${level}`,
                        subtitle: `${xp || '? XP'} • ${unlocked ? 'Unlocked' : 'Locked'}`,
                      }
                    },
                  },
                }),
              ],
              validation: (Rule) => Rule.required().min(1).max(10),
            }),
          ],
          preview: {
            select: {
              name: 'name',
              key: 'key',
              levelCount: 'levels.length',
            },
            prepare({name, key, levelCount = 0}) {
              return {
                title: name || key?.toUpperCase() || 'Unnamed Tier',
                subtitle: `${key} • ${levelCount} level${levelCount !== 1 ? 's' : ''}`,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(8).max(8),
    }),

    // =============================================
    // 3. Perks Comparison Table
    // =============================================
    defineField({
      name: 'perksTable',
      title: 'Perks by Tier Table',
      type: 'object',
      group: 'perksTable',
      fields: [
        // Tier Icons – Managed directly inside the Perks Table section
        defineField({
          name: 'tierIcons',
          title: 'Tier Icons (Table Column Headers)',
          type: 'object',
          description: 'Upload or enter Cloudinary public IDs for each tier icon',
          options: {
            columns: 2,
          },
          validation: (Rule) => Rule.required(),
          fields: [
            {
              name: 'bronze',
              title: 'Bronze Icon',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: requiredTrimmed('Icon'),
            },
            {
              name: 'silver',
              title: 'Silver Icon',
              type: 'string',

              validation: requiredTrimmed('Icon'),
            },
            {
              name: 'gold',
              title: 'Gold Icon',
              type: 'string',

              validation: requiredTrimmed('Icon'),
            },
            {
              name: 'platinum',
              title: 'Platinum Icon',
              type: 'string',
              options: {aiAssist: {exclude: true}},

              validation: requiredTrimmed('Icon'),
            },
            {
              name: 'emerald',
              title: 'Emerald Icon',
              type: 'string',
              options: {aiAssist: {exclude: true}},

              validation: requiredTrimmed('Icon'),
            },
            {
              name: 'ruby',
              title: 'Ruby Icon',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: requiredTrimmed('Icon'),
            },
            {
              name: 'diamond',
              title: 'Diamond Icon',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: requiredTrimmed('Icon'),
            },
            {
              name: 'obsidian',
              title: 'Obsidian Icon',
              type: 'string',
              options: {aiAssist: {exclude: true}},

              validation: requiredTrimmed('Icon'),
            },
          ],
          preview: {
            select: {
              bronze: 'bronze',
              diamond: 'diamond',
            },
            prepare({bronze, diamond}) {
              return {
                title: 'Tier Icons',
                subtitle: bronze && diamond ? 'Configured' : 'Incomplete',
              }
            },
          },
        }),
        defineField({
          name: 'perksTableRow',
          title: 'Perks by Tier Table row data',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'perkName',
                  title: 'Perk Name',
                  type: 'string',

                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'bronze',
                  title: `Bronze (e.g. "2.2%", "Yes", "No", "1.1x")`,
                  type: 'string',
                }),
                defineField({
                  name: 'silver',
                  title: 'Silver',
                  type: 'string',
                }),
                defineField({
                  name: 'gold',
                  title: 'Gold',
                  type: 'string',
                }),
                defineField({
                  name: 'platinum',
                  title: 'Platinum',
                  type: 'string',
                }),
                defineField({
                  name: 'emerald',
                  title: 'Emerald',
                  type: 'string',
                }),
                defineField({
                  name: 'ruby',
                  title: 'Ruby',
                  type: 'string',
                }),
                defineField({
                  name: 'diamond',
                  title: 'Diamond',
                  type: 'string',
                }),
                defineField({
                  name: 'obsidian',
                  title: 'Obsidian',
                  type: 'string',
                }),
              ],
              preview: {
                select: {
                  name: 'perkName',
                  hasBronze: 'bronze',
                  hasObsidian: 'obsidian',
                },
                prepare({name, hasBronze, hasObsidian}) {
                  return {
                    title: name || 'Unnamed Perk',
                    subtitle: hasBronze && hasObsidian ? 'Fully defined' : 'Partial values',
                  }
                },
              },
            }),
          ],
        }),
      ],
      preview: {
        select: {
          rowCount: 'perksTableRow.length',
        },
        prepare({rowCount = 0}) {
          return {
            title: 'Perks Comparison Table',
            subtitle: `${rowCount} perk row${rowCount !== 1 ? 's' : ''}`,
          }
        },
      },
    }),

    // =============================================
    // 4. General Content & Copy
    // =============================================
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'levelUpTitle',
          title: 'Level Up & Earn Rewards Title',
          type: 'string',
        }),
        defineField({
          name: 'levelUpFooterText',
          title: 'Level Up Footer text (e.g., Bet to earn XP. Level up to...)',
          type: 'string',
        }),
        defineField({
          name: 'levelUpFooterLink',
          title: 'Level Up Footer Redirect Link (e.g., https://betida.dev/terms/vip-terms)',
          type: 'string',
          options: {aiAssist: {exclude: true}},
        }),
        defineField({
          name: 'vipRanksTitle',
          title: 'VIP Ranks & Rewards Title',
          type: 'string',
        }),
        defineField({
          name: 'perksTableTitle',
          title: 'New Perks With Each Rank Title',
          type: 'string',
        }),
        defineField({
          name: 'learnMoreText',
          title: 'Learn More Footer Text',
          type: 'string',
        }),
        defineField({
          name: 'tableFootnote',
          title: 'Table Footnote (*Available at select levels...)',
          type: 'string',
        }),
        defineField({
          name: 'tableFooterLearnMore',
          title: "Table Footer Learn More note (Learn more about Rivalry VIP Program's...)",
          type: 'string',
        }),
        defineField({
          name: 'tableFooterLearnMoreLink',
          title: 'Table Footer Learn More redirect link',
          type: 'string',
          options: {aiAssist: {exclude: true}},
        }),
      ],
      preview: {
        select: {
          hasRanksTitle: 'vipRanksTitle',
          hasPerksTitle: 'perksTableTitle',
        },
        prepare({hasRanksTitle, hasPerksTitle}) {
          return {
            title: 'Content & Copy',
            subtitle:
              `${hasRanksTitle ? 'Ranks title ✓' : ''} ${hasPerksTitle ? 'Perks title ✓' : ''}`.trim() ||
              'Basic copy',
          }
        },
      },
    }),
  ],

  preview: {
    select: {
      lang: 'language',
      rewardCount: 'yourRewards.rewardCards',
      tierCount: 'vipTiers',
    },
    prepare({lang = 'en', rewardCount = [], tierCount = []}) {
      return {
        title: `VIP Club (${lang.toUpperCase()})`,
        subtitle: `${rewardCount.length} rewards • ${tierCount.length} tiers`,
      }
    },
  },
})
