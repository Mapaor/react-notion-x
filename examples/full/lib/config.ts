/**
 * Site-wide app configuration.
 *
 * Aquest fitxer extreu valors des del fitxer arrel "site.config.ts" i variables
 * d’entorn per a dependències opcionals.
 */
import { parsePageId } from 'notion-utils'

import { getEnv, getSiteConfig } from './get-config-value'
import { type NavigationLink } from './site-config'
import { type NavigationStyle, type Site } from './types'

export const rootNotionPageId: string = parsePageId(
  getSiteConfig('rootNotionPageId'),
  { uuid: false }
)
console.log(`Root Notion Page ID: ${rootNotionPageId}`)
if (!rootNotionPageId) {
  console.error('Error: rootNotionPageId no està configurat correctament')
  throw new Error('Config error: invalid "rootNotionPageId"')
}

// Si vols restringir les pàgines a un sol espai de treball Notion (opcional)
export const rootNotionSpaceId: string | null = parsePageId(
  getSiteConfig('rootNotionSpaceId', null),
  { uuid: true }
)

export const environment = process.env.NODE_ENV || 'development'
export const isDev = environment === 'development'

// Configuració general del lloc
export const name: string = getSiteConfig('name')
export const author: string = getSiteConfig('author')
export const domain: string = getSiteConfig('domain')
export const rootDomain: string = domain // Exportem rootDomain per compatibilitat
export const description: string = getSiteConfig('description', 'Notion Blog')
export const language: string = getSiteConfig('language', 'en')

// Comptes socials
export const twitter: string | null = getSiteConfig('twitter', null)
export const mastodon: string | null = getSiteConfig('mastodon', null)
export const github: string | null = getSiteConfig('github', null)
export const youtube: string | null = getSiteConfig('youtube', null)
export const linkedin: string | null = getSiteConfig('linkedin', null)
export const newsletter: string | null = getSiteConfig('newsletter', null)
export const zhihu: string | null = getSiteConfig('zhihu', null)

export const getMastodonHandle = (): string | null => {
  if (!mastodon) return null
  const url = new URL(mastodon)
  return `${url.pathname.slice(1)}@${url.hostname}`
}

// Valors per a la coherència del disseny de Notion (opcional)
export const defaultPageIcon: string | null = getSiteConfig(
  'defaultPageIcon',
  null
)
export const defaultPageCover: string | null = getSiteConfig(
  'defaultPageCover',
  null
)
export const defaultPageCoverPosition: number = getSiteConfig(
  'defaultPageCoverPosition',
  0.5
)

// Opcional: suport per imatges de previsualització LQIP
export const isPreviewImageSupportEnabled: boolean = getSiteConfig(
  'isPreviewImageSupportEnabled',
  false
)

// Opcional: indicar si s'ha d'incloure l'ID Notion a les URLs de pàgina
export const includeNotionIdInUrls: boolean = getSiteConfig(
  'includeNotionIdInUrls',
  !!isDev
)

export const navigationStyle: NavigationStyle = getSiteConfig(
  'navigationStyle',
  'default'
)
export const navigationLinks: Array<NavigationLink | null> = getSiteConfig(
  'navigationLinks',
  null
)

// Opcional: cerca a nivell del lloc
export const isSearchEnabled: boolean = getSiteConfig('isSearchEnabled', true)

// ----------------------------------------------------------------------------
// Opcional: Redis per desar imatges de previsualització
export const isRedisEnabled: boolean =
  getSiteConfig('isRedisEnabled', false) || !!getEnv('REDIS_ENABLED', null)
export const redisHost: string | null = getEnv('REDIS_HOST', null)
export const redisPassword: string | null = getEnv('REDIS_PASSWORD', null)
export const redisUser: string = getEnv('REDIS_USER', 'default')
export const redisUrl: string = getEnv(
  'REDIS_URL',
  `redis://${redisUser}:${redisPassword}@${redisHost}`
)
export const redisNamespace: string | null = getEnv(
  'REDIS_NAMESPACE',
  'preview-images'
)

// ----------------------------------------------------------------------------
export const isServer = typeof window === 'undefined'
export const port = getEnv('PORT', '3000')
export const host = isDev ? `http://localhost:${port}` : `https://${domain}`
export const apiHost = isDev
  ? host
  : `https://${process.env.VERCEL_URL || domain}`
export const apiBaseUrl = `/api`
export const api = {
  searchNotion: `${apiBaseUrl}/search-notion`,
  getNotionPageInfo: `${apiBaseUrl}/notion-page-info`,
  getSocialImage: `${apiBaseUrl}/social-image`
}

// ----------------------------------------------------------------------------
export const site: Site = {
  domain,
  name,
  rootNotionPageId,
  rootNotionSpaceId,
  description
}

export const fathomId = isDev ? null : process.env.NEXT_PUBLIC_FATHOM_ID
export const fathomConfig = fathomId
  ? { excludedDomains: ['localhost', 'localhost:3000'] }
  : undefined

export const posthogId = process.env.NEXT_PUBLIC_POSTHOG_ID
export const posthogConfig = {
  api_host: 'https://app.posthog.com'
}

export const previewImagesEnabled: boolean = getSiteConfig(
  'previewImagesEnabled',
  false
)
