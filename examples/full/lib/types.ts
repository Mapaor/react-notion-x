export type NavigationStyle = 'default' | 'custom'
export type NavigationLink = {
  title: string
  pageId: string
}
export type Site = {
  domain: string
  name: string
  rootNotionPageId: string
  rootNotionSpaceId: string | null
  description: string
}
