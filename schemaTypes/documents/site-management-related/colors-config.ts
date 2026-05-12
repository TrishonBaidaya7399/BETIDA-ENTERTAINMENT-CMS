import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'colorSettings',
  title: 'Site Theme Config',
  type: 'document',

  groups: [
    {name: 'main', title: 'Main Colors'},
    {name: 'buttons', title: 'Buttons'},
    {name: 'hero', title: 'Hero & Special'},
    {name: 'sidebar', title: 'Sidebar'},
    {name: 'ui', title: 'UI Elements'},
    {name: 'other', title: 'Other / Legacy'},
  ],

  fields: [
    // ────────────────────── MAIN COLORS ──────────────────────
    defineField({
      name: 'orange1',
      title: 'Primary',
      description: "e.g., primary gradient button's start color",
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'yellow1',
      title: 'Secondary',
      description: "e.g., primary gradient button's end color",
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'purple1',
      title: 'Secondary gradient start',
      description: "e.g., Secondary gradient button's start color",
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'blue1',
      title: 'Secondary gradient end',
      description: "e.g., Secondary gradient button's end color",
      type: 'color',
      options: {disableAlpha: true},
    }),
    // Core Tailwind-like colors
    defineField({
      name: 'foreground',
      title: 'Foreground',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'foregroundMuted',
      title: 'Foreground-Muted',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'background1',
      title: 'Background-1',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'background2',
      title: 'Background-2',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'background3',
      title: 'Background-3',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'raffleCardGradientStart',
      title: 'Raffle Card Gradient Start',
      description:
        'e.g., for raffle cards background gradient, if want to ad as solid color instead of gradient, set same color for start and end',
      type: 'color',
      options: {disableAlpha: false},
    }),
    defineField({
      name: 'raffleCardGradientEnd',
      title: 'Raffle Card Gradient End',
      description:
        'e.g., for raffle cards background gradient, if want to ad as solid color instead of gradient, set same color for start and end',
      type: 'color',
      options: {disableAlpha: false},
    }),
    defineField({
      name: 'imgBackground',
      title: 'Image Background',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'heroBorderStart1',
      title: 'Hero Border Start (First Hero Image)',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'heroBorderEnd1',
      title: 'Hero Border End (First Hero Image)',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'heroBorderStart2',
      title: 'Hero Border Start (Second Hero Image)',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'heroBorderEnd2',
      title: 'Hero Border End (Second Hero Image)',
      type: 'color',
      options: {disableAlpha: true},
    }),

    // new parts ===============================
    defineField({
      name: 'newHeroBorderStart1',
      title: '(Secondary Hero) First Hero Image Border Start',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'newHeroBorderEnd1',
      title: '(Secondary Hero) First Hero Image Border End',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'newHeroBorderStart2',
      title: '(Secondary Hero) Second Hero Image Border Start',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'newHeroBorderEnd2',
      title: '(Secondary Hero) Second Hero Image Border End',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'hoverNewHeroBorderStart1',
      title: '(Secondary Hero) First Hero Image Hover Border Start',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'hoverNewHeroBorderEnd1',
      title: '(Secondary Hero) First Hero Image Hover Border End',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'hoverNewHeroBorderStart2',
      title: '(Secondary Hero) Second Hero Image Hover Border Start',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'hoverNewHeroBorderEnd2',
      title: '(Secondary Hero) Second Hero Image Hover Border End',
      type: 'color',
      options: {disableAlpha: true},
    }),

    defineField({
      name: 'newHeroBgStart1',
      title: '(Secondary Hero) First Hero Image Background Start',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'newHeroBgEnd1',
      title: '(Secondary Hero) First Hero Image Background End',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'newHeroBgStart2',
      title: '(Secondary Hero) Second Hero Image Background Gradient Color Start',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'newHeroBgEnd2',
      title: '(Secondary Hero) Second Hero Image Background Gradient Color End',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'heroSportsSvgIconColor',
      title: '(Secondary Hero) Hero Image Sports Icon Color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'heroCasinoSvgIconColor',
      title: '(Secondary Hero) Hero Image Casino Icon Color',
      type: 'color',
      options: {disableAlpha: true},
    }),

    // =====================================================

    defineField({
      name: 'promoBarColor',
      title: "Top Promo Bar's primary color",
      description:
        'Background color of the top promo bar will be 10% of this color and highlighted texts will use this color',
      type: 'color',
      options: {disableAlpha: false},
    }),
    defineField({
      name: 'providerPrimaryColor',
      title: "Provider's Primary Color",
      type: 'color',
      options: {disableAlpha: false},
    }),
    defineField({
      name: 'providerSecondaryColor',
      title: "Provider's Secondary Color",
      type: 'color',
      options: {disableAlpha: false},
    }),
    defineField({
      name: 'progressBarFill',
      title: 'Progress Bar Fill Color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'progressBarBg',
      title: 'Progress Bar Background Color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    // Paste all these defineField() blocks directly inside your colors.fields array
    // Just like your other color fields — no nesting, no object, no preview bloat
    // login button configs
    defineField({
      name: 'loginBtnBG',
      title: 'Login Button Background',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'loginBtnBorder',
      title: 'Login Button Border',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'loginBtnText',
      title: 'Login Button Text Color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    // Register button configs
    defineField({
      name: 'registerBtnBG',
      title: 'Register Button Background',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'registerBtnBorder',
      title: 'Register Button Border',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'registerBtnText',
      title: 'Register Button Text Color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    // Wallet button configs
    defineField({
      name: 'walletBtnBG',
      title: 'Wallet Button Background',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'walletBtnBorder',
      title: 'Wallet Button Border',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'walletBtnText',
      title: 'Wallet Button Text Color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    // Wallet dropdown button configs
    defineField({
      name: 'walletDropdownBtnBG',
      title: 'Wallet Dropdown Button Background',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'walletDropdownBtnBorder',
      title: 'Wallet Dropdown Button Border',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'walletDropdownBtnText',
      title: 'Wallet Dropdown Button Text Color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    // promotion card details button configs
    defineField({
      name: 'promotionCardDetailsBtnBG',
      title: 'Promotion Card Details Button Background',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'promotionCardDetailsBtnBorder',
      title: 'Promotion Card Details Button Border',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'promotionCardDetailsBtnText',
      title: 'Promotion Card Details Button Text Color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    // buttons general configs

    defineField({
      name: 'btnPrimaryStart',
      title: 'Button Primary – Start (Gradient)',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'btnPrimaryEnd',
      title: 'Button Primary – End (Gradient)',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'btnPrimaryText',
      title: 'Button Primary – Text Color',
      type: 'color',
      options: {disableAlpha: true},
    }),

    defineField({
      name: 'btnSecondaryStart',
      title: 'Button Secondary – Start (Gradient)',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'btnSecondaryEnd',
      title: 'Button Secondary – End (Gradient)',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'btnSecondaryText',
      title: 'Button Secondary – Text Color',
      type: 'color',
      options: {disableAlpha: true},
    }),

    defineField({
      name: 'btnSuccessStart',
      title: 'Button Success – Start (Gradient)',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'btnSuccessEnd',
      title: 'Button Success – End (Gradient)',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'btnSuccessText',
      title: 'Button Success – Text Color',
      type: 'color',
      options: {disableAlpha: true},
    }),

    defineField({
      name: 'btnGrayBg',
      title: 'Button Gray – Background',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'btnGrayText',
      title: 'Button Gray – Text Color',
      type: 'color',
      options: {disableAlpha: true},
    }),

    defineField({
      name: 'btnGhostHover',
      title: 'Button Ghost – Hover Background',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'btnGhostText',
      title: 'Button Ghost – Text Color',
      type: 'color',
      options: {disableAlpha: true},
    }),

    // defineField({
    //   name: "btnOutlineBg",
    //   title: "Button Outline – Background",
    //   type: "color",
    //   options: { disableAlpha: true },
    //   initialValue: { hex: "transparent" },
    // }),
    defineField({
      name: 'btnOutlineText',
      title: 'Button Outline – Text & Border Color',
      type: 'color',
      options: {disableAlpha: true},
    }),

    defineField({
      name: 'btnLinkText',
      title: 'Button Link – Text & Underline Color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'card',
      title: 'Card color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'cardForeground',
      title: 'Card-Foreground',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'popover',
      title: 'Popover Color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'popoverForeground',
      title: 'Popover-Foreground',
      type: 'color',
      options: {disableAlpha: true},
    }),
    // defineField({
    //   name: "primary",
    //   title: "--primary",
    //   type: "color",
    //   options: { disableAlpha: true },
    // }),
    // defineField({
    //   name: "primaryForeground",
    //   title: "--primary-foreground",
    //   type: "color",
    //   options: { disableAlpha: true },
    // }),
    // defineField({
    //   name: "secondary",
    //   title: "--secondary",
    //   type: "color",
    //   options: { disableAlpha: true },
    // }),
    // defineField({
    //   name: "secondaryForeground",
    //   title: "--secondary-foreground",
    //   type: "color",
    //   options: { disableAlpha: true },
    // }),
    defineField({
      name: 'muted',
      title: 'Muted',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'mutedForeground',
      title: 'Muted-Foreground',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'accent',
      title: 'Accent',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'accentForeground',
      title: 'Accent-Foreground',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'destructive',
      title: 'Destructive Color',
      description: 'e.g., for delete buttons, like red color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'success',
      title: 'Success',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'border',
      title: 'Border',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'HeroImageBorder1',
      title: 'Hero-border-1',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'HeroImageBorder2',
      title: 'Hero-border-2',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'input',
      title: 'Input',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'ring',
      title: 'Ring',
      type: 'color',
      options: {disableAlpha: true},
    }),

    // Sidebar colors
    defineField({
      name: 'sidebar',
      title: 'Sidebar',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'sidebarLight',
      title: 'Sidebar-light',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'sidebarForeground',
      title: 'Sidebar-Foreground',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'sidebarGroupBg',
      title: 'Sidebar-Group-BG',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'sidebarPrimary',
      title: 'Sidebar-Primary',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'sidebarPrimaryForeground',
      title: 'Sidebar-Primary-Foreground',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'sidebarAccent',
      title: 'Sidebar-Accent',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'sidebarAccentForeground',
      title: 'Sidebar-Accent-Foreground',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'sidebarBorder',
      title: 'Sidebar-Border',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'sidebarRing',
      title: 'Sidebar-Ring',
      type: 'color',
      options: {disableAlpha: true},
    }),

    // Custom Betida colors

    defineField({
      name: 'white3',
      title: 'White-3',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'sports',
      title: 'Sports Color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'green1',
      title: 'Green',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'cyan1',
      title: 'Cyan-1',
      type: 'color',
      options: {disableAlpha: true},
    }),

    defineField({
      name: 'svgIconColor',
      title: 'Svg-Icon-Color',
      description: 'e.g., The primary color inside the svg icons',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'svgStopColor',
      title: 'Svg-stop-color',
      description: 'e.g., Primary gradient SVG stop color, like red color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'svgStopColor2',
      title: 'Svg-stop-color-2',
      description: 'e.g., Secondary gradient SVG stop color, like yellow color',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'rugbyPerson',
      title: 'Rugby Person Color',
      description: 'e.g., The person color for the svg icon on the sidebar',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'rugbyBackground',
      title: 'Rugby Person Background Color',
      description: 'e.g., The person background color for the svg icon on the sidebar',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'brandPrimary',
      title: 'Color-brand-primary',
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'bitcoin',
      title: 'Bitcoin',
      description: "e.g., Bitcoin's background color",
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'ethereum',
      title: 'Ethereum',
      description: "e.g., Ethereum's background color",
      type: 'color',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'binance',
      title: 'Binance',
      description: "e.g., Binance's background color",
      type: 'color',
      options: {disableAlpha: true},
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Color Settings',
        subtitle: 'Global design color overrides',
      }
    },
  },
})
