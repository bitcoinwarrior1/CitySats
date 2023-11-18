import styles from "@/app/page.module.css";
import Description from "@/app/components/description";
import Grid from "@/app/components/grid";

export default function Page() {
    return (
        <main className={styles.main}>
            <Description/>
            <Grid/>
        </main>
    )
}