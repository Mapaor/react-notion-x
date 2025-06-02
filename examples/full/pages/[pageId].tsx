import { type ExtendedRecordMap } from 'notion-types'
import { defaultMapPageUrl, getAllPagesInSpace } from 'notion-utils'

import { NotionPage } from '../components/NotionPage'
import {
  isDev,
  previewImagesEnabled,
  rootDomain,
  rootNotionPageId,
  rootNotionSpaceId
} from '../lib/config'
import * as notion from '../lib/notion'

export const getStaticProps = async (context) => {
  const pageId = context.params.pageId as string
  console.log(`Fetching static props for pageId=${context.params.pageId}`)

  let recordMap
  try {
    recordMap = await notion.getPage(pageId)
  } catch (err) {
    console.error(`Error fetching page data for pageId: ${pageId}`, err)
    return {
      notFound: true
    }
  }

  if (
    !recordMap ||
    !recordMap.block ||
    Object.keys(recordMap.block).length === 0
  ) {
    console.error(`Error: No data found for pageId=${context.params.pageId}`)
    return {
      notFound: true
    }
  } else {
    console.log(
      `RecordMap fetched successfully for pageId=${context.params.pageId}`
    )
  }

  return {
    props: {
      recordMap,
      rootDomain,
      rootNotionPageId,
      previewImagesEnabled
    },
    revalidate: 604_800 // Fem redeploy 1 cop a la setmana
  }
}

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true
    }
  }

  const mapPageUrl = defaultMapPageUrl(rootNotionPageId)

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const pages = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage,
    {
      traverseCollections: false
    }
  )

  console.log(`TOTAL DE PÀGINES TROBADES(!!!): ${Object.keys(pages).length}`)

  const paths = Object.keys(pages)
    .map((pageId) => mapPageUrl(pageId))
    .filter((path) => path && path !== '/')

  return {
    paths,
    fallback: true
  }
}

export default function Page({ recordMap }: { recordMap: ExtendedRecordMap }) {
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
