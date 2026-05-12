import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'rgTabLabels',
  title: 'Responsive Gambling Tab Labels',
  type: 'document',
  fields: [
    defineField({
      name: 'BETIDASmart',
      title: 'BETIDA Smart Tab',
      type: 'rgTabLabelItem',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'recogniseTheSigns',
      title: 'Recognise the Signs',
      type: 'rgTabLabelItem',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'responsibleGamblingFAQs',
      title: 'Responsible Gambling FAQs',
      type: 'rgTabLabelItem',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'selfExclusion',
      title: 'Self Exclusion',
      type: 'rgTabLabelItem',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gamblingLimits',
      title: 'Gambling Limits',
      type: 'rgTabLabelItem',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'depositLimits',
      title: 'Deposit Limits',
      type: 'rgTabLabelItem',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'selfAssessment',
      title: 'Self-Assessment',
      type: 'rgTabLabelItem',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'budgetCalculator',
      title: 'Budget Calculator',
      type: 'rgTabLabelItem',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      betida: 'BETIDASmart.label',
      recognise: 'recogniseTheSigns.label',
      faqs: 'responsibleGamblingFAQs.label',
      selfEx: 'selfExclusion.label',
      gambLim: 'gamblingLimits.label',
      depLim: 'depositLimits.label',
      selfAss: 'selfAssessment.label',
      budget: 'budgetCalculator.label',
      language: 'language',
    },
    prepare({betida, recognise, faqs, selfEx, gambLim, depLim, selfAss, budget, language}) {
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

      const flag = langFlag[language] || '🌐'

      const tabs = [betida, recognise, faqs, selfEx, gambLim, depLim, selfAss, budget]
      const filledCount = tabs.filter(Boolean).length

      return {
        title: `Responsive Gambling Tab Labels`,
        subtitle: `Lang: ${language?.toUpperCase() ?? 'NO-LANG'} • ${filledCount}/${tabs.length} tabs filled`,
      }
    },
  },
})
