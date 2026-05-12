import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {colorInput} from '@sanity/color-input'
import {assist} from '@sanity/assist'
// import {deskTool} from 'sanity/desk'
import ContentTranslationTool from './tools/content-translation'
import {documentInternationalization} from '@sanity/document-internationalization'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

const allDocumentTypes = schemaTypes
  .filter((type) => type.type === 'document')
  .map((type) => type.name)

const SUPPORTED_LANGUAGES = [
  {id: 'en', title: 'English'},
  {id: 'tr', title: 'Turkish'},
  {id: 'de', title: 'German'},
  {id: 'es', title: 'Spanish'},
  {id: 'fr', title: 'Français'},
  {id: 'pt', title: 'Português (Brasil)'},
  {id: 'ru', title: 'Русский'},
  {id: 'ar', title: 'العربية'},
  {id: 'hi', title: 'हिन्दी'},
  {id: 'zh', title: '中文 (简体)'},
]
const SUPPORTED_SCHEMAS = [
  // 'newBlogs',
  'blogs',
  'footerconfig',
  'ctaButtonConfig',
  'promotion',
  'promotionTabLabels',
  'promotionModal',
  'faqConfig',
  'rgTabLabelItem',
  'rgTabLabels',
  'RgBranchName',
  'RgRecognizeSign',
  'RgGamblingFaqs',
  'RgSelfExclusion',
  'GamblingLimitsContent',
  'DepositLimitsContent',
  'SelfAssessmentContent',
  'SelfAssessmentQuestions',
  'bonusTabLabels',
  'bonuses',
  'bettingCompetition',
  'sidebarMenu',
  'menuItem',
  'notification',
  'notificationTemplates',
  'heroConfig',
  'profile',
  'marquee',
  'jackpotTeaser',
  'sportsLandingConfig',
  'sportsTableData',
  'casinoChallenges',
  'slots',
  'walletConfig',
  // 'casino',
  'lawEnforcement',
  'termsDocument',
  'provablyFair',
  'provablyFairUnhashConfig',
  'provablyFairCalculationConfig',
  'sponsorship',
  'affiliateOverview',
  'affiliateCampaign',
  'affiliateCommission',
  'affiliateReferredUser',
  'affiliateFaqs',
  'kycConfig',
  'settingsApi',
  'statisticsModal',
  'transactions',
  'vipClub',
  'claimModal',
  'vipClubModal',
  'adModal',
  'medal',
  'authBanner',
  'promoAccordionConfig',
]

export default defineConfig({
  name: 'default',
  title: 'Betida CMS - Dev',
  projectId: process.env.SANITY_PROJECT_ID || 'igf6eeh7',
  dataset: process.env.SANITY_DATASET || 'production',
  basePath: '/',
  plugins: [
    assist({
      translate: {
        field: {
          documentTypes: allDocumentTypes,
          languages: SUPPORTED_LANGUAGES,
        },
        // ✅ This enables the "Translate document" button
        document: {
          documentTypes: SUPPORTED_SCHEMAS,
          languageField: 'language',
        },
      },
    }),
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            orderableDocumentListDeskItem({
              type: 'promotion',
              title: 'Promotion',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'casinoChallenges',
              title: 'Casino Challenges',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'slots',
              title: 'Game Slots',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'termsDocument',
              title: 'Terms & Condition Documents',
              S,
              context,
            }),

            // blogs with orderable + translation grouping
            S.listItem()
              .title('Blogs Content')
              .icon(() => '📝')
              .child(
                S.documentList()
                  .title('Blogs Content')
                  .filter('_type == "blogs"')
                  .defaultOrdering([
                    {field: 'slug.current', direction: 'asc'}, // groups same blog together
                    {field: 'language', direction: 'asc'}, // en → de → tr within group
                  ]),
              ),
            ...S.documentTypeListItems().filter(
              (item: any) =>
                !['promotion', 'casinoChallenges', 'slots', 'termsDocument', 'blogs'].includes(
                  item.getId(),
                ),
            ),
          ]),
    }),
    visionTool(),
    colorInput(),
    // deskTool(),
    {
      name: 'content-translation',
      tools: [
        {
          name: 'content-translation',
          title: 'Content Translation',
          component: ContentTranslationTool,
        },
      ],
    },
    internationalizedArray({
      languages: SUPPORTED_LANGUAGES,
      // exclude: [
      //   'walletConfig',
      //   'walletTab',
      //   'paymentGroup',
      //   'paymentMethod',
      //   'leftPanelConfig',
      //   'networkOption',
      //   'speedTab',
      //   'helpCard',
      //   'authForm',
      //   'formField',
      //   'giftCardFlow',
      //   'cryptoOption',
      //   'presetAmount',
      //   'nestedExchangeWallet',
      //   'nestedTab',
      //   'vaultTab',
      //   'country',
      //   'currency',
      //   'leftPanelHelps',
      // ],
      defaultLanguages: ['tr'],
      fieldTypes: ['string', 'text', 'slug'],
    }),
    documentInternationalization({
      supportedLanguages: SUPPORTED_LANGUAGES,
      schemaTypes: SUPPORTED_SCHEMAS,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  desk: (S: any, context: any) =>
    S.list()
      .title('Content')
      .items([
        orderableDocumentListDeskItem({
          type: 'promotion',
          S,
          context,
        }),
        ...S.documentTypeListItems().filter((item: any) => item.getId() !== 'promotion'),
      ]),
  document: {
    actions: (prevActions, context) => {
      const {schemaType, documentId} = context

      if (schemaType === 'newBlogs') {
        return [
          ...prevActions,
          (props) => ({
            label: 'Translate Missing Languages',
            onHandle: () => {
              alert(
                'To run the translation script, go to the terminal and execute:\n\nnpm run translate\n\nOr node scripts/translate-blocks.js',
              )
            },
          }),
        ]
      }

      return prevActions
    },
  },
})
