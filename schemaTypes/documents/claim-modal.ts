// schemaTypes/claimModal.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'claimModal',
  title: 'Claim Modal Content',
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
      name: 'modalTitle',
      title: 'Modal Title (e.g., Claim Rakeback)',
      description: 'Only visible to for the claim modal open from VIP page and Bonuses page',
      type: 'string',

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'preClaimTitle',
      title: 'Pre-Claim Main Title',
      type: 'string',
      description: 'Only visible to for the claim modal open from VIP page and Bonuses page',

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'preClaimDescription',
      title: 'Pre-Claim Description',
      description: 'Only visible to for the claim modal open from VIP page and Bonuses page',
      type: 'string',

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'postClaimTitle',
      title: 'Post-Claim Title',
      type: 'string',
      description: 'Only visible to for the claim modal open from VIP page and Bonuses page',

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'postClaimDescription',
      title: 'Post-Claim Description',
      type: 'string',
      description: 'Only visible to for the claim modal open from VIP page and Bonuses page',

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'claimButtonText',
      title: 'Claim Button Text',
      type: 'string',
      description: 'Only visible to for the claim modal open from VIP page and Bonuses page',

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'returnButtonText',
      title: 'Return to Rewards Button Text',
      type: 'string',

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'doneButtonText',
      title: 'Done Button Text',
      type: 'string',

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'totalLabel',
      title: 'Total Label (e.g., Total Rakeback:)',
      type: 'string',

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'preClaimImage',
      title: 'Pre-Claim Image (Cloudinary Public ID)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      description: "e.g., 'vip/gift-box-glowing'",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'postClaimImage',
      title: 'Post-Claim Image (Cloudinary Public ID)',
      type: 'string',
      options: {aiAssist: {exclude: true}},
      description: "e.g., 'vip/gift-explosion-coins'",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      language: 'language',
      title: 'modalTitle',
      preClaimTitle: 'preClaimTitle',
    },
    prepare({language, title, preClaimTitle}: any) {
      return {
        title: title || 'Claim Modal Content',
        subtitle: `${language?.toUpperCase() || 'NO-LANG'} • ${preClaimTitle || 'No pre-claim title'}`,
      }
    },
  },
})
