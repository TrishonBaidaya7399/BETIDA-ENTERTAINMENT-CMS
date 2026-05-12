import { defineField, defineType } from "sanity";

export default defineType({
  name: "notificationCategoryConfig",
  title: "Notification Category Config",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Security", value: "security" },
          { title: "Wallet", value: "wallet" },
          { title: "Responsible", value: "responsible" },
          { title: "VIP", value: "vip" },
          { title: "Promotion", value: "promotion" },
          { title: "System", value: "system" },
        ],
      },
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value) return true;

          const currentId = context.document?._id || "";
          if (currentId && !currentId.startsWith("draft.")) {
            return true; 
          }

          const existing = await context
            .getClient({ apiVersion: "2023-01-01" })
            .fetch(
              `*[_type == "notificationCategoryConfig" && category == $category && !(_id in path("drafts.**"))][0]`,
              { category: value }
            );

          return (
            !existing ||
            "Each category can have only one published config (drafts ignored)"
          );
        }),
      description:
        "Unique per category – only one document allowed per category",
    }),

    defineField({
      name: "defaultChannels",
      title: "Default Channels",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["inApp", "email", "push", "sms"],
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom(
            (channels) =>
              channels?.includes("inApp") || "inApp must be included by default"
          ),
      initialValue: ["inApp"],
    }),

    defineField({
      name: "defaultPersistToInbox",
      title: "Default Persist to Inbox",
      type: "boolean",
      description:
        "Should notifications in this category go to Notification Center by default?",
      initialValue: true,
    }),

    defineField({
      name: "defaultTTLHours",
      title: "Default TTL (Hours)",
      type: "number",
      description:
        "How long notifications stay in inbox by default (if persistToInbox is true)",
      validation: (Rule) => Rule.min(1).integer(),
      initialValue: 720, // 30 days
    }),

    defineField({
      name: "defaultPriority",
      title: "Default Priority",
      type: "string",
      options: {
        list: ["low", "normal", "high", "critical"],
      },
      initialValue: "normal",
    }),

    defineField({
      name: "allowedSeverities",
      title: "Allowed Severities",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["info", "success", "warning", "error"],
      },
      validation: (Rule) => Rule.required().min(1),
      initialValue: ["info", "success", "warning", "error"],
    }),

    defineField({
      name: "requiresOptInByDefault",
      title: "Requires Marketing Opt-In by Default",
      type: "boolean",
      description:
        "For promotion/marketing categories – should templates require opt-in by default?",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "category",
    },
    prepare(selection: any) {
      const { title } = selection;
      return {
        title: title
          ? `${title.charAt(0).toUpperCase() + title.slice(1)} Category Defaults`
          : "Category Config",
      };
    },
  },
});
