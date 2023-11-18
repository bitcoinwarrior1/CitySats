import styles from '../page.module.css';
import Description from '../components/description';
import Grid from '../components/grid';
import LoginBtn from '../components/login-btn';

export default function Page() {
    return (
        <main className={styles.main}>
            <Description />
            <LoginBtn />
            <Grid />
        </main>
    );
}
