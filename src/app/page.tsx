import styles from './page.module.css';
import Map from './components/Map';
import Description from './components/Description';
import Grid from './components/Grid';

export default function Page() {
    return (
        <main className={styles.main}>
            <Description />
            <Map />
            <Grid />
        </main>
    );
}
