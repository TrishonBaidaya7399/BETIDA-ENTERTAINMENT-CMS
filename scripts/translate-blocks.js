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
  documentTypes: ["termsDocument"], // Add other schemas if needed
  preferredSourceLang: "TR",
  targetLangs: ["EN", "TR", "DE", "ES", "FR", "PT", "RU", "AR", "HI", "ZH"],
  dryRun: false, // true = no changes
};

// 🔹 Generate random key for portable text / object
function generateKey() {
  return Math.random().toString(36).substring(2, 11);
}

// 🔹 Recursive detection of block or text array fields
function detectTranslatableFields(obj, path = []) {
  let fields = [];

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...path, key];

    if (Array.isArray(value) && value.length > 0) {
      const first = value[0];
      if (first.language && (first.blocks || first.text)) {
        fields.push(currentPath.join("."));
        console.log(`   ✅ Found translatable field: ${currentPath.join(".")}`);
      } else {
        value.forEach((item) => {
          if (item && typeof item === "object") {
            fields.push(...detectTranslatableFields(item, currentPath));
          }
        });
      }
    } else if (value && typeof value === "object") {
      fields.push(...detectTranslatableFields(value, currentPath));
    }
  }

  return fields;
}

// 🔹 Fetch sample doc to detect fields
async function getTranslatableFields(docType) {
  console.log(`\n🔍 Detecting fields in schema: ${docType}...`);
  const sampleDoc = await client.fetch(`*[_type == $type][0]`, {
    type: docType,
  });
  if (!sampleDoc) {
    console.warn(`⚠️ No sample document found for type: ${docType}`);
    return [];
  }
  const fields = detectTranslatableFields(sampleDoc);
  if (!fields.length) console.log(`   ⚠️ No fields detected in ${docType}`);
  return fields;
}

// 🔹 Fetch documents
async function fetchDocuments() {
  const schemaFields = await getTranslatableFields(config.documentTypes[0]);
  if (!schemaFields.length) {
    console.error("❌ No translatable fields found!");
    return { docs: [], fieldsToTranslate: [] };
  }

  console.log(`\n📝 Fields to translate: ${schemaFields.join(", ")}`);
  const docs = await client.fetch(`*[_type in $types]{_id}`, {
    types: config.documentTypes,
  });
  console.log(`📦 Found ${docs.length} documents`);
  return { docs, fieldsToTranslate: schemaFields };
}

// 🔹 Portable Text -> HTML
function portableToHtml(blocks) {
  let html = "",
    inList = false,
    currentListType = null;
  blocks.forEach((block, i) => {
    if (block._type !== "block") return;
    const style = block.style || "normal",
      listItem = block.listItem;
    const childrenHtml = (block.children || [])
      .map((c) => {
        let text = c.text || "";
        if (c.marks?.includes("strong")) text = `<strong>${text}</strong>`;
        if (c.marks?.includes("em")) text = `<em>${text}</em>`;
        if (c.marks?.includes("underline")) text = `<u>${text}</u>`;
        if (c.marks?.includes("code")) text = `<code>${text}</code>`;
        return text;
      })
      .join("");

    if (listItem) {
      const listType = listItem === "bullet" ? "ul" : "ol";
      if (!inList || currentListType !== listType) {
        if (inList) html += `</${currentListType}>`;
        html += `<${listType}>`;
        inList = true;
        currentListType = listType;
      }
      html += `<li data-style="${style}">${childrenHtml}</li>`;
      const nextBlock = blocks[i + 1];
      if (!nextBlock || !nextBlock.listItem) {
        html += `</${currentListType}>`;
        inList = false;
        currentListType = null;
      }
    } else {
      if (inList) {
        html += `</${currentListType}>`;
        inList = false;
        currentListType = null;
      }
      if (style.startsWith("h")) html += `<${style}>${childrenHtml}</${style}>`;
      else if (style === "blockquote")
        html += `<blockquote>${childrenHtml}</blockquote>`;
      else html += `<p>${childrenHtml}</p>`;
    }
  });
  if (inList) html += `</${currentListType}>`;
  return html;
}

// 🔹 Translate via DeepL
async function translateHtml(html, targetLang) {
  if (!html?.trim()) return html;
  try {
    const response = await axios.post(
      DEEPL_URL,
      new URLSearchParams({
        auth_key: DEEPL_API_KEY,
        text: html,
        source_lang: config.preferredSourceLang,
        target_lang: targetLang,
        tag_handling: "html",
        preserve_formatting: "1",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return response.data.translations[0].text;
  } catch (err) {
    console.error("DeepL error:", err.response?.data || err.message);
    return html;
  }
}

// 🔹 Convert HTML -> Portable Text
function parseInlineMarks(text) {
  const children = [];
  let marks = [];
  const regex = /(<\/?(?:strong|em|u|code)>)/g;
  const parts = text.split(regex);
  parts.forEach((p) => {
    if (!p) return;
    if (p === "<strong>") marks.push("strong");
    else if (p === "</strong>") marks = marks.filter((m) => m !== "strong");
    else if (p === "<em>") marks.push("em");
    else if (p === "</em>") marks = marks.filter((m) => m !== "em");
    else if (p === "<u>") marks.push("underline");
    else if (p === "</u>") marks = marks.filter((m) => m !== "underline");
    else if (p === "<code>") marks.push("code");
    else if (p === "</code>") marks = marks.filter((m) => m !== "code");
    else if (!p.match(/^<\/?/))
      children.push({
        _type: "span",
        _key: generateKey(),
        text: p,
        marks: [...marks],
      });
  });
  if (!children.length)
    children.push({ _type: "span", _key: generateKey(), text: "", marks: [] });
  return children;
}
function createBlock(content, style = "normal", listItem = null) {
  const block = {
    _type: "block",
    _key: generateKey(),
    style,
    children: parseInlineMarks(content),
    markDefs: [],
  };
  if (listItem) {
    block.listItem = listItem;
    block.level = 1;
  }
  return block;
}
function htmlToPortable(html) {
  if (!html?.trim()) return [createBlock("", "normal")];
  const blocks = [];
  const tagPattern =
    /<(h[1-6]|p|blockquote|ul|ol)(?:\s[^>]*)?>[\s\S]*?<\/\1>/gi;
  const matches = html.match(tagPattern) || [];
  if (!matches.length) {
    blocks.push(createBlock(html.replace(/<[^>]+>/g, "")));
    return blocks;
  }

  matches.forEach((m) => {
    const tagMatch = m.match(/^<(\w+)/);
    if (!tagMatch) return;
    const tag = tagMatch[1].toLowerCase();
    const contentMatch = m.match(/^<\w+(?:\s[^>]*)?>(.+?)<\/\w+>$/is);
    if (!contentMatch) return;
    let content = contentMatch[1];
    if (tag.match(/^h[1-6]$/)) blocks.push(createBlock(content, tag));
    else if (tag === "blockquote")
      blocks.push(createBlock(content, "blockquote"));
    else if (tag === "ul" || tag === "ol") {
      const listType = tag === "ul" ? "bullet" : "number";
      const items = content.match(/<li(?:\s[^>]*)?>(.+?)<\/li>/gis) || [];
      items.forEach((i) => {
        const itemContent = i.match(/<li(?:\s[^>]*)?>(.+?)<\/li>/is)?.[1] || "";
        const styleMatch = i.match(/data-style="([^"]+)"/);
        blocks.push(
          createBlock(itemContent, styleMatch?.[1] || "normal", listType)
        );
      });
    } else if (tag === "p") blocks.push(createBlock(content, "normal"));
  });
  return blocks.length ? blocks : [createBlock("", "normal")];
}

// 🔹 Translate blocks array
async function translateBlocks(blocks, targetLang) {
  const html = portableToHtml(blocks);
  const translated = await translateHtml(html, targetLang);
  return htmlToPortable(translated);
}

// 🔹 Main process
async function processDocuments() {
  const { docs, fieldsToTranslate } = await fetchDocuments();
  if (!docs.length) return console.log("⚠️ No documents to process");

  for (const doc of docs) {
    console.log(
      `\n${"=".repeat(60)}\nProcessing doc: ${doc._id}\n${"=".repeat(60)}`
    );
    const projection = fieldsToTranslate.map((f) => `"${f}": ${f}`).join(",\n");
    const docData = await client.fetch(`*[_id==$id][0]{${projection}}`, {
      id: doc._id,
    });
    const allPatches = {};

    for (const fieldName of fieldsToTranslate) {
      const fieldValue = _.get(docData, fieldName);
      if (!fieldValue?.length) {
        console.log(`⏭️ Skipping ${fieldName} - no data`);
        continue;
      }

      console.log(`\n🔄 Processing field: ${fieldName}`);
      const sourceEntry =
        fieldValue.find(
          (d) =>
            d.language?.toUpperCase() === config.preferredSourceLang &&
            (d.blocks || d.text)
        ) || fieldValue.find((d) => d.blocks || d.text);
      if (!sourceEntry) {
        console.log(`⚠️ No source entry found for ${fieldName}`);
        continue;
      }

      const patches = [];
      for (const lang of config.targetLangs) {
        if (fieldValue.find((d) => d.language?.toUpperCase() === lang)) {
          console.log(`⏭️ Skipping ${lang} - already exists`);
          continue;
        }
        console.log(`🌍 Translating to ${lang}...`);
        let newEntry;
        if (sourceEntry.blocks) {
          const translatedBlocks = await translateBlocks(
            sourceEntry.blocks,
            lang
          );
          newEntry = {
            _key: generateKey(),
            language: lang.toLowerCase(),
            blocks: translatedBlocks,
          };
        } else if (sourceEntry.text) {
          const translatedText = await translateHtml(sourceEntry.text, lang);
          newEntry = {
            _key: generateKey(),
            language: lang.toLowerCase(),
            text: translatedText,
          };
        }
        patches.push(newEntry);
      }
      if (patches.length) allPatches[fieldName] = patches;
    }

    if (Object.keys(allPatches).length) {
      let patchOp = client.patch(doc._id);
      for (const [fieldName, patches] of Object.entries(allPatches)) {
        patchOp = patchOp.setIfMissing({ [fieldName]: [] });
        patchOp = patchOp.append(fieldName, patches);
      }
      if (!config.dryRun) {
        await patchOp.commit();
        console.log(`✅ Updated doc ${doc._id} with translations`);
      } else console.log(`🔍 [DRY RUN] Would update doc ${doc._id}`);
    } else console.log(`⏭️ No translations needed for ${doc._id}`);
  }
}

processDocuments().catch((err) => console.error("❌ Script error:", err));
