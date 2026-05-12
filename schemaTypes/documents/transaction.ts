import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'transactions',
  title: 'Transactions',
  type: 'document',
  preview: {
    select: {
      lang: 'language',
      firstCategory: 'transactions[0].category',
      firstAmount: 'transactions[0].amount',
      totalCount: 'transactions',
    },
    prepare({lang = 'en', firstCategory, firstAmount, totalCount = []}) {
      const langBadge = lang.toUpperCase()
      let subtitle = `${langBadge} • Transactions`

      if (totalCount.length > 0) {
        subtitle += ` • ${totalCount.length} item${totalCount.length === 1 ? '' : 's'}`
        if (firstCategory && firstAmount) {
          subtitle += `  –  ${firstCategory} (${firstAmount})`
        }
      } else {
        subtitle += ' • Empty'
      }

      return {
        title: `Transactions (${langBadge})`,
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
      name: 'transactions',
      title: 'Transactions',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'transaction',
          title: 'Transaction',
          type: 'object',
          preview: {
            select: {
              category: 'category',
              depositSub: 'depositSubCategory',
              withdrawalSub: 'withdrawalSubCategory',
              bonusSub: 'bonusSubCategory',
              otherSub: 'otherSubCategory',
              date: 'date',
              amount: 'amount',
              status: 'status',
              crypto: 'cryptoType',
              bonusType: 'bonusType',
              raffle: 'raffleName',
              race: 'raceName',
            },
            prepare(selection) {
              const {
                category,
                depositSub,
                withdrawalSub,
                bonusSub,
                otherSub,
                date,
                amount,
                status,
                crypto,
                bonusType,
                raffle,
                race,
              } = selection
              const subCat = depositSub || withdrawalSub || bonusSub || otherSub || ''

              let title = category || 'Unknown'
              if (subCat) title += ` (${subCat})`

              const subtitleParts = []

              if (date) {
                const d = new Date(date)
                subtitleParts.push(d.toLocaleDateString())
              }

              if (amount) subtitleParts.push(amount)

              if (status) subtitleParts.push(status)

              if (crypto) subtitleParts.push(crypto.toUpperCase())

              if (bonusType) subtitleParts.push(bonusType)

              if (raffle) subtitleParts.push(`Raffle: ${raffle}`)

              if (race) subtitleParts.push(`Race: ${race}`)

              const subtitle = subtitleParts.filter(Boolean).join(' • ') || 'No details'

              return {
                title,
                subtitle,
              }
            },
          },

          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  {title: 'Deposits', value: 'deposits'},
                  {title: 'Withdrawals', value: 'withdrawals'},
                  {title: 'Bonuses', value: 'bonuses'},
                  {title: 'Raffles', value: 'raffles'},
                  {title: 'Races', value: 'races'},
                  {title: 'Other', value: 'other'},
                ],
                aiAssist: {exclude: true},
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'depositSubCategory',
              title: 'Deposit Sub Category',
              type: 'string',
              options: {
                list: [
                  {title: 'Crypto', value: 'crypto'},
                  {title: 'Local Currency', value: 'local-currency'},
                ],
                aiAssist: {exclude: true},
              },
              hidden: ({parent}) => parent?.category !== 'deposits',
            }),

            defineField({
              name: 'withdrawalSubCategory',
              title: 'Withdrawal Sub Category',
              type: 'string',
              options: {
                list: [
                  {title: 'Crypto', value: 'crypto'},
                  {title: 'Local Currency', value: 'local-currency'},
                ],
                aiAssist: {exclude: true},
              },
              hidden: ({parent}) => parent?.category !== 'withdrawals',
            }),

            defineField({
              name: 'bonusSubCategory',
              title: 'Bonus Sub Category',
              type: 'string',
              options: {
                list: [
                  {title: 'All Bonuses', value: 'all-bonuses'},
                  {title: 'Manual', value: 'manual'},
                  {title: 'Promotional', value: 'promotional'},
                  {title: 'Drop', value: 'drop'},
                  {title: 'Rakeback', value: 'rakeback'},
                  {title: 'Reload', value: 'reload'},
                  {title: 'Race Payout', value: 'race-payout'},
                  {title: 'Sportsbook Promotion', value: 'sportsbook-promotion'},
                ],
                aiAssist: {exclude: true},
              },
              hidden: ({parent}) => parent?.category !== 'bonuses',
            }),

            defineField({
              name: 'otherSubCategory',
              title: 'Other Sub Category',
              type: 'string',
              options: {
                list: [
                  {title: 'All Other', value: 'all-other'},
                  {title: 'Tips Received', value: 'tips-received'},
                  {title: 'Vault Deposit', value: 'vault-deposit'},
                  {title: 'Vault Withdrawal', value: 'vault-withdrawal'},
                  {title: 'Campaign Withdrawal', value: 'campaign-withdrawal'},
                  {title: 'Rain Received', value: 'rain-received'},
                  {title: 'Rain Sent', value: 'rainSent'},
                ],
                aiAssist: {exclude: true},
              },
              hidden: ({parent}) => parent?.category !== 'other',
            }),

            defineField({
              name: 'date',
              title: 'Date',
              type: 'datetime',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'status',
              title: 'Status',
              type: 'string',
              options: {
                list: ['Sent', 'Completed', 'Pending', 'Confirmed'],
                aiAssist: {exclude: true},
              },
              hidden: ({parent}) => !['deposits', 'withdrawals'].includes(parent?.category || ''),
            }),

            defineField({
              name: 'viewText',
              title: 'View Text',
              type: 'string',
              hidden: ({parent}) => !['deposits', 'withdrawals'].includes(parent?.category || ''),
            }),

            defineField({
              name: 'viewUrl',
              title: 'View URL',
              type: 'url',
              options: {aiAssist: {exclude: true}},
              hidden: ({parent}) => !['deposits', 'withdrawals'].includes(parent?.category || ''),
            }),

            defineField({
              name: 'cryptoType',
              title: 'Crypto Type',
              type: 'string',
              options: {
                list: ['bitcoin', 'ethereum', 'binance'],
                aiAssist: {exclude: true},
              },
              hidden: ({parent}) =>
                !['deposits', 'withdrawals', 'bonuses', 'other'].includes(parent?.category || ''),
            }),

            defineField({
              name: 'amount',
              title: 'Amount',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'bonusType',
              title: 'Bonus Type',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              hidden: ({parent}) => !['bonuses', 'other'].includes(parent?.category || ''),
            }),

            defineField({
              name: 'raffleName',
              title: 'Raffle Name',
              type: 'string',
              hidden: ({parent}) => parent?.category !== 'raffles',
            }),

            defineField({
              name: 'tickets',
              title: 'Tickets',
              type: 'number',
              hidden: ({parent}) => parent?.category !== 'raffles',
            }),

            defineField({
              name: 'raceName',
              title: 'Race Name',
              type: 'string',
              hidden: ({parent}) => parent?.category !== 'races',
            }),

            defineField({
              name: 'position',
              title: 'Position',
              type: 'number',
              hidden: ({parent}) => parent?.category !== 'races',
            }),

            defineField({
              name: 'prize',
              title: 'Prize',
              type: 'string',
              hidden: ({parent}) => parent?.category !== 'races',
            }),
          ],
        }),
      ],
    }),
  ],
})
