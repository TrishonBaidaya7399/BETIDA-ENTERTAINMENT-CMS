import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'notificationTemplates',
  title: 'Notification Templates',
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
      name: 'key',
      title: 'Key (Unique Identifier)',
      type: 'string',
      options: {
        aiAssist: {
          exclude: true,
        },
      },
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value) return true

          const currentId = context.document?._id || ''
          if (currentId && !currentId.startsWith('draft.')) {
            return true
          }
          const existing = await context
            .getClient({apiVersion: '2023-01-01'})
            .fetch(
              `*[_type == "notificationTemplates" && key == $key && !(_id in path("drafts.**"))][0]`,
              {key: value},
            )

          return !existing || 'This key must be unique across all published templates'
        }),
      description:
        'Unique key for this template. Examples: "responsible.deposit_limit.updated", "wallet.withdrawal.approved", "security.new_device_login"',
    }),
    defineField({
      name: 'translationGroup',
      title: 'Translation Group ID',
      type: 'slug',
      options: {
        source: 'key', // auto-generates from your key field
        aiAssist: {exclude: true},
      },
      description:
        'Auto-generated from key. All language variants of the same template share this ID.',
      validation: (Rule) => Rule.required(),
      hidden: true,
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
      initialValue: 1,
      description: 'Increment when the template content or behavior meaningfully changes',
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Active', value: 'active'},
          {title: 'Deprecated', value: 'deprecated'},
        ],
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'active',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['security', 'wallet', 'responsible', 'vip', 'promotion', 'system'].map((v) => ({
          title: v.charAt(0).toUpperCase() + v.slice(1),
          value: v,
        })),
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
      description:
        'Select category → many defaults (channels, persistToInbox, priority etc.) will be inherited from notificationCategoryConfig document of this category',
    }),

    defineField({
      name: 'messageType',
      title: 'Message Type',
      type: 'string',
      options: {
        list: ['transactional', 'compliance', 'marketing'],
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'severity',
      title: 'Severity',
      type: 'string',
      options: {
        list: ['info', 'success', 'warning', 'error'],
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'priority',
      title: 'Priority (Override)',
      type: 'string',
      options: {
        list: ['low', 'normal', 'high', 'critical'],
        aiAssist: {exclude: true},
      },
      initialValue: undefined,
      description:
        "If left empty → will use defaultPriority from the selected category's notificationCategoryConfig",
    }),

    defineField({
      name: 'title',
      title: 'Title (Localized)',
      type: 'string',

      validation: (Rule) => Rule.required().min(2),
      description: 'Minimum English + Turkish required',
    }),
    defineField({
      name: 'body',
      title: 'Body (Localized)',
      type: 'string',

      validation: (Rule) => Rule.required().min(2),
      description: 'Minimum English + Turkish required',
    }),

    defineField({
      name: 'fallbackLocale',
      title: 'Fallback Locale',
      type: 'string',
      initialValue: 'en',
      description: "Language to use if user's language is missing",
    }),

    defineField({
      name: 'uiVariants',
      title: 'UI Variants',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: ['toast', 'inbox', 'banner', 'modal'],
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'toast',
      title: 'Toast Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'autoDismissSeconds',
          title: 'Auto Dismiss After (seconds)',
          type: 'number',
          validation: (Rule) => Rule.min(1).max(30),
          initialValue: 5,
        }),
        defineField({
          name: 'isClosable',
          title: 'Is Closable',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),

    defineField({
      name: 'inbox',
      title: 'Inbox / Notification Center Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'persistToInbox',
          title: 'Persist to Inbox (Override)',
          type: 'boolean',
          description:
            'If checked → always save to Notification Center. If unchecked and left empty → will use defaultPersistToInbox from category config',
        }),

        defineField({
          name: 'expiresInHours',
          title: 'Expires In Hours (Optional)',
          type: 'number',
          description:
            'How long this notification stays in inbox (overrides category defaultTTLHours if set)',
        }),
      ],
    }),

    // E. Action / Deep-linking
    defineField({
      name: 'action',
      title: 'Action / Deep Linking',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'actionType',
          title: 'Action Type',
          type: 'string',
          options: {
            list: ['navigate', 'openModal', 'none'],
            aiAssist: {exclude: true},
          },
          initialValue: 'navigate',
        }),

        defineField({
          name: 'ctaLabel',
          title: 'CTA Button Label (Localized)',
          type: 'string',
        }),

        defineField({
          name: 'deeplink',
          title: 'Deeplink url (Override)',
          type: 'string',
          options: {aiAssist: {exclude: true}},
          description:
            'Examples: /wallet/transactions, /responsible-gaming/deposit-limits, /profile/security',
        }),

        defineField({
          name: 'deeplinkParamsSchema',
          title: 'Required Deeplink Parameters (JSON Schema)',
          type: 'text',
          options: {aiAssist: {exclude: true}},
          description: 'Optional JSON schema, example: {"txId": "string", "limitId": "string"}',
        }),
      ],
    }),

    // F. Channels & Preferences
    defineField({
      name: 'channels',
      title: 'Channels (Override)',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: ['inApp', 'email', 'push', 'sms'],
        aiAssist: {exclude: true},
      },
      description:
        'If empty → will use defaultChannels from category config. inApp is always strongly recommended.',
    }),

    defineField({
      name: 'requiresMarketingOptIn',
      title: 'Requires Marketing Opt-In',
      type: 'boolean',
      description:
        "For marketing/promotion templates – should respect user's marketing opt-in preference?",
      initialValue: false,
    }),

    defineField({
      name: 'suppressWhenSelfExcluded',
      title: 'Suppress When User is Self-Excluded',
      type: 'boolean',
      initialValue: false,
      description:
        'If true, this notification will NOT be sent when user is in self-exclusion period',
    }),

    // G. Anti-Spam / Deduplication
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'throttleSeconds',
      title: 'Throttle (Minimum seconds between same notifications)',
      type: 'number',
      description: 'Prevent spamming same notification too frequently',
    }),

    defineField({
      name: 'dedupeStrategy',
      title: 'Deduplication Strategy',
      type: 'string',
      options: {
        list: ['none', 'byEntity', 'byKeyAndStatus'],
        aiAssist: {exclude: true},
      },
      initialValue: 'none',
    }),

    defineField({
      name: 'dedupeKeyTemplate',
      title: 'Deduplication Key Template',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      description:
        'Example: "{key}:{userId}:{entityType}:{entityId}:{status}" – used when dedupeStrategy is not none',
    }),

    // H. Placeholders (Mandatory for dynamic content)
    defineField({
      name: 'placeholders',
      title: 'Placeholders (Dynamic Variables)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'placeholder',
          title: 'Placeholder',
          fields: [
            defineField({
              name: 'name',
              title: 'Placeholder Name',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: ['string', 'number', 'currency', 'datetime', 'status'],
                aiAssist: {exclude: true},
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'required',
              title: 'Required by Backend',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'format',
              title: 'Format (optional)',
              type: 'string',
              options: {aiAssist: {exclude: true}},
              description: 'Examples: "currency:2", "date:DD.MM.YYYY HH:mm"',
            }),
            defineField({
              name: 'example',
              title: 'Example Value',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              type: 'type',
              required: 'required',
              format: 'format',
              example: 'example',
            },
            prepare({title, type, required, format, example}: any) {
              const parts = []
              if (type) parts.push(`📦 ${type}`)
              if (format) parts.push(`🎨 ${format}`)
              if (example) parts.push(`e.g. ${example}`)
              parts.push(required ? '✅ Required' : '⚪ Optional')

              return {
                title: title ? `{{${title}}}` : 'Unnamed placeholder',
                subtitle: parts.join(' • '),
              }
            },
          },
        },
      ],
      description:
        'Define all dynamic variables that backend must provide. Example for deposit limit: limitAmount, currency, period, effectiveAt, cooldownEndsAt',
    }),
  ],

  preview: {
    select: {
      key: 'key',
      category: 'category',
      status: 'status',
      language: 'language',
      severity: 'severity',
      messageType: 'messageType',
      enabled: 'enabled',
      translationGroup: 'translationGroup.current',
    },
    prepare({
      key,
      category,
      status,
      language,
      severity,
      messageType,
      enabled,
      translationGroup,
    }: any) {
      const statusEmoji = status === 'active' ? '🟢' : status === 'deprecated' ? '🔴' : '🟡'
      const severityEmoji =
        severity === 'error'
          ? '🚨'
          : severity === 'warning'
            ? '⚠️'
            : severity === 'success'
              ? '✅'
              : 'ℹ️'

      const langFlag: Record<string, string> = {
        en: '🇬🇧',
        tr: '🇹🇷',
        de: '🇩🇪',
        es: '🇪🇸',
        fr: '🇫🇷',
        pt: '🇵🇹',
        ru: '🇷🇺',
        ar: '🇸🇦',
        hi: '🇮🇳',
        zh: '🇨🇳',
      }

      return {
        // Group key first so same templates sort together alphabetically
        title: `(${langFlag[language] || language?.toUpperCase() || ''}) • ${translationGroup || key || 'No Key'}`,
        subtitle: `${statusEmoji} ${status} • ${category || 'No category'} • ${severityEmoji} ${severity} • ${enabled ? '✅' : '🚫'}`,
      }
    },
  },
})
