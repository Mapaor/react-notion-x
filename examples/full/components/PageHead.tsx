import Head from 'next/head'
import * as React from 'react'

// import type * as types from '@/lib/types'
import * as config from '@/lib/config'
// import { getSocialImageUrl } from '@/lib/get-social-image-url'

export function PageHead(props: {
  title?: string
  description?: string
  image?: string
  url?: string
}) {
  const { title: propTitle, description: propDescription, image, url } = props

  const title = propTitle || 'Default Title'
  const description = propDescription || 'Default Description'

  return (
    <Head>
      {/* Metadades bàsiques */}
      <meta charSet='utf-8' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover'
      />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='black' />
      <meta
        name='theme-color'
        media='(prefers-color-scheme: light)'
        content='#fefffe'
        key='theme-color-light'
      />

      {/* Robots i SEO */}
      <meta name='robots' content='index,follow' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta name='description' content={description} />
      <meta property='og:description' content={description} />

      {/* Canonical URL */}
      {url && (
        <>
          <link rel='canonical' href={url} />
          <meta property='og:url' content={url} />
        </>
      )}

      {/* Site name */}
      {/* {site?.name && <meta property="og:site_name" content={site.name} />} */}

      {/* Social image */}
      {image && <meta property='og:image' content={image} />}

      {/* RSS Feed */}
      <link
        rel='alternate'
        type='application/rss+xml'
        href={`${config.host}/feed`}
        // title={site?.name || ''}
      />

      {/* Títol de la pàgina */}
      <title>{title}</title>
    </Head>
  )
}
