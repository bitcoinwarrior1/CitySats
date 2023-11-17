import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>
         CitySats.com
        </h1>
        <div>
          <a
            href="https://github.com/James-Sangalli/CitySats"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/github-mark.svg"
              alt="GitHub Logo"
              className={styles.vercelLogo}
              width={40}
              height={40}
              priority
            />
          </a>
        </div>
      </div>

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
            Safety <span>-&gt;</span>
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
