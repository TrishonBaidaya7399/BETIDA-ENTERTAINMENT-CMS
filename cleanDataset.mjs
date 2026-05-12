// cleanDataset.mjs
import fs from 'fs'
import path from 'path'
import * as tar from 'tar'
import https from 'https'

const inputTar = './production-clean.tar.gz'
const tempDir = './temp_dataset'
const outputTar = './production-clean.tar.gz'

async function urlExists(url) {
  return new Promise((resolve) => {
    https.request(url, { method: 'HEAD' }, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400)
    }).on('error', () => resolve(false)).end()
  })
}

async function cleanDataset() {
  // 1️⃣ Extract tar.gz
  fs.mkdirSync(tempDir, { recursive: true })
  await tar.x({ file: inputTar, C: tempDir })

  const files = fs.readdirSync(tempDir)

  // 2️⃣ Clean .ndjson files
  for (const file of files) {
    if (!file.endsWith('.ndjson')) continue

    const filePath = path.join(tempDir, file)
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean)

    const invalidAssetIds = new Set()
    const assetLines = []
    const otherLines = []

    for (const line of lines) {
      const doc = JSON.parse(line.replace(/\uFFFD/g, ''))
      if (doc._type === 'sanity.imageAsset' || doc._type === 'sanity.fileAsset') {
        assetLines.push(doc)
      } else {
        otherLines.push(doc)
      }
    }

    // 3️⃣ Validate each asset URL
    process.stdout.write(`🔍 Validating ${assetLines.length} asset documents...\n`)
    let removed = 0

    const validAssetLines = []
    for (const doc of assetLines) {
      const exists = await urlExists(doc.url)
      if (!exists) {
        process.stdout.write(`  ⚠️  Removing broken asset: ${doc._id}\n`)
        invalidAssetIds.add(doc._id)
        removed++
      } else {
        validAssetLines.push(doc)
      }
    }

    // 4️⃣ Remove content docs referencing broken assets
    const validOtherLines = otherLines.filter((doc) => {
      const str = JSON.stringify(doc)
      return ![...invalidAssetIds].some((id) => str.includes(id))
    })

    const removedRefs = otherLines.length - validOtherLines.length
    if (removedRefs > 0) {
      process.stdout.write(`  🔗 Removed ${removedRefs} docs referencing broken assets\n`)
    }

    // 5️⃣ Write cleaned file
    const allCleanedLines = [...validAssetLines, ...validOtherLines]
    fs.writeFileSync(filePath, allCleanedLines.map((d) => JSON.stringify(d)).join('\n'), 'utf-8')

    process.stdout.write(`✅ Done: removed ${removed} broken assets from ${file}\n`)
  }

  // 6️⃣ Re-package
  await tar.c({ gzip: true, file: outputTar, cwd: tempDir }, files)

  process.stdout.write('✅ Cleaned dataset ready: ' + outputTar + '\n')
}

cleanDataset().catch((err) => process.stderr.write(err.message + '\n'))