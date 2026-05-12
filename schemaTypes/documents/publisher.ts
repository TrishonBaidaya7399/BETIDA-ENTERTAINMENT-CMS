import {defineType, defineField} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export default defineType({
  name: 'publisher',
  title: 'Publisher',
  type: 'document',
  icon: ImagesIcon,
  options: {documentIdPrefix: 'pub'} as any,

  fields: [
    defineField({
      name: 'id',
      title: 'Order Number',
      type: 'number',
      description: 'Unique ordering number (e.g., 1, 2, 3...). Cannot be duplicated.',
      validation: (Rule) =>
        Rule.required()
          .integer()
          .positive()
          .custom(async (value, context) => {
            if (value === undefined || value === null) return true // required already handled

            const {document, getClient} = context
            const client = getClient({apiVersion: '2024-01-01'}) // latest apiVersion

            const existingId = await client.fetch(
              `*[_type == "publisher" && id == $value && !(_id in [$currentId, $draftId])][0]._id`,
              {
                value,
                currentId: document?._id || '',
                draftId: document?._id?.startsWith('drafts.')
                  ? document._id
                  : `drafts.${document?._id}`,
              },
            )

            if (existingId) {
              return 'This ID is already used by another card. Please choose a unique number.'
            }

            return true
          }),
    }),
    defineField({
      name: 'providerLogoPublicId',
      title: 'Provider Logo (Cloudinary Public ID)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'name',
      title: 'Publisher Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'redirectUrl',
      title: 'Redirect URL (e.g., /casino/group/{slug})',
      type: 'string',
    }),
    defineField({
      name: 'players',
      title: 'Players',
      type: 'number',
      validation: (Rule) => Rule.min(0).integer().required(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'players',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Unnamed Publisher',
        subtitle: subtitle != null ? `${subtitle} players` : undefined,
      }
    },
  },
})
