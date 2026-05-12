import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'profile',
  title: 'User Profile Info',
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
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'vipProgress',
      title: 'VIP Progress',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: 'profileTitle',
      title: 'Profile Title',
      type: 'string',

      description: 'Localized Profile Title (e.g., Your VIP Progress)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',

      description: "Localized level name (e.g., 'Bronze', 'Silver')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nextLevel',
      title: 'Next Level',
      type: 'string',

      description: 'Localized next level name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showPopupItem',
      title: 'Show Popup Item',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'kycDone',
      title: 'Is KYC done?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'new_user',
      title: 'New User?',
      description: 'Indicates if the user is new (e.g., Never logged in or registered before).',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'is_attached_vault_account',
      title: 'Is the account attached to the vault (is_attached_vault_account)?',
      type: 'boolean',
      initialValue: false,
    }),
    // ==================== KYC STATUS - ARRAY ====================
    defineField({
      name: 'user_kyc_statuses',
      title: 'User KYC Statuses',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'kycStatus',
          title: 'KYC Status Item',
          fields: [
            defineField({
              name: 'validation_level',
              title: 'Validation Level',
              type: 'string',
              options: {
                list: [
                  {title: 'Level 1', value: 'level_1'},
                  {title: 'Level 2', value: 'level_2'},
                  {title: 'Level 3', value: 'level_3'},
                  {title: 'Level 4', value: 'level_4'},
                ],
                layout: 'dropdown',
                aiAssist: {exclude: true},
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'status',
              title: 'Status',
              type: 'string',
              options: {
                list: [
                  {title: 'Verified ✅', value: 'verified'},
                  {title: 'Submitted', value: 'submitted'},
                  {title: 'Action Required', value: 'action_required'},
                  {title: 'Rejected', value: 'rejected'},
                ],
                layout: 'dropdown',
                aiAssist: {exclude: true},
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              validation_level: 'validation_level',
              status: 'status',
            },
            prepare({validation_level, status}) {
              const levelMap: any = {
                level_1: 'Level 1',
                level_2: 'Level 2',
                level_3: 'Level 3',
                level_4: 'Level 4',
              }
              const statusMap: any = {
                verified: '✅ Verified',
                submitted: 'Submitted',
                action_required: '⚠️ Action Required',
                rejected: '❌ Rejected',
              }
              return {
                title: `${levelMap[validation_level] || validation_level}`,
                subtitle: statusMap[status] || status,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'unauthenticatedTitle',
      title: 'Unauthenticated Area – Title',
      type: 'string',

      description: 'Example: World’s Largest Online Casino and Sportsbook',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unauthenticatedSignupText',
      title: 'Unauthenticated Area – Sign-up Text',
      type: 'string',

      description: 'Text shown above social icons (e.g. "Or sign up with")',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      language: 'language',
      username: 'username',
      level: 'level',
      nextLevel: 'nextLevel',
      vipProgress: 'vipProgress',
      showPopupItem: 'showPopupItem',
    },
    prepare({language, username, level, nextLevel, vipProgress, showPopupItem}: any) {
      return {
        title: `${username || 'No username'}`,
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${level || 'No level'} → ${nextLevel || 'No next level'} • ${vipProgress ?? 0}% VIP • ${showPopupItem ? '🔔 Popup on' : '🔕 Popup off'}`,
      }
    },
  },
})
