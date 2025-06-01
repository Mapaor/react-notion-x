import { type ExtendedRecordMap } from 'notion-types'

import { NotionPage } from '../components/NotionPage'
import {
  previewImagesEnabled,
  rootDomain,
  rootNotionPageId
} from '../lib/config'
import * as notion from '../lib/notion'

export const getStaticProps = async () => {
  const pageId = rootNotionPageId
  console.log(`Fetching static props for rootNotionPageId: ${pageId}`)
  const recordMap = await notion.getPage(pageId)
  console.log(`Dades obtingudes per a rootNotionPageId: ${pageId}`, recordMap)

  return {
    props: {
      recordMap
    },
    revalidate: 604_800 // Fem redeploy 1 cop a la setmana
  }
}

export default function Page({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionPage
      recordMap={recordMap}
      rootDomain={rootDomain}
      rootPageId={rootNotionPageId}
      previewImagesEnabled={previewImagesEnabled}
    />
  )
}
