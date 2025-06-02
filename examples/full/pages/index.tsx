import { type ExtendedRecordMap } from 'notion-types'

import {
  previewImagesEnabled,
  rootDomain,
  rootNotionPageId
} from '@/lib/config'

import { NotionPage } from '../components/NotionPage'
import * as notion from '../lib/notion'

export const getStaticProps = async () => {
  const pageId = rootNotionPageId
  console.log(`Fetching static props for rootNotionPageId=${rootNotionPageId}`)
  const recordMap = await notion.getPage(pageId)
  console.log(`RecordMap fetched: ${recordMap ? 'success' : 'failure'}`)

  if (
    !recordMap ||
    !recordMap.block ||
    Object.keys(recordMap.block).length === 0
  ) {
    console.error(
      `Error: No data found for rootNotionPageId=${rootNotionPageId}`
    )
    return { notFound: true }
  }

  return {
    props: {
      recordMap
    },
    revalidate: 3600 // Fem redeploy cada 1h
  }
}

export default function Page({
  recordMap
}: {
  recordMap: ExtendedRecordMap
  previewImagesEnabled: boolean
}) {
  return (
    <>
      <NotionPage
        recordMap={recordMap}
        rootDomain={rootDomain}
        rootPageId={rootNotionPageId}
        previewImagesEnabled={previewImagesEnabled}
      />
    </>
  )
}
