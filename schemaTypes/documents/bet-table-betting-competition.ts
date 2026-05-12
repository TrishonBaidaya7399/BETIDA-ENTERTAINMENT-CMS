// schemas/bettingCompetition.ts
import {defineType, defineField} from 'sanity'
import {orderRankOrdering} from '@sanity/orderable-document-list'

const medalsList = [
  {title: '🏆 Trophy', value: '🏆'},
  {title: '💎 Diamond', value: '💎'},
  {title: '🔥 Fire', value: '🔥'},
  {title: '🎖️ Military Medal', value: '🎖️'},
  {title: '🪙 Coin', value: '🪙'},
  {title: '📊 Chart', value: '📊'},
  {title: '❤️ Heart', value: '❤️'},
  {title: '👍 Thumbs Up', value: '👍'},
  {title: '💜 Purple Heart', value: '💜'},
]

const entryFields = [
  defineField({
    name: 'rank',
    title: 'Rank',
    type: 'number',
    validation: (Rule) => Rule.required().min(1),
  }),
  defineField({
    name: 'player',
    title: 'Player Name',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  defineField({name: 'userId', title: 'User ID', type: 'string'}),
  defineField({
    name: 'wager',
    title: 'Wager Amount',
    description: 'e.g. "62,272.470 BCD"',
    type: 'string',
    options: {aiAssist: {exclude: true}},
  }),
  defineField({
    name: 'prize',
    title: 'Prize Amount',
    description: 'e.g. "85,025.288 BCD"',
    type: 'string',
    options: {aiAssist: {exclude: true}},
  }),
  defineField({
    name: 'profitInPercentage',
    title: 'Profit %',
    description: 'e.g. "50%"',
    type: 'string',
    options: {aiAssist: {exclude: true}},
  }),
  defineField({
    name: 'profile',
    title: 'Player Profile',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    groups: [
      {name: 'medals', title: 'Medals'},
      {name: 'games', title: 'Favorite Games'},
      {name: 'wager', title: 'Wager Contest'},
      {name: 'gameStats', title: 'Game Stats'},
    ],
    fields: [
      defineField({
        name: 'avatar',
        title: 'User profile Image (Cloudinary public ID)',
        type: 'string',
        options: {aiAssist: {exclude: true}},
      }),
      defineField({
        name: 'vipLevel',
        title: 'VIP Level',
        description: 'e.g. "DIAMOND SVIP41"',
        type: 'string',
      }),
      defineField({
        name: 'joinedOn',
        title: 'Member Joined on',
        type: 'datetime',
        // validation: (Rule) => Rule.required(), //////////////////////////////////////////////////////////////////////////////////////////////////
      }),
      defineField({name: 'likes', title: 'Likes Count', type: 'number'}),
      defineField({
        name: 'userId',
        title: 'User ID',
        type: 'string',
        options: {aiAssist: {exclude: true}},
      }),
      defineField({name: 'totalWins', title: 'Total Wins', type: 'number'}),
      defineField({name: 'totalBetCounts', title: 'Total Bet Count', type: 'number'}),
      defineField({
        name: 'totalWagered',
        title: 'Total Wagered',
        description: 'e.g. "$963,911.66K"',
        type: 'string',
        options: {aiAssist: {exclude: true}},
      }),
      // === MEDALS ===
      defineField({
        name: 'selectedMedals',
        title: 'Selected / Earned Medals',
        type: 'array',
        description: 'Select which medals this user has earned (references to Medal documents)',
        of: [
          {
            type: 'reference',
            to: [{type: 'medal'}],
            options: {
              filter: ({document}) => {
                return {
                  filter: 'language == $lang',
                  params: {lang: document?.language || 'en'},
                }
              },
            },
          },
        ],
        group: 'medals',
      }),

      // === TOP 3 FAVORITE GAMES ===
      defineField({
        name: 'topFavoriteGames',
        title: 'Top 3 Favorite Games',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              defineField({
                name: 'gameName',
                title: 'Game Name',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'image',
                title: 'Game Image (Cloudinary Public ID)',
                type: 'string',
                options: {aiAssist: {exclude: true}},
              }),
              defineField({
                name: 'wagered',
                title: 'Total Wagered',
                type: 'string',
                description: 'e.g. "$16,054,553.06"',
                options: {aiAssist: {exclude: true}},
              }),
              defineField({
                name: 'slug',
                title: 'Game Slug / Link',
                type: 'string',
                options: {aiAssist: {exclude: true}},
              }),
            ],
            preview: {
              select: {title: 'gameName', wagered: 'wagered'},
              prepare({title, wagered}) {
                return {title, subtitle: wagered ? `Wagered: ${wagered}` : ''}
              },
            },
          },
        ],
        validation: (Rule) => Rule.max(3),
        group: 'games',
      }),

      // === WAGER CONTEST HISTORY ===
      defineField({
        name: 'wagerContestHistory',
        title: 'Wager Contest History',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              defineField({
                name: 'date',
                title: 'Date',
                type: 'datetime',
              }),
              defineField({
                name: 'position',
                title: 'Position',
                type: 'string',
              }),
              defineField({
                name: 'prize',
                title: 'Prize',
                type: 'string',
                description: 'e.g. "$325.62"',
              }),
            ],
            preview: {
              select: {date: 'date', position: 'position', prize: 'prize'},
              prepare({date, position, prize}) {
                return {
                  title: `${date} — ${position}`,
                  subtitle: prize ? `Prize: ${prize}` : '',
                }
              },
            },
          },
        ],
        group: 'wager',
      }),

      //  === Game Stats Table Data ===
      defineField({
        name: 'gameStatCategories',
        title: 'Game Stat Categories',
        type: 'array',
        group: 'gameStats',
        description: 'Per-game statistics shown in the stats table. Add any game category.',
        of: [
          {
            type: 'object',
            title: 'Category Stats',
            preview: {
              select: {category: 'category'},
              prepare({category}) {
                return {title: category || 'Unnamed Category'}
              },
            },
            fields: [
              defineField({
                name: 'category',
                title: 'Category Name',
                type: 'string',
                description:
                  'Select a game option. e.g. "Global", "Crash", "Limbo", "Tower Legend", etc',
                options: {
                  list: [
                    {title: 'Global', value: 'Global'},
                    {title: 'Crash', value: 'Crash'},
                    {title: 'Star Wins', value: 'Star Wins'},
                    {title: 'Claw Booster', value: 'Claw Booster'},
                    {title: 'Limbo', value: 'Limbo'},
                    {title: 'Tower Legend', value: 'Tower Legend'},
                    {title: 'Classic Dice', value: 'Classic Dice'},
                    {title: 'Twist', value: 'Twist'},
                  ],
                  aiAssist: {exclude: true},
                },
                // No validation: required so it stays a free-text input too
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'rows',
                title: 'Stat Rows',
                type: 'array',
                description: 'Each row is one currency line in the table',
                of: [
                  {
                    type: 'object',
                    title: 'Stat Row',
                    preview: {
                      select: {currency: 'currency', wagered: 'wagered'},
                      prepare({currency, wagered}) {
                        return {title: currency, subtitle: wagered ? `Wagered: ${wagered}` : ''}
                      },
                    },
                    fields: [
                      defineField({
                        name: 'currencyIcon',
                        title: 'Currency Icon (Cloudinary public ID)',
                        type: 'string',
                        options: {aiAssist: {exclude: true}},
                        description: 'e.g. "icons/usdt" — used as Cloudinary image',
                      }),
                      defineField({
                        name: 'currency',
                        title: 'Currency',
                        type: 'string',
                        options: {aiAssist: {exclude: true}},
                        description: 'e.g. "USDT", "USDC"',
                        validation: (Rule) => Rule.required(),
                      }),
                      defineField({
                        name: 'bets',
                        title: 'Total Bets',
                        type: 'number',
                        validation: (Rule) => Rule.required().min(0),
                      }),
                      defineField({
                        name: 'wins',
                        title: 'Total Wins',
                        type: 'number',
                        validation: (Rule) => Rule.required().min(0),
                      }),
                      defineField({
                        name: 'wagered',
                        title: 'Wagered Amount',
                        type: 'string',
                        options: {aiAssist: {exclude: true}},
                        description: 'e.g. "$20,196,389.17"',
                        validation: (Rule) => Rule.required(),
                      }),
                    ],
                  },
                ],
              }),
            ],
          },
        ],
      }),
    ],
  }),
]

const entryPreview = {
  select: {rank: 'rank', player: 'player', prize: 'prize'},
  prepare(value: Record<string, any>) {
    const {rank, player, prize} = value

    return {
      title: `#${rank} — ${player || 'Unknown'}`,
      subtitle: prize ? `Prize: ${prize}` : '',
    }
  },
}

export default defineType({
  name: 'bettingCompetition',
  title: 'Betting Competition',
  type: 'document',
  orderings: [orderRankOrdering],

  groups: [
    {name: 'general', title: 'General'},
    {name: 'leaderboard', title: 'Leaderboard'},
    {name: 'history', title: 'History'},
  ],

  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),

    // === GENERAL GROUP ===
    defineField({
      name: 'contestName',
      title: 'Contest Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'contestTrophyImg',
      title: 'Contest Card Trophy Image (Cloudinary public ID)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      group: 'general',
    }),

    defineField({
      name: 'prizePoolName',
      title: 'Prize Pool Label',
      description: 'e.g. "Contest prize pool"',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),

    defineField({
      name: 'prizePool',
      title: 'Prize Pool Amount',
      description: 'e.g. "170,077.94 BCD"',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),

    defineField({
      name: 'timeRemainingText',
      title: 'Time Remaining Label',
      description: 'e.g. "Time Remaining"',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),

    defineField({
      name: 'timeRemaining',
      title: 'Contest End Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),

    defineField({
      name: 'topPrizes',
      title: 'Top Prizes',
      type: 'array',
      group: 'general',
      description: 'Select and order the top 3 prize medals',
      validation: (Rule) => Rule.max(3),
      of: [{type: 'string'}],
      options: {
        list: [
          {title: '🥇 Gold', value: '/gold.png'},
          {title: '🥈 Silver', value: '/silver.png'},
          {title: '🥉 Copper', value: '/copper.png'},
        ],
        aiAssist: {exclude: true},
      },
    }),

    defineField({
      name: 'lastChampionAvatar',
      title: 'Last Champion Avatar Cloudinary public ID',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      group: 'general',
    }),

    defineField({
      name: 'lastChampionUsername',
      title: 'Last Champion Username',
      type: 'string',
      group: 'general',
      options: {aiAssist: {exclude: true}},
    }),

    defineField({
      name: 'lastChampionProfit',
      title: 'Last Champion Profit',
      description: 'e.g. "47,568.445 BCD"',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      group: 'general',
    }),

    defineField({
      name: 'lastChampionProfitPercentage',
      title: 'Last Champion Profit %',
      description: 'e.g. "50%"',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      group: 'general',
    }),

    // === LEADERBOARD GROUP ===
    defineField({
      name: 'leaderBoardTableData',
      title: 'Leaderboard Sections',
      description:
        'Each item is a separate leaderboard section with its own status, period and entries. Drag sections to reorder.',
      type: 'array',
      group: 'leaderboard',
      of: [
        {
          type: 'object',
          title: 'Leaderboard Section',
          preview: {
            select: {status: 'status', periodStart: 'periodStart', periodEnd: 'periodEnd'},
            prepare(value: Record<string, any>) {
              const {status, periodStart, periodEnd} = value

              return {
                title: status === 'active' ? '🟢 Active' : '✅ Completed',
                subtitle:
                  periodStart && periodEnd
                    ? `${new Date(periodStart).toLocaleDateString()} - ${new Date(periodEnd).toLocaleDateString()}`
                    : 'No period set',
              }
            },
          },
          fields: [
            defineField({
              name: 'status',
              title: 'Status',
              type: 'string',
              options: {
                list: [
                  {title: 'Active', value: 'active'},
                  {title: 'Completed', value: 'completed'},
                ],
                layout: 'radio',
                aiAssist: {exclude: true},
              },
              initialValue: 'active',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'periodStart',
              title: 'Period — Start',
              type: 'datetime',
            }),

            defineField({
              name: 'periodEnd',
              title: 'Period — End',
              type: 'datetime',
            }),

            defineField({
              name: 'entries',
              title: 'Leaderboard Entries',
              description: 'Drag rows to reorder the ranking',
              type: 'array',
              of: [{type: 'object', title: 'Entry', preview: entryPreview, fields: entryFields}],
            }),
          ],
        },
      ],
    }),

    // === HISTORY GROUP ===
    defineField({
      name: 'historyLeaderboard',
      title: 'History Modal Sections',
      description:
        'Each item is a past leaderboard section with its own period and entries. Drag sections to reorder.',
      type: 'array',
      group: 'history',
      of: [
        {
          type: 'object',
          title: 'History Section',
          preview: {
            select: {periodStart: 'periodStart', periodEnd: 'periodEnd'},
            prepare(value: Record<string, any>) {
              const {periodStart, periodEnd} = value

              return {
                title: '📅 History Entry',
                subtitle:
                  periodStart && periodEnd
                    ? `${new Date(periodStart).toLocaleDateString()} - ${new Date(periodEnd).toLocaleDateString()}`
                    : 'No period set',
              }
            },
          },
          fields: [
            defineField({
              name: 'periodStart',
              title: 'Period — Start',
              type: 'datetime',
            }),

            defineField({
              name: 'periodEnd',
              title: 'Period — End',
              type: 'datetime',
            }),

            defineField({
              name: 'prizePool',
              title: 'Prize Pool',
              description: 'e.g. "95,136 BCD"',
              type: 'string',
              options: {aiAssist: {exclude: true}},
            }),

            defineField({
              name: 'entries',
              title: 'history modal Leaderboard Entries',
              description: 'Drag rows to reorder the ranking',
              type: 'array',
              of: [{type: 'object', title: 'Entry', preview: entryPreview, fields: entryFields}],
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'contestName',
      language: 'language',
      timeRemaining: 'timeRemaining',
    },
    prepare({title, language, timeRemaining}) {
      return {
        title: title || 'Betting Competition',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • Ends: ${
          timeRemaining ? new Date(timeRemaining).toLocaleDateString() : 'No date'
        }`,
      }
    },
  },
})
