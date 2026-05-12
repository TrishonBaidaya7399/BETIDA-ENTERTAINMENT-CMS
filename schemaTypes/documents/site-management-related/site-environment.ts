// schemas/site-environment.ts
import { EarthGlobeIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const siteEnvironment = defineType({
  name: "siteEnvironment",
  title: "Site Environment Variables",
  type: "document",
  icon: EarthGlobeIcon,

  groups: [
    { name: "sanity", title: "Sanity Studio" },
    { name: "cloudinary", title: "Cloudinary" },
    { name: "security", title: "Security & Secrets" },
    { name: "seo", title: "SEO & Analytics" },
    { name: "social", title: "Social & Others" },
  ],

  fields: [
    // ======================= SANITY STUDIO =======================
    defineField({
      name: "NEXT_PUBLIC_SANITY_PROJECT_ID",
      title: "Sanity Project ID",
      type: "string",
      group: "sanity",
      readOnly: true,
      description: "Fixed key — used in frontend",
    }),
    defineField({
      name: "NEXT_PUBLIC_SANITY_DATASET",
      title: "Sanity Dataset",
      type: "string",
      group: "sanity",
      readOnly: true,
      description: "Usually 'production'",
    }),
    defineField({
      name: "NEXT_PUBLIC_SANITY_API_VERSION",
      title: "Sanity API Version",
      type: "string",
      group: "sanity",
      description: "Example: 2025-10-06",
    }),
    defineField({
      name: "SANITY_API_READ_TOKEN",
      title: "Sanity Read Token (Public)",
      type: "string",
      group: "sanity",
      description: "Used for preview & public queries",
    }),

    // ======================= CLOUDINARY =======================
    defineField({
      name: "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
      title: "Cloudinary Cloud Name",
      type: "string",
      group: "cloudinary",
      readOnly: true,
      description: "Public — required for image delivery",
    }),
    defineField({
      name: "CLOUDINARY_CLOUD_NAME",
      title: "Cloudinary Cloud Name for server",
      type: "string",
      group: "cloudinary",
      readOnly: true,
      description: "Public — required for image delivery",
    }),
    defineField({
      name: "CLOUDINARY_API_KEY",
      title: "Cloudinary API Key",
      type: "string",
      group: "cloudinary",
      description: "Used for upload (can be public if needed)",
    }),
    defineField({
      name: "CLOUDINARY_API_SECRET",
      title: "Cloudinary API Secret",
      type: "string",
      group: "cloudinary",
      hidden: true,
      description: "Never expose! Server-side only",
    }),

    // ======================= SITE & VERCEL =======================
    defineField({
      name: "NEXT_PUBLIC_SITE_URL",
      title: "Site URL",
      type: "url",
      group: "social",
      description: "Production URL — used in SEO, sitemap, OG tags",
    }),
    defineField({
      name: "NEXT_PUBLIC_VERCEL_ENV",
      title: "Vercel Environment",
      type: "string",
      group: "social",
      description: "production / preview / development",
    }),

    // ======================= SEO & ANALYTICS =======================
    defineField({
      name: "NEXT_PUBLIC_GOOGLE_ANALYTICS_ID",
      title: "Google Analytics ID",
      type: "string",
      group: "seo",
      description: "Format: G-XXXXXXXXXX",
    }),
    defineField({
      name: "GOOGLE_SITE_VERIFICATION",
      title: "Google Site Verification",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "YANDEX_SITE_VERIFICATION",
      title: "Yandex Verification",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "YAHOO_SITE_VERIFICATION",
      title: "Yahoo/Bing Verification",
      type: "string",
      group: "seo",
    }),

    // ======================= SOCIAL =======================
    defineField({
      name: "NEXT_PUBLIC_TWITTER_HANDLE",
      title: "Twitter/X Handle",
      type: "string",
      group: "social",
      description: "Example: @BETIDAOfficial",
    }),

    // ======================= SECURITY (HIDDEN) =======================
    defineField({
      name: "SANITY_API_WRITE_TOKEN",
      title: "Sanity Write Token",
      type: "string",
      group: "security",
      hidden: true,
    }),
    defineField({
      name: "SANITY_API_TOKEN",
      title: "Sanity API Token",
      type: "string",
      group: "security",
      hidden: true,
    }),
    defineField({
      name: "SANITY_REVALIDATE_SECRET",
      title: "Vercel Revalidate Secret",
      type: "string",
      group: "security",
      hidden: true,
    }),
    defineField({
      name: "JWT_SECRET",
      title: "JWT Secret",
      type: "string",
      group: "security",
      hidden: true,
      description: "Used for authentication",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Site Environment Variables",
        subtitle: "Edit values only — keys are fixed",
      };
    },
  },
});
