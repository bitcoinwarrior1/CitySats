import styles from './page.module.css'
import Map from './components/Map'

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>
         CitySats.com
        </h1>
        <div>
          <h3>Buy/sell bitcoin face to face, anon & with cash</h3>
        </div>
      </div>
      <Map/>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Login/Sign up <span>-&gt;</span>
          </h2>
          <p>Login or create an account with us.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            FAQ <span>-&gt;</span>
          </h2>
          <p>Learn more about CitySats.com.</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Safety & Rules <span>-&gt;</span>
          </h2>
          <p>Learn how to keep yourself safe when buying/selling bitcoin with users on the site.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Meetups <span>-&gt;</span>
          </h2>
          <p>
            Find CitySats meetups in your location.
          </p>
        </a>
      </div>
    </main>
  )
}
