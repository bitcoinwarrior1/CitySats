import styles from '../page.module.css';

export default function Grid() {
    return (
        <div className={styles.grid}>
            <a href="/" className={styles.card} rel="noopener noreferrer">
                <h3>Home</h3>
            </a>
            <a
                href="/account"
                className={styles.card}
                rel="noopener noreferrer"
            >
                <h3>Account</h3>
            </a>
            <a
                href="/faq"
                className={styles.card}
                rel="noopener noreferrer"
            >
                <h3>About</h3>
            </a>
        </div>
    );
}
