// schemas/notificationRoutingMap.ts

import { defineField, defineType } from "sanity";

export default defineType({
  name: "notificationRoutingMap",
  title: "Notification Routing Map",
  type: "document",
  fields: [
    defineField({
      name: "entityType",
      title: "Entity Type",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value) return true;
          const existing = await context
            .getClient({ apiVersion: "2023-01-01" })
            .fetch(
              `*[_type == "notificationRoutingMap" && entityType == $entityType && _id != $currentId][0]`,
              { entityType: value, currentId: context.document?._id || "" }
            );
          return !existing || "Each entity type can have only one routing map";
        }),
      description:
        "Unique identifier for entity, e.g. 'withdrawal', 'deposit', 'kyc_verification', 'deposit_limit'",
    }),

    defineField({
      name: "defaultActionType",
      title: "Default Action Type",
      type: "string",
      options: {
        list: [
          { title: "Navigate", value: "navigate" },
          { title: "Open Modal", value: "openModal" },
          { title: "None", value: "none" },
        ],
      },
      initialValue: "navigate",
    }),

    defineField({
      name: "defaultDeeplink",
      title: "Default Deeplink",
      type: "string",
      validation: (Rule) => Rule.required(),
      description:
        "Path to navigate, e.g. '/wallet/transactions', '/responsible-gaming/deposit-limits', '/wallet/withdrawals'",
    }),

    defineField({
      name: "requiredParams",
      title: "Required Deeplink Params",
      type: "array",
      of: [{ type: "string" }],
      description:
        "List of param keys that must be provided by backend, e.g. ['txId', 'limitId']",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Optional note for developers",
    }),
  ],

  preview: {
    select: {
      title: "entityType",
      subtitle: "defaultDeeplink",
    },
    prepare(selection: any) {
      const { title, subtitle } = selection;
      return {
        title: title || "Unnamed Entity",
        subtitle: subtitle ? `→ ${subtitle}` : "No deeplink set",
      };
    },
  },
});
