import type { ExtendedRecordMap } from 'notion-types'
import Head from 'next/head'
import { getPageTitle } from 'notion-utils'
import { NotionRenderer } from 'react-notion-x'

import { Footer } from './footer'

export function NotionPage({
  recordMap,
  previewImagesEnabled,
  rootPageId,
  rootDomain
}: {
  recordMap: ExtendedRecordMap
  previewImagesEnabled?: boolean
  rootPageId?: string
  rootDomain?: string
}) {
  const title = getPageTitle(recordMap)
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta name='twitter:title' content={title} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        rootDomain={rootDomain}
        rootPageId={rootPageId}
        previewImages={previewImagesEnabled}
      />
      <Footer />
    </>
  )
}
