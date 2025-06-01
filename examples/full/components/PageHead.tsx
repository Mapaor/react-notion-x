import Head from 'next/head'
import * as React from 'react'

import type * as types from '@/lib/types'
import * as config from '@/lib/config'
import { getSocialImageUrl } from '@/lib/get-social-image-url'

export function PageHead(
  props: types.PageProps & {
    title?: string
    description?: string
    image?: string
    url?: string
  }
) {
  const {
    site,
    title: propTitle,
    description: propDescription,
    pageId,
    image,
    url
  } = props
  const rssFeedUrl = `${config.host}/feed`

  // Defineix títol i descripció amb fallback al site
  const title = propTitle || site?.name || ''
  const description = propDescription || site?.description || ''

  // Obté la social image: prioritza la generada o la passada com a paràmetre
  const socialImageUrl = getSocialImageUrl(pageId) || image || ''

  return (
    // eslint-disable-next-line react/no-children-prop
    <Head children={''}>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>{title}</title>

      {description && <meta name='description' content={description} />}
      {socialImageUrl && <meta property='og:image' content={socialImageUrl} />}
      {url && <link rel='canonical' href={url} />}

      <link
        rel='alternate'
        type='application/rss+xml'
        href={rssFeedUrl}
        title={site?.name || ''}
      />
    </Head>
  )
}
