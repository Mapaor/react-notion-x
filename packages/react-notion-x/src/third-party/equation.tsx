import Katex from '@matejmazur/react-katex'
import { type EquationBlock } from 'notion-types'
import { getBlockTitle } from 'notion-utils'
import * as React from 'react'

import { useNotionContext } from '../context'
import { cs } from '../utils'

const katexSettings = {
  throwOnError: false,
  strict: false
}

function highlightLatex(latex: string): string {
  let content = latex.trim()
  if (content.startsWith('$$') && content.endsWith('$$')) {
    content = content.slice(2, -2).trim()
  }
  // Highlight LaTeX commands in red
  content = content.replaceAll(
    /(\\[A-Za-z]+)/g,
    '<span class="highlight-red">$1</span>'
  )
  content = content.replaceAll(
    /(\\.)/g,
    '<span class="highlight-red">$1</span>'
  )
  // Highlight commands inside \begin{...} in blue
  content = content.replaceAll(
    /((?<=\\begin{)\w+(?=}))/g,
    '<span class="highlight-blue">$1</span>'
  )
  // Highlight brackets in gray (using negative lookbehind)
  content = content.replaceAll(
    /(((?<!\\){|(?<!\\)}|(?<!\\)\[|(?<!\\)]))/g,
    '<span class="highlight-gray">$1</span>'
  )
  content = content.replaceAll(
    /(?<!\\)%(.*)$/gm,
    '<span class="highlight-gray">%$1</span>'
  )
  return content
}

export function Equation({
  block,
  math,
  inline = false,
  className,
  ...rest
}: {
  block: EquationBlock
  math?: string
  inline?: boolean
  className?: string
}) {
  const { recordMap } = useNotionContext()

  // Compute math expression first.
  const computedMath = math || getBlockTitle(block, recordMap)
  const [showLatex, setShowLatex] = React.useState(false)
  const highlightedLatex = React.useMemo(
    () => (computedMath ? highlightLatex(computedMath) : ''),
    [computedMath]
  )

  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowLatex(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!computedMath) return null

  return (
    <div
      className={cs(
        'equation',
        inline ? 'equation-inline' : 'equation-block',
        className
      )}
      ref={containerRef}
    >
      <span
        role='button'
        tabIndex={0}
        onClick={() => setShowLatex(!showLatex)}
        className={cs(
          'notion-equation',
          inline ? 'notion-equation-inline' : 'notion-equation-block'
        )}
      >
        <Katex
          math={computedMath}
          settings={katexSettings}
          {...rest}
          block={!inline}
        />
      </span>
      {showLatex && (
        <pre
          className='latex-code'
          dangerouslySetInnerHTML={{ __html: highlightedLatex }}
        />
      )}
    </div>
  )
}
