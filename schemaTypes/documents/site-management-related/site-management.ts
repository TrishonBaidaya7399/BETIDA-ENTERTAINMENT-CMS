// schemas/siteManagement.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteManagement',
  title: 'Site Management',
  type: 'document',
  groups: [
    {name: 'branding', title: 'Branding'},
    {name: 'seo', title: 'SEO & Metadata'},
    {name: 'typography', title: 'Typography (Optional)'},
  ],

  fields: [
    // ────────────────────── BRANDING ──────────────────────
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      group: 'branding',
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "logo",
    //   title: "Logo Image Source",
    //   type: "string",
    //   group: "branding",
    //   validation: (Rule) => Rule.required(),
    // }),
    // ── NEW SVG FIELDS ──
    defineField({
      name: 'mainLogo',
      title: 'Main Logo (only SVG - 106:32)',
      type: 'image',
      group: 'branding',
      options: {
        accept: 'image/svg+xml',
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'For accessibility',
        }),
      ],
    }),

    defineField({
      name: 'favicon',
      title: 'Favicon (only SVG – 32:32)',
      type: 'image',
      group: 'branding',
      options: {
        accept: 'image/svg+xml',
      },
    }),
    // ── NEW SEO FIELDS ──
    defineField({
      name: 'seo',
      title: 'SEO & Metadata Settings',
      type: 'object',
      group: 'seo',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'siteTitle',
          title: 'Site-wide Title (default)',
          type: 'string',
          description: 'Used as base title for all pages if no page-specific title is set',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'siteDescription',
          title: 'Site-wide Description',
          type: 'text',
          rows: 3,
          description: 'Default meta description for the site (150–160 characters recommended)',
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Recommended size: 1200×630 px (used for social sharing)',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'For accessibility and SEO',
            }),
          ],
        }),
        defineField({
          name: 'canonicalUrl',
          title: 'Canonical Base URL',
          type: 'url',
          description: 'Base URL for canonical links (e.g. https://betida.com)',
          validation: (Rule) => Rule.uri({scheme: ['https']}),
        }),
        defineField({
          name: 'robotsIndex',
          title: 'Allow Indexing',
          type: 'boolean',
          initialValue: true,
          description: 'Whether search engines should index the site',
        }),
        defineField({
          name: 'robotsFollow',
          title: 'Allow Following Links',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'keywords',
          title: 'Site-wide Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description:
            'Comma-separated keywords for meta keywords tag (optional, not very important for modern SEO)',
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'twitterCreator',
          title: 'Twitter / X Creator Handle',
          type: 'string',
          description: 'Twitter card creator handle (e.g. "@BETIDAOfficial")',
          validation: (Rule) =>
            Rule.regex(/^@[\w]+$/, {
              name: 'twitter-handle',
              invert: false,
            }).error('Must start with @ and contain only letters, numbers, underscores'),
          initialValue: '@BETIDAOfficial',
        }),
      ],
    }),

    // ────────────────────── TYPOGRAPHY ──────────────────────
    defineField({
      name: 'fontHeading',
      title: 'Heading Font (Google Fonts Name)',
      type: 'string',
      group: 'typography',
      description: 'Example: Poppins, Inter, Montserrat, Roboto',
    }),
    defineField({
      name: 'fontBody',
      title: 'Body Font (Google Fonts Name)',
      type: 'string',
      group: 'typography',
      description: 'Example: Inter, Roboto, Open Sans',
    }),
  ],

  preview: {
    select: {
      title: 'brandName',
    },
    prepare({title}: {title?: string}) {
      return {
        title: title || 'Site Management',
      }
    },
  },
})
