import styles from "@/app/page.module.css";

export default function Grid() {
    return <div className={styles.grid}>
        <a
            href="/login"
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
            href="/faq"
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
            href="/safety"
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
            href="https://www.meetup.com/citysats/"
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
}