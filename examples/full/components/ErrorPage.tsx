import { PageHead } from './PageHead'
import styles from './styles.module.css'

export function ErrorPage({ statusCode }: { statusCode: number }) {
  const title = 'Error'

  return (
    <>
      <PageHead
        title={title}
        site={{
          domain: '',
          name: '',
          rootNotionPageId: '',
          rootNotionSpaceId: '',
          description: ''
        }}
        pageId={'error'}
      />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1>Error Loading Page</h1>

          {statusCode && <p>Error code: {statusCode}</p>}

          <img src='/error.png' alt='Error' className={styles.errorImage} />
        </main>
      </div>
    </>
  )
}
