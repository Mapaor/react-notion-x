import { type ExtendedRecordMap } from 'notion-types'
import {
  getCanonicalPageId as getCanonicalPageIdImpl,
  parsePageId
} from 'notion-utils'

import { inversePageUrlOverrides } from './config'

export function getCanonicalPageId(
  pageId: string,
  recordMap: ExtendedRecordMap,
  { uuid = false }: { uuid?: boolean } = {}
): string | null {
  const cleanPageId = parsePageId(pageId, { uuid: false })
  if (!cleanPageId) {
    return null
  }

  const override = inversePageUrlOverrides[cleanPageId]
  console.log(`Resolving canonical page ID: pageId=${pageId}, uuid=${uuid}`)

  if (override) {
    console.log(`Found override for pageId=${pageId}: ${override}`)
    return override
  } else {
    console.log(`Using default canonical page ID for pageId=${pageId}`)
    return getCanonicalPageIdImpl(pageId, recordMap, {
      uuid
    })
  }
}
