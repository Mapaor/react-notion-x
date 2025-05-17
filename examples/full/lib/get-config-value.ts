import type { SiteConfig } from './site-config'
import rawSiteConfig from '../site.config'

if (!rawSiteConfig) {
  throw new Error(`Config error: invalid site.config.ts`)
}

// Si no hi ha sobreescriptures, podem usar un objecte buit
let siteConfigOverrides: SiteConfig = {} as SiteConfig

try {
  if (process.env.NEXT_PUBLIC_SITE_CONFIG) {
    siteConfigOverrides = JSON.parse(process.env.NEXT_PUBLIC_SITE_CONFIG)
  }
} catch (err) {
  console.error('Invalid config "NEXT_PUBLIC_SITE_CONFIG" failed to parse')
  throw err
}

const navigationStyle =
  siteConfigOverrides.navigationStyle ?? rawSiteConfig.navigationStyle

const siteConfig: SiteConfig = {
  ...rawSiteConfig,
  ...siteConfigOverrides,
  navigationStyle: navigationStyle === 'custom' ? 'custom' : 'default'
}

export function getSiteConfig<T>(key: string, defaultValue?: T): T {
  const value = siteConfig[key]
  if (value !== undefined) {
    return value
  }
  return defaultValue as T
}
