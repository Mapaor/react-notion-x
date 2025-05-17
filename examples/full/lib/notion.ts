import type {
  ExtendedRecordMap,
  SearchParams,
  SearchResults
} from 'notion-types'

import { notion } from './notion-api'

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  return notion.getPage(pageId)
}

export async function search(params: SearchParams): Promise<SearchResults> {
  return notion.search(params)
}
