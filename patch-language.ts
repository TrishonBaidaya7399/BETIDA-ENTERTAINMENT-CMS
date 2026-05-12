// patch-language.ts
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'igf6eeh7',
  dataset: 'production',
  apiVersion: '2025-02-19',
  token: 'sk3sVyfO6Nq4opRyPtMtjyrE32pCBtsTkvDFVBp9GwygCoMkmoKJ5P3udCwL6YlJq7BAIcO7QQ8TNg1rm6twwLoUtXUrddx5PPd4WOotzhhNj8FOFYeUH8ICTH4ylWtrk1R5hj6B2FQUPYVibXzk47IjCxyikMbMxLLL9XZya87GCdstZebi',
  useCdn: false,
})

async function patchMissingLanguage() {
  const docs = await client.fetch(`*[_type == "newBlogs" && !defined(language)]{_id}`)

  for (const doc of docs) {
    await client
      .patch(doc._id)
      .set({language: 'en'}) // set a default language
      .commit()
    console.log(`Patched: ${doc._id}`)
  }
}

patchMissingLanguage()
