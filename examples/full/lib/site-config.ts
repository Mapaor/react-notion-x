export function siteConfig<T>(config: T): T {
  return config
}

export type SiteConfig = {
  rootNotionPageId: string
  name: string
  domain: string
  author: string
  description: string
  twitter?: string | null
  github?: string | null
  linkedin?: string | null
  defaultPageIcon?: string | null
  defaultPageCover?: string | null
  defaultPageCoverPosition?: number
  isPreviewImageSupportEnabled?: boolean
  isRedisEnabled?: boolean
  pageUrlOverrides?: any
  navigationStyle?: 'default' | 'custom'
  navigationLinks?: any
}
