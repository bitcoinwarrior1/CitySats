import styles from './page.module.css';
import Map from './components/Map';
import Description from './components/description';
import Grid from './components/grid';

export default function Page() {
    return (
        <main className={styles.main}>
            <Description />
            <Map />
            <Grid />
        </main>
    );
}
