// utils/isSlugUniqueAcrossPromotions.ts

import type { SlugIsUniqueValidator } from "sanity";

export const isSlugUniqueAcrossAllPromotionTypes: SlugIsUniqueValidator =
  async (slug, context) => {
    const { document, getClient } = context;
    const client = getClient({ apiVersion: "2025-12-02" });

    if (!document || !slug) return true;

    const currentId = document._id?.replace(/^drafts\./, "") || "";

    const promotionTypes = [
      "allPromotions",
      "casinoPromotion",
      "communityPromotion",
      "pokerPromotion",
      "promotionModal",
      "sportsPromotion",
    ];

    const query = `*[
    _type in $types &&
    slug.current == $slug &&
    _id != $currentId &&
    !(_id in path("drafts.**"))
  ][0]._id`;

    const result = await client.fetch(query, {
      types: promotionTypes,
      slug,
      currentId,
    });

    return result == null;
  };
