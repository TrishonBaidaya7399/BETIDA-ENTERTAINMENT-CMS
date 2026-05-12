// scripts/watch-order-rank.ts
import {createClient, MutationEvent} from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'igf6eeh7',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
})

const SUPPORTED_LANGUAGES = ['tr', 'de', 'es', 'fr', 'pt', 'ru', 'ar', 'hi', 'zh']
const SCHEMA_TYPE = ['termsDocument']

console.log(`👀 Watching for orderRank changes on ${SCHEMA_TYPE}...`)

const subscription = client
  .listen(
    `*[_type == $type && language == "en" && defined(orderRank)]`,
    {type: SCHEMA_TYPE},
    {visibility: 'query'},
  )
  .subscribe(async (update) => {
    // ✅ Filter to only MutationEvents — ignore ReconnectEvent and WelcomeEvent
    if (update.type !== 'mutation') return

    const mutationEvent = update as MutationEvent
    if (mutationEvent.transition !== 'update') return

    const doc = mutationEvent.result as any
    if (!doc?.orderRank || doc?._id?.includes('__i18n_')) return

    const baseId = doc._id.replace(/^drafts\./, '')
    console.log(`\n🔄 orderRank changed for: ${doc._id}`)

    const translatedIds = SUPPORTED_LANGUAGES.map((lang) => `${baseId}__i18n_${lang}`)

    const existingDocs = await client.fetch<{_id: string}[]>(`*[_id in $ids]{ _id }`, {
      ids: translatedIds,
    })

    if (existingDocs.length === 0) {
      console.log('  No translations found — skipping')
      return
    }

    const transaction = client.transaction()
    existingDocs.forEach(({_id}) => {
      transaction.patch(_id, {
        set: {orderRank: doc.orderRank},
      })
    })

    await transaction.commit()
    console.log(`  ✅ Synced to ${existingDocs.length} translations`)
  })

// Keep process alive
process.on('SIGINT', () => {
  subscription.unsubscribe()
  process.exit(0)
})
