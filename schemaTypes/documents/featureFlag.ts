import { defineType, defineField } from "sanity";

export const FeatureFlag = defineType({
  type: "document",
  name: "FeatureFlag",
  title: "Feature Flag",
  fields: [
    defineField({ type: "string", name: "key", title: "Flag Key" }),
    defineField({ type: "boolean", name: "enabled", title: "Enabled" }),
  ],
});
