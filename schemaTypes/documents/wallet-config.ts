// sanity/schemas/wallet/walletConfig.ts
import {defineField, defineType} from 'sanity'

// Main Wallet Config Document
export const walletConfig = defineType({
  name: 'walletConfig',
  title: 'Wallet Modal Configuration',
  type: 'document',
  groups: [
    {name: 'general', title: 'General'},
    {name: 'tabs', title: 'Tabs & Payment Methods'},
  ],
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      initialValue: 'en',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Modal Thumbnail (Cloudinary Public ID)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      description: 'Used when no method is selected (desktop view)',
      group: 'general',
    }),

    defineField({
      name: 'countries',
      title: 'Available Countries',
      type: 'array',
      of: [{type: 'country'}],
      group: 'general',
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'currencies',
      title: 'Available Currencies',
      type: 'array',
      of: [{type: 'currency'}],
      group: 'general',
    }),

    defineField({
      name: 'tabs',
      title: 'Wallet Tabs',
      type: 'array',
      group: 'tabs',
      of: [{type: 'walletTab'}],
    }),
  ],

  preview: {
    select: {
      language: 'language',
      tabs: 'tabs',
      countries: 'countries',
      currencies: 'currencies',
    },
    prepare({language, tabs, countries, currencies}: any) {
      const tabCount = Array.isArray(tabs) ? tabs.length : 0
      const countryCount = Array.isArray(countries) ? countries.length : 0
      const currencyCount = Array.isArray(currencies) ? currencies.length : 0
      return {
        title: 'Wallet Modal Configuration',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${tabCount} tabs • ${countryCount} countries • ${currencyCount} currencies`,
      }
    },
  },
})

// === SUPPORTING TYPES - ALL EXPORTED ===

export const country = defineType({
  name: 'country',
  title: 'Country',
  type: 'object',
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',

      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {code: 'code', label: 'label'},
    prepare({code, label}: any) {
      return {
        title: `${code || 'No code'} — ${label || 'No label'}`,
      }
    },
  },
})

export const currency = defineType({
  name: 'currency',
  title: 'Currency',
  type: 'object',
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',

      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pricePerUsd',
      title: 'Price per USD',
      type: 'number',
    }),
    defineField({name: 'serviceFee', title: 'Service Fee', type: 'number'}),
    defineField({
      name: 'flag',
      title: 'Flag Code (lowercase)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      description: "e.g. 'bd', 'us', 'eu'",
    }),
  ],
  preview: {
    select: {code: 'code', label: 'label', pricePerUsd: 'pricePerUsd', flag: 'flag'},
    prepare({code, label, pricePerUsd, flag}: any) {
      return {
        title: `${code || 'No code'} — ${label || 'No label'}`,
        subtitle:
          `${flag ? `🏳️ ${flag}` : ''} ${pricePerUsd ? `• $${pricePerUsd} per USD` : ''}`.trim(),
      }
    },
  },
})

export const walletTab = defineType({
  name: 'walletTab',
  title: 'Wallet Tab',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Tab Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL param)',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {source: 'name', aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'contentType',
      title: 'Tab Content Type',
      type: 'string',
      initialValue: 'paymentMethods', // 👈 IMPORTANT (backward compatibility)
      options: {
        layout: 'radio',
        list: [
          {title: 'Payment Methods', value: 'paymentMethods'},
          {title: 'Left Panel Configuration', value: 'leftPanel'},
        ],
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'paymentGroups',
      title: 'Payment Method Groups',
      type: 'array',
      of: [{type: 'paymentGroup'}],
      hidden: ({parent}) => parent?.contentType !== 'paymentMethods',
    }),
    defineField({
      name: 'leftPanelData',
      title: 'Left Panel Configuration',
      type: 'leftPanelConfig',
      hidden: ({parent}) => parent?.contentType !== 'leftPanel',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      slug: 'slug',
      contentType: 'contentType',
      paymentGroups: 'paymentGroups',
    },
    prepare({name, slug, contentType, paymentGroups}: any) {
      const groupCount = Array.isArray(paymentGroups) ? paymentGroups.length : 0
      return {
        title: name || 'Unnamed Tab',
        subtitle: `${slug?.current ? `/${slug.current}` : 'No slug'} • ${contentType === 'paymentMethods' ? `💳 Payment Methods (${groupCount} groups)` : '📋 Left Panel Config'}`,
      }
    },
  },
})

export const paymentGroup = defineType({
  name: 'paymentGroup',
  title: 'Payment Group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Group Title',
      type: 'string',
    }),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {aiAssist: {exclude: true}}}),
    defineField({name: 'badge', title: 'Badge Text', type: 'string'}),
    defineField({
      name: 'countryDropdown',
      title: 'Show Country Dropdown?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'methods',
      title: 'Payment Methods',
      type: 'array',
      of: [{type: 'paymentMethod'}],
    }),
    defineField({
      name: 'helpCards',
      title: 'Help Cards (for Exchanges & Wallets)',
      type: 'array',
      of: [{type: 'helpCard'}],
      hidden: ({parent}) => (parent as any)?.slug?.current !== 'exchanges-wallets',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      badge: 'badge',
      methods: 'methods',
      countryDropdown: 'countryDropdown',
    },
    prepare({title, slug, badge, methods, countryDropdown}: any) {
      const methodCount = Array.isArray(methods) ? methods.length : 0
      const parts = []
      if (slug?.current) parts.push(`/${slug.current}`)
      if (badge) parts.push(`🏷️ ${badge}`)
      parts.push(`💳 ${methodCount} method${methodCount !== 1 ? 's' : ''}`)
      if (countryDropdown) parts.push('🌍 Country filter')
      return {
        title: title || 'Unnamed Group',
        subtitle: parts.join(' • '),
      }
    },
  },
})

export const paymentMethod = defineType({
  name: 'paymentMethod',
  title: 'Payment Method',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      // validation: (Rule) => Rule.required(),
      options: {source: 'name'},
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Bank Transfer', value: '/icons/bank-transfer.png'},
          {title: 'Binance', value: '/icons/binance-svg.svg'},
          {title: 'Other', value: '/icons/others-svg.svg'},
          {title: 'Bitcoin', value: '/icons/bit-coin-svg.svg'},
          {title: 'Coinbase', value: '/icons/coinbase-svg.svg'},
          {title: 'Dogecoin', value: '/icons/dogecoin-doge-logo.svg'},
          {title: 'Ethereum', value: '/icons/ethereum-svg.svg'},
          {title: 'Google Pay', value: '/icons/g-pay-svg.svg'},
          {title: 'Havale', value: '/icons/havale.png'},
          {title: 'Litecoin', value: '/icons/litecoin-ltc-logo.svg'},
          {title: 'MasterCard', value: '/icons/master-card-svg.svg'},
          {title: 'Neteller', value: '/icons/neteller-svg.svg'},
          {
            title: 'Other Exchanges/Wallets',
            value: '/icons/others-svg.svg',
          },
          {title: 'PayPal', value: '/icons/paypal-svg.svg'},
          {title: 'Paysafecard', value: '/icons/paysafecard-svg.svg'},
          {title: 'Pioneer', value: '/icons/pioneer-svg.svg'},
          {title: 'Ripple (XRP)', value: '/icons/ripple-svg.svg'},
          {title: 'Solana', value: '/icons/solana-sol-logo.svg'},
          {title: 'Swapbed', value: '/icons/swapbed.png'},
          {
            title: 'Tether (USDT)',
            value: '/icons/tether-usdt-logo.svg',
          },
          {title: 'Tron (TRX)', value: '/icons/tron-trx-logo.svg'},
          {title: 'Trust Wallet', value: '/icons/trustlt-svg.svg'},
          {title: 'MetaMask', value: '/icons/metamask-svg.svg'},
          {title: 'Turkey Flag', value: '/icons/turkey-flag.svg'},
          {title: 'USD Coin', value: '/icons/usd-coin-usdc-logo.svg'},
          {title: 'USDT SVG', value: '/icons/usdt-svg.svg'},
          {title: 'Vault', value: '/icons/vault.png'},
          {title: 'Visa Card', value: '/icons/visa-card-svg.svg'},
          {title: 'Visa Card (alt)', value: '/icons/visa-card.svg'},
          {title: 'BKash', value: '/icons/bkash-svg.svg'},
        ],
        layout: 'dropdown',
        aiAssist: {exclude: true},
      },
      // validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'symbol', title: 'Symbol (e.g. BTC)', type: 'string'}),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['crypto', 'exchange', 'wallet', 'bank', 'card'],
        aiAssist: {exclude: true},
      },
      initialValue: 'crypto',
    }),
    defineField({
      name: 'tabType',
      title: 'Tab Type',
      type: 'string',
      options: {list: ['deposit', 'withdraw', 'buy-crypto', 'vault'], aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'allowedCountries',
      title: 'Allowed Countries (empty = all)',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'leftPanelData',
      title: 'Left Panel Configuration',
      type: 'leftPanelConfig',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      type: 'type',
      tabType: 'tabType',
      badge: 'badge',
      symbol: 'symbol',
      allowedCountries: 'allowedCountries',
    },
    prepare({name, type, tabType, badge, symbol, allowedCountries}: any) {
      const parts = []
      if (type) parts.push(`📦 ${type}`)
      if (tabType) parts.push(`🔖 ${tabType}`)
      if (symbol) parts.push(`💱 ${symbol}`)
      if (badge) parts.push(`🏷️ ${badge}`)
      if (Array.isArray(allowedCountries) && allowedCountries.length > 0) {
        parts.push(`🌍 ${allowedCountries.join(', ')}`)
      } else {
        parts.push('🌍 All countries')
      }
      return {
        title: name || 'Unnamed Method',
        subtitle: parts.join(' • '),
      }
    },
  },
})
export const leftPanelHelps = defineType({
  name: 'leftPanelHelps',
  title: 'Help Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Help Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'helpCards',
      title: 'Help Cards',
      type: 'array',
      of: [{type: 'helpCard'}],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'title', helpCards: 'helpCards'},
    prepare({title, helpCards}: any) {
      const cardCount = Array.isArray(helpCards) ? helpCards.length : 0
      return {
        title: title || 'Help Section',
        subtitle: `${cardCount} help card${cardCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
export const leftPanelConfig = defineType({
  name: 'leftPanelConfig',
  title: 'Left Panel Configuration',
  type: 'object',
  fields: [
    defineField({
      name: 'thirdParty',
      title: 'Third Party Redirect?',
      type: 'boolean',
    }),
    defineField({name: 'hasQr', title: 'Show QR Code?', type: 'boolean'}),
    defineField({
      name: 'sampleAddress',
      title: 'Sample Deposit Address',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'addressField',
      title: 'Show Address Input (Withdraw)?',
      type: 'boolean',
    }),
    defineField({
      name: 'importantText',
      title: 'Important Text',
      type: 'string',
    }),
    defineField({
      name: 'networkText',
      title: 'Network Label',
      type: 'string',
    }),
    defineField({
      name: 'transactionSpeedText',
      title: 'Transaction Speed Label',
      type: 'string',
    }),
    defineField({
      name: 'toolTipText',
      title: 'Tooltip Text',
      type: 'string',
    }),
    defineField({name: 'minUsd', title: 'Min USD', type: 'number'}),
    defineField({name: 'minCrypto', title: 'Min Crypto', type: 'number'}),
    defineField({
      name: 'pricePerUsd',
      title: 'Price per USD',
      type: 'number',
    }),
    defineField({name: 'maxUsd', title: 'Max USD', type: 'number'}),

    // === NEW: Crypto Calculator Labels ===
    defineField({
      name: 'usdText',
      title: 'USD Input Label',
      type: 'string',

      description: "Label above USD input in calculator (e.g. 'Deposit Value in USD')",
    }),
    defineField({
      name: 'cryptoText',
      title: 'Crypto Input Label',
      type: 'string',

      description: "Label above crypto input in calculator (e.g. 'Deposit Value in BTC')",
    }),
    defineField({
      name: 'minimumWithdrawText',
      title: 'Minimum Withdraw Text',
      type: 'string',

      description: "Text like 'The minimum withdrawal is...' shown in withdraw flow",
    }),

    defineField({
      name: 'networks',
      title: 'Networks',
      type: 'array',
      of: [{type: 'networkOption'}],
    }),
    defineField({name: 'auth', title: 'Enable Auth Flow?', type: 'boolean'}),
    defineField({
      name: 'currencyDropdown',
      title: 'Show Currency Dropdown?',
      type: 'boolean',
    }),
    defineField({name: 'loginField', title: 'Login Form', type: 'authForm'}),
    defineField({
      name: 'registerField',
      title: 'Register Form',
      type: 'authForm',
    }),
    defineField({
      name: 'guestRegisterField',
      title: 'Guest Form',
      type: 'authForm',
    }),
    defineField({
      name: 'loggedInArea',
      title: 'Logged In Area',
      type: 'giftCardFlow',
    }),
    defineField({
      name: 'swappedId',
      title: 'Swapped Wallet ID',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Support Link',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'exchangesCrypto',
      title: 'Crypto Options',
      type: 'array',
      of: [{type: 'cryptoOption'}],
    }),
    defineField({
      name: 'presetAmountUsd',
      title: 'Preset USD Amounts',
      type: 'array',
      of: [{type: 'presetAmount'}],
    }),
    defineField({
      name: 'exchangesOrWalletData',
      title: 'Nested Exchanges/Wallets',
      type: 'nestedExchangeWallet',
    }),
    defineField({
      name: 'vaultTabs',
      title: 'Vault Tabs',
      type: 'array',
      of: [{type: 'vaultTab'}],
    }),
    defineField({
      name: 'helps',
      title: 'Help Section',
      type: 'leftPanelHelps',
    }),

    // === NEW: Wallet Login Flow (Desktop / QR Tabs) ===
    defineField({
      name: 'itemTabs',
      title: 'Login Method Tabs (Desktop / QR)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Tab Name',
              type: 'string',
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {source: 'name', aiAssist: {exclude: true}},
            }),
            defineField({
              name: 'text',
              title: 'Description Text',
              type: 'string',
            }),
            defineField({
              name: 'desktopIcon',
              title: 'Show Desktop Icon?',
              type: 'boolean',
            }),
            defineField({
              name: 'address',
              title: 'QR Code Address',
              type: 'string',
              options: {aiAssist: {exclude: true}},
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              options: {aiAssist: {exclude: true}},
            }),
          ],
          preview: {
            select: {name: 'name'},
            prepare: ({name}) => ({
              title: name[0] || 'Tab',
            }),
          },
        },
      ],
      description: "Used in 'Other Exchanges/Wallets' → shows Desktop or QR login options",
    }),
  ],
  preview: {
    select: {
      thirdParty: 'thirdParty',
      auth: 'auth',
      hasQr: 'hasQr',
      networks: 'networks',
      vaultTabs: 'vaultTabs',
      exchangesCrypto: 'exchangesCrypto',
    },
    prepare({thirdParty, auth, hasQr, networks, vaultTabs, exchangesCrypto}: any) {
      const parts = []
      if (thirdParty) parts.push('🔗 Third party')
      if (auth) parts.push('🔒 Auth flow')
      if (hasQr) parts.push('📱 QR')
      const networkCount = Array.isArray(networks) ? networks.length : 0
      if (networkCount > 0) parts.push(`🌐 ${networkCount} network${networkCount !== 1 ? 's' : ''}`)
      const vaultCount = Array.isArray(vaultTabs) ? vaultTabs.length : 0
      if (vaultCount > 0) parts.push(`🏦 ${vaultCount} vault tab${vaultCount !== 1 ? 's' : ''}`)
      const cryptoCount = Array.isArray(exchangesCrypto) ? exchangesCrypto.length : 0
      if (cryptoCount > 0) parts.push(`💱 ${cryptoCount} crypto`)
      return {
        title: 'Left Panel Config',
        subtitle: parts.length ? parts.join(' • ') : 'No special config',
      }
    },
  },
})

export const networkOption = defineType({
  name: 'networkOption',
  title: 'Network Option',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {aiAssist: {exclude: true}}}),
    defineField({
      name: 'symbol',
      title: 'Symbol',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({name: 'hasQr', title: 'Show QR?', type: 'boolean'}),
    defineField({
      name: 'sampleAddress',
      title: 'Sample Address',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'networkFee',
      title: 'Base Network Fee (USD)',
      type: 'number',
    }),
    defineField({
      name: 'transactionSpeedTabs',
      title: 'Transaction Speed Options',
      type: 'array',
      of: [{type: 'speedTab'}],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      symbol: 'symbol',
      hasQr: 'hasQr',
      networkFee: 'networkFee',
      transactionSpeedTabs: 'transactionSpeedTabs',
    },
    prepare({name, symbol, hasQr, networkFee, transactionSpeedTabs}: any) {
      const speedCount = Array.isArray(transactionSpeedTabs) ? transactionSpeedTabs.length : 0
      const parts = []
      if (symbol) parts.push(`💱 ${symbol}`)
      if (networkFee) parts.push(`💸 $${networkFee} fee`)
      if (hasQr) parts.push('📱 QR')
      if (speedCount > 0) parts.push(`⚡ ${speedCount} speed option${speedCount !== 1 ? 's' : ''}`)
      return {
        title: name || 'Unnamed Network',
        subtitle: parts.length ? parts.join(' • ') : 'No details',
      }
    },
  },
})

export const speedTab = defineType({
  name: 'speedTab',
  title: 'Speed Tab',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {aiAssist: {exclude: true}}}),
    defineField({
      name: 'networkFee',
      title: 'Fee (USD)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {name: 'name', networkFee: 'networkFee', slug: 'slug'},
    prepare({name, networkFee, slug}: any) {
      return {
        title: name || 'Unnamed Speed',
        subtitle: `${slug?.current ? `/${slug.current}` : 'No slug'} • 💸 $${networkFee ?? '—'} fee`,
      }
    },
  },
})

export const helpCard = defineType({
  name: 'helpCard',
  title: 'Help Card',
  type: 'object',
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link URL',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'email',
      title: 'Email (alternative)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
  ],
  preview: {
    select: {header: 'header', text: 'text', link: 'link', email: 'email'},
    prepare({header, text, link, email}: any) {
      const parts = []
      if (text) parts.push(text.length > 40 ? text.slice(0, 37) + '...' : text)
      if (link) parts.push(`🔗 ${link}`)
      if (email) parts.push(`📧 ${email}`)
      return {
        title: header || 'No header',
        subtitle: parts.length ? parts.join(' • ') : 'No details',
      }
    },
  },
})

export const authForm = defineType({
  name: 'authForm',
  title: 'Auth Form Config',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subTitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({name: 'email', title: 'Email Field', type: 'formField'}),
    defineField({
      name: 'RepeatEmail',
      title: 'Repeat Email',
      type: 'formField',
    }),
    defineField({
      name: 'password',
      title: 'Password Field',
      type: 'formField',
    }),
    defineField({
      name: 'confirmPassword',
      title: 'Confirm Password',
      type: 'formField',
    }),
    defineField({
      name: 'cloudflare',
      title: 'Show Cloudflare?',
      type: 'boolean',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button',
      type: 'string',
    }),
    defineField({
      name: 'guestButtonText',
      title: 'Guest Button',
      type: 'string',
    }),
    defineField({
      name: 'CreateAccountText',
      title: 'Create Account Text',
      type: 'string',
    }),
    defineField({
      name: 'loginWithAccountText',
      title: 'Login Text',
      type: 'string',
    }),
    defineField({
      name: 'alreadyAccountText',
      title: 'Already Have Account Text',
      type: 'string',
    }),
    defineField({name: 'checkBox', title: 'Show Checkbox?', type: 'boolean'}),
    defineField({
      name: 'checkBoxText',
      title: 'Checkbox Text',
      type: 'string',
    }),
    defineField({
      name: 'termsAndConditionsUrl',
      title: 'T&C URL',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'privacyAndPolicyUrl',
      title: 'Privacy URL',
      type: 'string',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'cardList',
      title: 'Disabled Cards List (Guest)',
      type: 'array',
      of: [{type: 'string'}],
      description:
        'List of card/payment method names that are disabled in guest mode (e.g. PayPal, Visa/Mastercard, Google Pay)',
    }),
    defineField({name: 'emailText', title: 'Email Info Text', type: 'text'}),
  ],
  preview: {
    select: {title: 'title', checkBox: 'checkBox', cloudflare: 'cloudflare', cardList: 'cardList'},
    prepare({title, checkBox, cloudflare, cardList}: any) {
      const parts = []
      if (cloudflare) parts.push('☁️ Cloudflare')
      if (checkBox) parts.push('☑️ Checkbox')
      if (Array.isArray(cardList) && cardList.length > 0)
        parts.push(`🚫 ${cardList.length} disabled cards`)
      return {
        title: title || 'Unnamed Auth Form',
        subtitle: parts.length ? parts.join(' • ') : 'No special config',
      }
    },
  },
})

export const formField = defineType({
  name: 'formField',
  title: 'Form Field',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'title', placeholder: 'placeholder'},
    prepare({title, placeholder}: any) {
      return {
        title: title || 'Unnamed Field',
        subtitle: placeholder ? `Placeholder: ${placeholder}` : 'No placeholder',
      }
    },
  },
})

export const giftCardFlow = defineType({
  name: 'giftCardFlow',
  title: 'Gift Card Flow',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Selection Screen Title',
      type: 'string',
    }),
    defineField({
      name: 'giftCards',
      title: 'Gift Card Amounts (USD)',
      type: 'array',
      of: [{type: 'number'}],
    }),
    // === Checkout / Summary Step ===
    defineField({
      name: 'summaryTitle',
      title: 'Summary Title',
      type: 'string',
    }),
    defineField({
      name: 'showCheckBox',
      title: 'Show Acceptance Checkbox?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'checkBoxText',
      title: 'Checkbox Text',
      type: 'string',
      hidden: ({parent}) => !parent?.showCheckBox,
    }),
    defineField({
      name: 'termsAndConditionsUrl',
      title: 'Terms & Conditions URL',
      type: 'url',
      options: {aiAssist: {exclude: true}},
      hidden: ({parent}) => !parent?.showCheckBox,
    }),
    defineField({
      name: 'privacyAndPolicyUrl',
      title: 'Privacy Policy URL',
      type: 'url',
      options: {aiAssist: {exclude: true}},
      hidden: ({parent}) => !parent?.showCheckBox,
    }),
    defineField({
      name: 'refundPolicyUrl',
      title: 'Refund Policy URL (optional)',
      type: 'url',
      options: {aiAssist: {exclude: true}},
      hidden: ({parent}) => !parent?.showCheckBox,
    }),
    defineField({
      name: 'paymentCards',
      title: 'Payment Method Cards (Visual Only)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Bank Transfer', value: '/icons/bank-transfer.png'},
                  {title: 'Binance', value: '/icons/binance-svg.svg'},
                  {title: 'Other', value: '/icons/others-svg.svg'},
                  {title: 'Bitcoin', value: '/icons/bit-coin-svg.svg'},
                  {title: 'Coinbase', value: '/icons/coinbase-svg.svg'},
                  {title: 'Dogecoin', value: '/icons/dogecoin-doge-logo.svg'},
                  {title: 'Ethereum', value: '/icons/ethereum-svg.svg'},
                  {title: 'Google Pay', value: '/icons/g-pay-svg.svg'},
                  {title: 'Havale', value: '/icons/havale.png'},
                  {title: 'Litecoin', value: '/icons/litecoin-ltc-logo.svg'},
                  {title: 'MasterCard', value: '/icons/master-card-svg.svg'},
                  {title: 'Neteller', value: '/icons/neteller-svg.svg'},
                  {
                    title: 'Other Exchanges/Wallets',
                    value: '/icons/others-svg.svg',
                  },
                  {title: 'PayPal', value: '/icons/paypal-svg.svg'},
                  {title: 'Paysafecard', value: '/icons/paysafecard-svg.svg'},
                  {title: 'Pioneer', value: '/icons/pioneer-svg.svg'},
                  {title: 'Ripple (XRP)', value: '/icons/ripple-svg.svg'},
                  {title: 'Solana', value: '/icons/solana-sol-logo.svg'},
                  {title: 'Swapbed', value: '/icons/swapbed.png'},
                  {
                    title: 'Tether (USDT)',
                    value: '/icons/tether-usdt-logo.svg',
                  },
                  {title: 'Tron (TRX)', value: '/icons/tron-trx-logo.svg'},
                  {title: 'Trust Wallet', value: '/icons/trust-svg.svg'},
                  {title: 'Turkey Flag', value: '/icons/turkey-flag.svg'},
                  {title: 'USD Coin', value: '/icons/usd-coin-usdc-logo.svg'},
                  {title: 'USDT SVG', value: '/icons/usdt-svg.svg'},
                  {title: 'Vault', value: '/icons/vault.png'},
                  {title: 'Visa Card', value: '/icons/visa-card-svg.svg'},
                  {title: 'Visa Card (alt)', value: '/icons/visa-card.svg'},
                ],
                layout: 'dropdown',
                aiAssist: {exclude: true},
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link URL',
              type: 'url',
              options: {aiAssist: {exclude: true}},
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https'],
                }),
            }),
            defineField({
              name: 'allowedCountries',
              title: 'Allowed Countries (empty = all)',
              type: 'array',
              of: [{type: 'string'}],
              description:
                'Leave empty to show in all countries. Add country codes (e.g. BD, IN) to restrict.',
            }),
          ],
          preview: {
            select: {
              name: 'name',
              icon: 'icon',
              countries: 'allowedCountries',
            },
            prepare({name, icon, countries}) {
              const countryText =
                countries && countries.length > 0 ? ` (${countries.join(', ')})` : ' (All)'
              return {
                title: `${name || 'Card'}${countryText}`,
              }
            },
          },
        },
      ],
      description:
        'Visual payment method cards shown in gift card checkout summary. Not functional — for display only.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      giftCards: 'giftCards',
      showCheckBox: 'showCheckBox',
      paymentCards: 'paymentCards',
    },
    prepare({title, giftCards, showCheckBox, paymentCards}: any) {
      const cardCount = Array.isArray(giftCards) ? giftCards.length : 0
      const paymentCount = Array.isArray(paymentCards) ? paymentCards.length : 0
      const parts = []
      if (cardCount > 0) parts.push(`🎁 ${cardCount} amounts`)
      if (paymentCount > 0) parts.push(`💳 ${paymentCount} payment cards`)
      if (showCheckBox) parts.push('☑️ Checkbox')
      return {
        title: title || 'Gift Card Flow',
        subtitle: parts.length ? parts.join(' • ') : 'No details',
      }
    },
  },
})

export const cryptoOption = defineType({
  name: 'cryptoOption',
  title: 'Crypto Option',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({name: 'symbol', title: 'Symbol', type: 'string'}),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Bank Transfer', value: '/icons/bank-transfer.png'},
          {title: 'Binance', value: '/icons/binance-svg.svg'},
          {title: 'Other', value: '/icons/others-svg.svg'},
          {title: 'Bitcoin', value: '/icons/bit-coin-svg.svg'},
          {title: 'Coinbase', value: '/icons/coinbase-svg.svg'},
          {title: 'Dogecoin', value: '/icons/dogecoin-doge-logo.svg'},
          {title: 'Ethereum', value: '/icons/ethereum-svg.svg'},
          {title: 'Google Pay', value: '/icons/g-pay-svg.svg'},
          {title: 'Havale', value: '/icons/havale.png'},
          {title: 'Litecoin', value: '/icons/litecoin-ltc-logo.svg'},
          {title: 'MasterCard', value: '/icons/master-card-svg.svg'},
          {title: 'Neteller', value: '/icons/neteller-svg.svg'},
          {
            title: 'Other Exchanges/Wallets',
            value: '/icons/others-svg.svg',
          },
          {title: 'PayPal', value: '/icons/paypal-svg.svg'},
          {title: 'Paysafecard', value: '/icons/paysafecard-svg.svg'},
          {title: 'Pioneer', value: '/icons/pioneer-svg.svg'},
          {title: 'Ripple (XRP)', value: '/icons/ripple-svg.svg'},
          {title: 'Solana', value: '/icons/solana-sol-logo.svg'},
          {title: 'Swapbed', value: '/icons/swapbed.png'},
          {
            title: 'Tether (USDT)',
            value: '/icons/tether-usdt-logo.svg',
          },
          {title: 'Tron (TRX)', value: '/icons/tron-trx-logo.svg'},
          {title: 'Trust Wallet', value: '/icons/trust-svg.svg'},
          {title: 'Turkey Flag', value: '/icons/turkey-flag.svg'},
          {title: 'USD Coin', value: '/icons/usd-coin-usdc-logo.svg'},
          {title: 'USDT SVG', value: '/icons/usdt-svg.svg'},
          {title: 'Vault', value: '/icons/vault.png'},
          {title: 'Visa Card', value: '/icons/visa-card-svg.svg'},
          {title: 'Visa Card (alt)', value: '/icons/visa-card.svg'},
        ],
        layout: 'dropdown',
        aiAssist: {exclude: true},
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'minUsd', title: 'Min USD', type: 'number'}),
    defineField({name: 'minCrypto', title: 'Min Crypto', type: 'number'}),
    defineField({
      name: 'pricePerUsd',
      title: 'Price per USD',
      type: 'number',
    }),
  ],
  preview: {
    select: {name: 'name', symbol: 'symbol', minUsd: 'minUsd', pricePerUsd: 'pricePerUsd'},
    prepare({name, symbol, minUsd, pricePerUsd}: any) {
      const parts = []
      if (symbol) parts.push(`💱 ${symbol}`)
      if (minUsd) parts.push(`Min: $${minUsd}`)
      if (pricePerUsd) parts.push(`$${pricePerUsd}/USD`)
      return {
        title: name || 'Unnamed Crypto',
        subtitle: parts.length ? parts.join(' • ') : 'No details',
      }
    },
  },
})

export const presetAmount = defineType({
  name: 'presetAmount',
  title: 'Preset Amount',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({name: 'value', title: 'Value', type: 'number'}),
  ],
  preview: {
    select: {label: 'label', value: 'value'},
    prepare({label, value}: any) {
      return {
        title: label || `$${value || '?'}`,
        subtitle: value != null ? `Value: $${value}` : 'No value set',
      }
    },
  },
})

export const nestedExchangeWallet = defineType({
  name: 'nestedExchangeWallet',
  title: 'Nested Exchanges/Wallets',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({name: 'searchBar', title: 'Show Search?', type: 'boolean'}),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder',
      type: 'string',
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [{type: 'nestedTab'}],
    }),
  ],
  preview: {
    select: {title: 'title', searchBar: 'searchBar', tabs: 'tabs'},
    prepare({title, searchBar, tabs}: any) {
      const tabCount = Array.isArray(tabs) ? tabs.length : 0
      return {
        title: title || 'Unnamed Exchange/Wallet',
        subtitle: `${tabCount} tab${tabCount !== 1 ? 's' : ''} ${searchBar ? '• 🔍 Search enabled' : ''}`,
      }
    },
  },
})

// export const nestedTab = defineType({
//   name: 'nestedTab',
//   title: 'Nested Tab',
//   type: 'object',
//   fields: [
//     defineField({
//       name: 'name',
//       title: 'Name',
//       type: 'string',
//     }),
//     defineField({name: 'slug', title: 'Slug', type: 'slug'}),
//     defineField({
//       name: 'items',
//       title: 'Items',
//       type: 'array',
//       of: [{type: 'paymentMethod'}],
//     }),
//   ],
//   preview: {
//     select: {name: 'name', slug: 'slug', items: 'items'},
//     prepare({name, slug, items}: any) {
//       const itemCount = Array.isArray(items) ? items.length : 0
//       return {
//         title: name || 'Unnamed Tab',
//         subtitle: `${slug?.current ? `/${slug.current}` : 'No slug'} • 💳 ${itemCount} item${itemCount !== 1 ? 's' : ''}`,
//       }
//     },
//   },
// })
// ✅ Use this version — uncomment it and delete the current nestedTab
export const nestedTab = defineType({
  name: 'nestedTab',
  title: 'Nested Tab',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug'}),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'nestedMethodItem',
          title: 'Method Item',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {source: 'name', aiAssist: {exclude: true}},
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Bank Transfer', value: '/icons/bank-transfer.png'},
                  {title: 'Binance', value: '/icons/binance-svg.svg'},
                  {title: 'Other', value: '/icons/others-svg.svg'},
                  {title: 'Bitcoin', value: '/icons/bit-coin-svg.svg'},
                  {title: 'Coinbase', value: '/icons/coinbase-svg.svg'},
                  {title: 'Dogecoin', value: '/icons/dogecoin-doge-logo.svg'},
                  {title: 'Ethereum', value: '/icons/ethereum-svg.svg'},
                  {title: 'Google Pay', value: '/icons/g-pay-svg.svg'},
                  {title: 'Havale', value: '/icons/havale.png'},
                  {title: 'Litecoin', value: '/icons/litecoin-ltc-logo.svg'},
                  {title: 'MasterCard', value: '/icons/master-card-svg.svg'},
                  {title: 'Neteller', value: '/icons/neteller-svg.svg'},
                  {title: 'Other Exchanges/Wallets', value: '/icons/others-svg.svg'},
                  {title: 'PayPal', value: '/icons/paypal-svg.svg'},
                  {title: 'Paysafecard', value: '/icons/paysafecard-svg.svg'},
                  {title: 'Pioneer', value: '/icons/pioneer-svg.svg'},
                  {title: 'Ripple (XRP)', value: '/icons/ripple-svg.svg'},
                  {title: 'Solana', value: '/icons/solana-sol-logo.svg'},
                  {title: 'Swapbed', value: '/icons/swapbed.png'},
                  {title: 'Tether (USDT)', value: '/icons/tether-usdt-logo.svg'},
                  {title: 'Tron (TRX)', value: '/icons/tron-trx-logo.svg'},
                  {title: 'Trust Wallet', value: '/icons/trustlt-svg.svg'},
                  {title: 'MetaMask', value: '/icons/metamask-svg.svg'},
                  {title: 'Turkey Flag', value: '/icons/turkey-flag.svg'},
                  {title: 'USD Coin', value: '/icons/usd-coin-usdc-logo.svg'},
                  {title: 'USDT SVG', value: '/icons/usdt-svg.svg'},
                  {title: 'Vault', value: '/icons/vault.png'},
                  {title: 'Visa Card', value: '/icons/visa-card-svg.svg'},
                  {title: 'Visa Card (alt)', value: '/icons/visa-card.svg'},
                  {title: 'BKash', value: '/icons/bkash-svg.svg'},
                ],
                layout: 'dropdown',
                aiAssist: {exclude: true},
              },
            }),
            defineField({name: 'symbol', title: 'Symbol (e.g. BTC)', type: 'string', options: {aiAssist: {exclude: true}}}),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: ['crypto', 'exchange', 'wallet', 'bank', 'card'],
                aiAssist: {exclude: true},
              },
              initialValue: 'crypto',
            }),
            defineField({name: 'badge', title: 'Badge', type: 'string', options: {aiAssist: {exclude: true}}}),
            defineField({
              name: 'allowedCountries',
              title: 'Allowed Countries (empty = all)',
              type: 'array',
              of: [{type: 'string'}],
            }),
            // ✅ NO leftPanelData here — this breaks the circular reference
          ],
          preview: {
            select: {name: 'name', type: 'type', symbol: 'symbol'},
            prepare({name, type, symbol}: any) {
              return {
                title: name || 'Unnamed Item',
                subtitle: [type, symbol].filter(Boolean).join(' • '),
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {name: 'name', slug: 'slug', items: 'items'},
    prepare({name, slug, items}: any) {
      const itemCount = Array.isArray(items) ? items.length : 0
      return {
        title: name || 'Unnamed Tab',
        subtitle: `${slug?.current ? `/${slug.current}` : 'No slug'} • 💳 ${itemCount} item${itemCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
export const vaultTab = defineType({
  name: 'vaultTab',
  title: 'Vault Tab',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({name: 'slug', title: 'Slug', type: 'slug'}),
    defineField({name: 'maxUsd', title: 'Max USD', type: 'number'}),
    defineField({
      name: 'exchangesCrypto',
      title: 'Crypto Options',
      type: 'array',
      of: [{type: 'cryptoOption'}],
    }),
  ],
  preview: {
    select: {name: 'name', slug: 'slug', maxUsd: 'maxUsd', exchangesCrypto: 'exchangesCrypto'},
    prepare({name, slug, maxUsd, exchangesCrypto}: any) {
      const cryptoCount = Array.isArray(exchangesCrypto) ? exchangesCrypto.length : 0
      const parts = []
      if (slug?.current) parts.push(`/${slug.current}`)
      if (maxUsd) parts.push(`Max: $${maxUsd}`)
      if (cryptoCount > 0)
        parts.push(`💱 ${cryptoCount} crypto option${cryptoCount !== 1 ? 's' : ''}`)
      return {
        title: name || 'Unnamed Vault Tab',
        subtitle: parts.length ? parts.join(' • ') : 'No details',
      }
    },
  },
})
