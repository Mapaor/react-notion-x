import rawSiteConfig from '../site.config'
import { type SiteConfig } from './site-config'

if (!rawSiteConfig) {
  throw new Error(`Config error: invalid site.config.ts`)
}

// Permet que variables d’entorn sobreescriguin site.config.ts
let siteConfigOverrides: SiteConfig = {} as SiteConfig

try {
  if (process.env.NEXT_PUBLIC_SITE_CONFIG) {
    siteConfigOverrides = JSON.parse(process.env.NEXT_PUBLIC_SITE_CONFIG)
  }
} catch (err) {
  console.error('Invalid config "NEXT_PUBLIC_SITE_CONFIG" failed to parse')
  throw err
}

const siteConfig: SiteConfig = {
  ...rawSiteConfig,
  ...siteConfigOverrides
}

export function getSiteConfig<T>(key: string, defaultValue?: T): T {
  // fem servir el key com a property del SiteConfig
  const value = siteConfig[key as keyof SiteConfig]
  if (value !== undefined) {
    return value as T
  }
  if (defaultValue !== undefined) {
    return defaultValue
  }
  throw new Error(`Config error: missing required site config value "${key}"`)
}

export function getEnv(
  key: string,
  defaultValue?: string,
  env = process.env
): string {
  const value = env[key]
  if (value !== undefined) {
    return value
  }
  if (defaultValue !== undefined) {
    return defaultValue
  }
  throw new Error(`Config error: missing required env variable "${key}"`)
}
