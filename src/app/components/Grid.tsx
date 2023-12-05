import styles from '../page.module.css';

export default function Grid() {
    return (
        <div className={styles.grid}>
            <a
                href="/account"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
            >
                <h2>
                    My Account <span>-&gt;</span>
                </h2>
                <p>Go to your CitySats.com account.</p>
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
        </div>
    );
}
