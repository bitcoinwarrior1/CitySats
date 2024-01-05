import styles from '../page.module.css';

export default function Grid() {
    return (
        <div className={styles.grid}>
            <a
                href="/"
                className={styles.card}
                rel="noopener noreferrer"
            >
                <h2>Home</h2>
            </a>
            <a
                href="/account"
                className={styles.card}
                rel="noopener noreferrer"
            >
                <h2>Account</h2>
            </a>

            <a
                href="/faq"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
            >
                <h2>About</h2>
            </a>
        </div>
    );
}
