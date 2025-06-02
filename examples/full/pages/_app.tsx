// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
// global styles shared across the entire site
import '../styles/global.css'
// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'
// global style overrides for notion
import '../styles/notion.css'
// global style overrides for prism theme (optional)
import '../styles/prism-theme.css'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import * as React from 'react'
// Importa el Header des del paquet react-notion-x
import { Header } from 'react-notion-x'

import { bootstrap } from '@/lib/bootstrap-client'
import { isServer } from '@/lib/config'

if (!isServer) {
  bootstrap()
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    // Sense codi d'analítica; simplement es pot gestionar altres efectes si cal
    return () => {
      // neteja si s'afegeixen efectes futurs
    }
  }, [router.events])

  // Si pageProps.block no està definit, fem fallback a un objecte amb id buit per evitar errors.
  const globalBlock = pageProps.block || { id: '' }

  return (
    <>
      <Header block={globalBlock} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
