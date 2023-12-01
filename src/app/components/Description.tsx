import styles from '../page.module.css';

export default function Description() {
    return (
        <div className={styles.description}>
            <h1>
                <a href={'/'}>CitySats.com</a>
            </h1>
            <p className={styles.disclaimer}>
                Site under development. Not ready for use.
            </p>
            <div>
                <h3>Buy/sell bitcoin face to face, anon & with cash</h3>
            </div>
        </div>
    );
}
