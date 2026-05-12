import { defineType, defineField } from 'sanity'

export const MediaRef = defineType({
  type: 'object',
  name: 'MediaRef',
  title: 'Media Reference',
  fields: [
    defineField({
      type: 'string',
      name: 'CloudinaryPublicId',
      title: 'Cloudinary Public ID',
      validation: (e) => e.required(),
    }),
    defineField({
      type: 'string',
      name: 'CloudinaryVersion',
      title: 'Cloudinary Version',
      validation: (e) => e.required(),
    }),
    defineField({ type: 'string', name: 'DeliveryUrl', title: 'Delivery URL' }),
    defineField({ type: 'string', name: 'SecureUrl', title: 'Secure URL' }),
    defineField({ type: 'string', name: 'Alt', title: 'Alt' }),
    defineField({ type: 'string', name: 'AspectRatio', title: 'Aspect Ratio' }),
    defineField({ type: 'string', name: 'Focal', title: 'Focal' }),
  ],
})
