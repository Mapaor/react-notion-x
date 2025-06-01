import type {
  ExtendedRecordMap,
  SearchParams,
  SearchResults
} from 'notion-types'
import { NotionAPI } from 'notion-client'
import { mergeRecordMaps } from 'notion-utils'
import pMap from 'p-map'
import pMemoize from 'p-memoize'

import {
  isPreviewImageSupportEnabled,
  navigationLinks,
  navigationStyle,
  previewImagesEnabled
} from './config'
import { getPreviewImageMap } from './preview-images'

// Utilitza sempre la API no oficial
const notion = new NotionAPI()

// Memoitza les pàgines dels enllaços de navegació per evitar consultes repetides
const getNavigationLinkPages = pMemoize(
  async (): Promise<ExtendedRecordMap[]> => {
    const navigationLinkPageIds = (navigationLinks || [])
      .map((link) => link.pageId)
      .filter(Boolean)

    if (navigationStyle !== 'default' && navigationLinkPageIds.length) {
      return pMap(
        navigationLinkPageIds,
        async (navigationLinkPageId) =>
          notion.getPage(navigationLinkPageId, {
            chunkLimit: 1,
            fetchMissingBlocks: false,
            fetchCollections: false,
            signFileUrls: false
          }),
        { concurrency: 4 }
      )
    }
    return []
  }
)

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  console.log(`Fetching page data for pageId: ${pageId}`)
  let recordMap

  try {
    recordMap = await notion.getPage(pageId)
    console.log(`Dades obtingudes per a pageId: ${pageId}`, recordMap)
  } catch (err) {
    console.error(`Error fetching page data for pageId: ${pageId}`, err)
    throw new Error(`Error fetching page data for pageId: ${pageId}`)
  }

  if (
    !recordMap ||
    !recordMap.block ||
    Object.keys(recordMap.block).length === 0
  ) {
    console.error(
      `Error: No s'han trobat dades per a la pàgina amb ID ${pageId}`
    )
    throw new Error(
      `Error: No s'han trobat dades per a la pàgina amb ID ${pageId}`
    )
  }

  // Si es fa servir una navegació personalitzada, fusiona els record maps
  if (navigationStyle !== 'default') {
    const navigationLinkRecordMaps = await getNavigationLinkPages()
    if (navigationLinkRecordMaps?.length) {
      recordMap = navigationLinkRecordMaps.reduce(
        (map, navigationLinkRecordMap) =>
          mergeRecordMaps(map, navigationLinkRecordMap),
        recordMap
      )
    }
  }

  // Afegir el map de previsualització si està habilitat
  if (isPreviewImageSupportEnabled || previewImagesEnabled) {
    const previewImageMap = await getPreviewImageMap(recordMap)
    ;(recordMap as any).preview_images = previewImageMap
  }

  return recordMap
}

export async function search(params: SearchParams): Promise<SearchResults> {
  if ('search' in notion) {
    return notion.search(params)
  } else {
    throw new Error('Notion API does not support search')
  }
}
