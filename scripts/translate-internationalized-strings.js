require("dotenv").config();
const { createClient } = require("@sanity/client");
const axios = require("axios");
const _ = require("lodash");

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_URL =
  process.env.DEEPL_API_URL || "https://api.deepl.com/v2/translate";

const config = {
  documentTypes: ["promotion"], // change if needed
  preferredSourceLang: "TR",
  targetLangs: ["EN", "DE", "ES", "FR", "PT", "RU", "AR", "HI", "ZH"],
  dryRun: false, // 🔴 change to false when ready
};

// 🔹 Generate key
function generateKey() {
  return Math.random().toString(36).substring(2, 11);
}

// 🔹 Detect ONLY internationalizedStringArray
function detectStringFields(obj, path = []) {
  let fields = [];

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...path, key];

    if (
      Array.isArray(value) &&
      value.length &&
      value[0]?.language &&
      typeof value[0]?.text === "string"
    ) {
      fields.push(currentPath.join("."));
      console.log(`   ✅ Found string field: ${currentPath.join(".")}`);
      continue;
    }

    if (value && typeof value === "object") {
      fields.push(...detectStringFields(value, currentPath));
    }
  }

  return fields;
}

// 🔹 Get fields from sample doc
async function getStringFields(type) {
  console.log(`\n🔍 Detecting STRING fields in ${type}...`);
  const doc = await client.fetch(`*[_type == $type][0]`, { type });
  if (!doc) return [];
  return detectStringFields(doc);
}

// 🔹 Translate plain text
async function translateText(text, targetLang) {
  if (!text || !text.trim()) return text;

  try {
    const res = await axios.post(
      DEEPL_URL,
      new URLSearchParams({
        auth_key: DEEPL_API_KEY,
        text,
        source_lang: config.preferredSourceLang,
        target_lang: targetLang,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    return res.data.translations[0].text;
  } catch (err) {
    console.error("DeepL error:", err.response?.data || err.message);
    return text;
  }
}

// 🔹 Main
async function processDocuments() {
  const fields = await getStringFields(config.documentTypes[0]);
  if (!fields.length) {
    console.log("⚠️ No internationalized string fields found");
    return;
  }

  const docs = await client.fetch(`*[_type in $types]{_id}`, {
    types: config.documentTypes,
  });

  console.log(`\n📦 Found ${docs.length} documents`);

  for (const doc of docs) {
    console.log(`\nProcessing ${doc._id}`);

    const projection = fields.map((f) => `"${f}": ${f}`).join(",\n");
    const data = await client.fetch(`*[_id==$id][0]{${projection}}`, {
      id: doc._id,
    });

    const patches = {};

    for (const fieldPath of fields) {
      const arr = _.get(data, fieldPath);
      if (!Array.isArray(arr)) continue;

      const source = arr.find(
        (e) =>
          e.language?.toUpperCase() === config.preferredSourceLang &&
          e.text?.trim()
      );
      if (!source) continue;

      const newEntries = [];

      for (const lang of config.targetLangs) {
        if (arr.find((e) => e.language?.toUpperCase() === lang)) continue;

        console.log(
          `🔍 [${config.dryRun ? "DRY RUN" : "LIVE"}] ${fieldPath} → ${lang}`
        );

        const translated = await translateText(source.text, lang);
        newEntries.push({
          _key: generateKey(),
          language: lang.toLowerCase(),
          text: translated,
        });
      }

      if (newEntries.length) patches[fieldPath] = newEntries;
    }

    if (!Object.keys(patches).length) {
      console.log("⏭️ Nothing to translate");
      continue;
    }

    let patchOp = client.patch(doc._id);
    for (const [path, entries] of Object.entries(patches)) {
      patchOp = patchOp.setIfMissing({ [path]: [] });
      patchOp = patchOp.append(path, entries);
    }

    if (!config.dryRun) {
      await patchOp.commit();
      console.log("✅ Updated");
    } else {
      console.log("🔍 DRY RUN complete");
    }
  }
}

processDocuments().catch((e) => console.error("❌ Script error:", e));
