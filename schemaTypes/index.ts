import slots from './documents/slots'
import publisher from './documents/publisher'
import betidaOriginals from './documents/betida-originals'
import liveCasinos from './documents/live-casinos'
// import casino from './documents/casino'
import profile from './documents/profile'
import trendingSport from './documents/trendingSport'
import sports from './documents/sports'
import {notification} from './documents/notification'
import transaction from './documents/transaction'
import {rgBranchName} from './documents/responsible-gambling/rg-branch-name'
import {rgRecognizeSign} from './documents/responsible-gambling/rg-recognise-sign'
import {rgGamblingFaqs} from './documents/responsible-gambling/rg-gambling-faqs'
import {rgSelfExclusion} from './documents/responsible-gambling/rg-self-exclusion'
import {gamblingLimitsContent} from './documents/responsible-gambling/rg-gambling-limits'
import lawEnforcement from './documents/law-enforcement'
import blogs from './documents/blogs'
import provablyFair from './documents/provably-fair'
import sponsorship from './documents/sponsorship'
import casinoChallenges from './documents/casino-challenges'
import affiliateOverview from './documents/affiliate/affiliate-overview'
import affiliateCampaign from './documents/affiliate/affiliate-campaign'
import affiliateCommission from './documents/affiliate/affiliate-commission'
import affiliateRefferedUser from './documents/affiliate/affiliate-reffered-user'
import affiliateFaq from './documents/affiliate/affiliate-faq'
import affiliatesData from './documents/affiliate/affiliates-data'
import api from './documents/settings/api'
import statisticsModal from './documents/statistics-modal'
import {depositLimitsContent} from './documents/responsible-gambling/rg-deposit-limits-content'
import {
  selfAssessmentContent,
  selfAssessmentQuestions,
} from './documents/responsible-gambling/rg-self-assessment-content'
import bonuses from './documents/bonuses/bonuses'
import siteManagement from './documents/site-management-related/site-management'
import vipClub from './documents/vip-club'
import vipClubModal from './documents/vip-club-modal'
import sidebarMenu from './documents/site-management-related/sidebar-menu/sidebarMenu'
import menuItem from './documents/site-management-related/sidebar-menu/menuItem'
import promotionModal from './documents/promotions/promotion-modal'
import promotions from './documents/promotions/promotions'
import {kycConfig} from './documents/settings/kyc-config'
// import {casinoTabsSettings} from './documents/casino-tabs'
// import {sportsTabsSettings} from './documents/sports-tabs'
import claimModal from './documents/claim-modal'
import ticketModal from './documents/promotions/ticket-modal'
import {
  authForm,
  country,
  cryptoOption,
  currency,
  formField,
  giftCardFlow,
  helpCard,
  leftPanelConfig,
  leftPanelHelps,
  nestedExchangeWallet,
  nestedTab,
  networkOption,
  paymentGroup,
  paymentMethod,
  presetAmount,
  speedTab,
  vaultTab,
  walletConfig,
  walletTab,
} from './documents/wallet-config'
import languageOptions from './documents/site-management-related/languageOptions'
import termsAndConditions from './documents/terms/terms-and-conditions'
import bonusTabLabels from './documents/bonuses/bonus-tab-labels'
import promotionTabLabels from './documents/promotions/promotion-tab-labels'
import adModal from './documents/adModal'
import rgTabLabel from './documents/responsible-gambling/rg-tab-label'
import responsiveGamblingTabs from './documents/responsible-gambling/responsive-gambling-tabs'
import notificationCategoryConfig from './documents/notification/notification-category-config'
import notificationRoutingMap from './documents/notification/notification-routing-map'
import {rgBudgetCalculator} from './documents/responsible-gambling/rg-budget-calculator'
import responsibleGamblingData from './documents/responsible-gambling/responsible-gambling-data'
import notificationTemplates from './documents/notification/notification-templates'
import jackpotSection from './documents/jackpot-section'
import featuredGames from './documents/featured-games'
import viewAllButtonsConfig from './documents/site-management-related/view-all-buttons-config'
import ctaButtonConfig from './documents/site-management-related/cta-button-config'
import favorites from './documents/favorites-games'
import recentGames from './documents/recent-games'
import groupGames from './documents/group-games'
import promoBar from './documents/promo-bar'
import sportsLandingConfig from './documents/sports-landing-config'
import {provablyFairUnhashConfig} from './documents/provablyFair/unhash-config'
import {provablyFairCalculationConfig} from './documents/provablyFair/calculation-config'
import heroConfig from './documents/hero-config'
import colorsConfig from './documents/site-management-related/colors-config'
import footerConfig from './documents/footer-config'
import faqConfig from './documents/faq-config'
import betTableBettingCompetition from './documents/bet-table-betting-competition'
import promoAccordionConfig from './documents/promo-accordion-config'
import medal from './documents/medal'
import authBanner from './documents/authBanner'
import telegramPromo from './documents/telegram-promo'
import postTelegramPromo from './documents/post-telegram-promo'

export const schemaTypes = [
  // myBet,    // will handle by backend
  // allBet,   // will handle by backend
  // highRoller, // will handle by backend
  // raceLeaderboard,  // will handle by backend
  // trendingGame,   // will handle by backend
  // myBetsCasino,  // will handle by backend
  // siteEnvironment,
  // notificationTemplate,
  // newBlogs,
  telegramPromo,
  postTelegramPromo,
  medal,
  betTableBettingCompetition,
  siteManagement,
  colorsConfig,
  sidebarMenu,
  menuItem,
  viewAllButtonsConfig,
  ctaButtonConfig,
  languageOptions,
  notificationTemplates,
  notificationCategoryConfig,
  notificationRoutingMap,
  notification,
  // === WALLET SUPPORTING TYPES (order doesn't matter among these, but BEFORE walletConfig) ===
  country,
  currency,
  walletTab,
  paymentGroup,
  paymentMethod,
  leftPanelConfig,
  networkOption,
  speedTab,
  helpCard,
  leftPanelHelps,
  authForm,
  formField,
  giftCardFlow,
  cryptoOption,
  presetAmount,
  nestedExchangeWallet,
  nestedTab,
  vaultTab,

  // === MAIN DOCUMENT LAST ===
  walletConfig,
  profile,
  heroConfig,
  authBanner,
  promotionTabLabels,
  promotions,
  promotionModal,
  promoAccordionConfig,
  ticketModal,
  promoBar,
  jackpotSection,
  faqConfig,
  publisher,
  sportsLandingConfig,
  sports,
  featuredGames,
  trendingSport,
  slots,
  favorites,
  betidaOriginals,
  liveCasinos,
  recentGames,
  groupGames,
  // sportsTabsSettings,
  // casino,  // unused
  // casinoTabsSettings,  // unused
  responsibleGamblingData,
  // rgTabLabel,
  // responsiveGamblingTabs,
  // rgBranchName,
  // rgRecognizeSign,
  // rgGamblingFaqs,
  // rgSelfExclusion,
  // gamblingLimitsContent,
  // depositLimitsContent,
  // selfAssessmentContent,
  // selfAssessmentQuestions,
  // rgBudgetCalculator,
  lawEnforcement,
  termsAndConditions,
  blogs,
  provablyFair,
  provablyFairUnhashConfig,
  provablyFairCalculationConfig,
  sponsorship,
  casinoChallenges,
  affiliatesData,
  // affiliateOverview,
  // affiliateCampaign,
  // affiliateCommission,
  // affiliateRefferedUser,
  // affiliateFaq,
  kycConfig,
  api,
  statisticsModal,
  transaction,
  vipClub,
  claimModal,
  vipClubModal,
  adModal,
  bonusTabLabels,
  bonuses,
  footerConfig,
]
