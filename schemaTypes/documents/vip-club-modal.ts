import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'vipClubModal',
  title: 'VIP Club Modal',
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
      name: 'modalData',
      title: 'Modal Data',
      type: 'object',
      options: {collapsible: true, collapsed: false},
      fields: [
        // ─── OVERVIEW ───
        defineField({
          name: 'overview',
          title: 'Overview Sections',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              options: {collapsible: true, collapsed: true},
              fields: [
                defineField({
                  name: 'title',
                  title: 'Section Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'locked',
                  title: 'Locked',
                  type: 'boolean',
                  initialValue: false,
                }),
                defineField({
                  name: 'items',
                  title: 'Tier Items',
                  type: 'array',
                  of: [
                    defineArrayMember({
                      type: 'object',
                      options: {collapsible: true, collapsed: true},
                      fields: [
                        defineField({
                          name: 'tier',
                          title: 'Tier',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'icon',
                          title: 'Icon',
                          type: 'string',
                          options: {
                            list: [
                              {title: 'Stroke Star', value: 'stroke-star'},
                              {title: 'Fill Star', value: 'fill-star'},
                            ],
                            layout: 'radio',
                            aiAssist: {exclude: true},
                          },
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'perks',
                          title: 'Perks',
                          type: 'array',
                          description: 'Add one perk value per item',
                          of: [
                            defineArrayMember({
                              type: 'object',
                              options: {collapsible: false},
                              fields: [
                                defineField({
                                  name: 'value',
                                  title: 'Value',
                                  type: 'string',
                                  options: {aiAssist: {exclude: true}},
                                  validation: (Rule) => Rule.required(),
                                }),
                              ],
                              preview: {
                                select: {value: 'value'},
                                prepare({value}: any) {
                                  return {title: value || 'No value'}
                                },
                              },
                            }),
                          ],
                          validation: (Rule) => Rule.required().min(1),
                        }),
                      ],
                      preview: {
                        select: {tier: 'tier', icon: 'icon', perks: 'perks'},
                        prepare({tier, icon, perks}: any) {
                          const perkCount = Array.isArray(perks) ? perks.length : 0
                          return {
                            title: tier || 'Unnamed Tier',
                            subtitle: `${icon === 'fill-star' ? '⭐' : '☆'} ${icon || '—'} • ${perkCount} perk${perkCount !== 1 ? 's' : ''}`,
                          }
                        },
                      },
                    }),
                  ],
                }),
              ],
              preview: {
                select: {title: 'title', locked: 'locked', items: 'items'},
                prepare({title, locked, items}: any) {
                  const itemCount = Array.isArray(items) ? items.length : 0
                  return {
                    title: title || 'Untitled Section',
                    subtitle: `${locked ? '🔒 Locked' : '🔓 Unlocked'} • ${itemCount} tier${itemCount !== 1 ? 's' : ''}`,
                  }
                },
              },
            }),
          ],
          validation: (Rule) => Rule.required().min(1),
        }),

        // ─── REWARD ───
        defineField({
          name: 'reward',
          title: 'Reward Sections',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              options: {collapsible: true, collapsed: true},
              fields: [
                defineField({
                  name: 'title',
                  title: 'Section Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                }),
                defineField({
                  name: 'claimableAmount',
                  title: 'Claimable Amount',
                  type: 'number',
                  initialValue: 0,
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'locked',
                  title: 'Locked',
                  type: 'boolean',
                  initialValue: false,
                }),
                defineField({
                  name: 'items',
                  title: 'Tier Items',
                  type: 'array',
                  of: [
                    defineArrayMember({
                      type: 'object',
                      options: {collapsible: true, collapsed: true},
                      fields: [
                        defineField({
                          name: 'tier',
                          title: 'Tier',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'icon',
                          title: 'Icon',
                          type: 'string',
                          options: {
                            list: [
                              {title: 'Stroke Star', value: 'stroke-star'},
                              {title: 'Fill Star', value: 'fill-star'},
                            ],
                            layout: 'radio',
                            aiAssist: {exclude: true},
                          },
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'perks',
                          title: 'Perks',
                          type: 'array',
                          description: 'Add one perk value per item',
                          of: [
                            defineArrayMember({
                              type: 'object',
                              options: {collapsible: false},
                              fields: [
                                defineField({
                                  name: 'value',
                                  title: 'Value',
                                  type: 'string',
                                  options: {aiAssist: {exclude: true}},
                                  validation: (Rule) => Rule.required(),
                                }),
                              ],
                              preview: {
                                select: {value: 'value'},
                                prepare({value}: any) {
                                  return {title: value || 'No value'}
                                },
                              },
                            }),
                          ],
                          validation: (Rule) => Rule.required().min(1),
                        }),
                      ],
                      preview: {
                        select: {tier: 'tier', icon: 'icon', perks: 'perks'},
                        prepare({tier, icon, perks}: any) {
                          const perkCount = Array.isArray(perks) ? perks.length : 0
                          return {
                            title: tier || 'Unnamed Tier',
                            subtitle: `${icon === 'fill-star' ? '⭐' : '☆'} ${icon || '—'} • ${perkCount} perk${perkCount !== 1 ? 's' : ''}`,
                          }
                        },
                      },
                    }),
                  ],
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  locked: 'locked',
                  claimableAmount: 'claimableAmount',
                  items: 'items',
                },
                prepare({title, locked, claimableAmount, items}: any) {
                  const itemCount = Array.isArray(items) ? items.length : 0
                  return {
                    title: title || 'Untitled Reward',
                    subtitle: `${locked ? '🔒 Locked' : '🔓 Unlocked'} • 💰 ${claimableAmount ?? 0} • ${itemCount} tier${itemCount !== 1 ? 's' : ''}`,
                  }
                },
              },
            }),
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      language: 'language',
      overview: 'modalData.overview',
      reward: 'modalData.reward',
    },
    prepare({language, overview, reward}: any) {
      const overviewCount = Array.isArray(overview) ? overview.length : 0
      const rewardCount = Array.isArray(reward) ? reward.length : 0
      return {
        title: 'VIP Club Modal',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${overviewCount} overview sections • ${rewardCount} reward sections`,
      }
    },
  },
})
