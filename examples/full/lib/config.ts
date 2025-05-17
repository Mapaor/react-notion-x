import { parsePageId } from 'notion-utils'

import type { NavigationLink, NavigationStyle, Site } from './types'
import { getSiteConfig } from './get-config-value'

export const rootNotionPageId: string = parsePageId(
  getSiteConfig('rootNotionPageId'),
  { uuid: false }
)
if (!rootNotionPageId) {
  throw new Error('Config error: invalid "rootNotionPageId"')
}

export const rootNotionSpaceId: string | null = getSiteConfig(
  'rootNotionSpaceId',
  null
)

export const name: string = getSiteConfig('name')
export const author: string = getSiteConfig('author')
export const domain: string = getSiteConfig('domain')
export const description: string = getSiteConfig('description', 'Notion Blog')
export const language: string = getSiteConfig('language', 'en')

// Social media
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

// Defaults for Notion appearance (optional)
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

// Preview images flag
export const isPreviewImageSupportEnabled: boolean = getSiteConfig(
  'isPreviewImageSupportEnabled',
  false
)

// Navigation configuration
export const navigationStyle: NavigationStyle = getSiteConfig(
  'navigationStyle',
  'default'
)
export const navigationLinks: Array<NavigationLink | null> = getSiteConfig(
  'navigationLinks',
  null
)

// Build a minimal Site object
export const site: Site = {
  domain,
  name,
  rootNotionPageId,
  rootNotionSpaceId,
  description
}
