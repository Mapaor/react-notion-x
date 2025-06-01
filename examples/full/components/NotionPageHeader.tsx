import type * as types from 'notion-types'
import cs from 'classnames'
import * as React from 'react'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'

export function NotionPageHeader({
  block
}: {
  block: types.CollectionViewPageBlock | types.PageBlock
}) {
  const { components, mapPageUrl } = useNotionContext()

  // Si navigationStyle és "default", utilitza el component Header predeterminat.
  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
        <Breadcrumbs block={block} rootOnly={true} />
        <div className='notion-nav-header-rhs'>
          {navigationLinks &&
            navigationLinks.map((link, index) => {
              if (!link) return null

              if (link.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    key={index}
                    className={cs('navLink')}
                  >
                    {link.title}
                  </components.PageLink>
                )
              } else if (link.url) {
                return (
                  <components.Link
                    href={link.url}
                    key={index}
                    className={cs('navLink')}
                  >
                    {link.title}
                  </components.Link>
                )
              }
              return null
            })}
          {isSearchEnabled && <Search block={block} title={null} />}
        </div>
      </div>
    </header>
  )
}
