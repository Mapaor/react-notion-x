import { siteConfig } from './lib/site-config'

export default siteConfig({
  // Required: The site's root Notion page ID
  rootNotionPageId: '8bd15a8ab05741838e4f142ce7f9292e', // Aram Molins (canviar-ho dp)

  // Basic site info
  name: 'Física UB Website',
  domain: 'localhost',
  author: 'Martí',
  description:
    'Web col·laborativa de Física UB. Aquesta és una web estàtica generada a partir de fisicaubwiki.notion.site mitjançant react-notion-x',

  // Social usernames (if empty, they’re ignored)
  twitter: '',
  github: 'Mapaor/react-notion-x',
  linkedin: '',

  // Default icon and cover
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // Preview images support flag
  isPreviewImageSupportEnabled: false,
  isRedisEnabled: false,

  // Navigation configuration
  pageUrlOverrides: null,
  navigationStyle: 'default', // use 'default' per la versió mínima
  navigationLinks: null
})
