import type { SearchParams, SearchResults } from 'notion-types'
import ExpiryMap from 'expiry-map'
import fetch from 'isomorphic-unfetch'
import pMemoize from 'p-memoize'

import { api } from './config'

export const searchNotion = pMemoize(searchNotionImpl, {
  cacheKey: (args) => args[0]?.query,
  cache: new ExpiryMap(10_000)
})

async function searchNotionImpl(params: SearchParams): Promise<SearchResults> {
  const res = await fetch(api.searchNotion, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { 'content-type': 'application/json' }
  })

  if (!res.ok) {
    const error: any = new Error(res.statusText)
    error.response = res
    throw error
  }

  return res.json()
}
