import styles from './page.module.css'
import Map from './components/Map'
import Description from "@/app/components/description";
import Grid from "@/app/components/grid";

export default function Page() {
  return (
    <main className={styles.main}>
      <Description/>
      <Map/>
      <Grid/>
    </main>
  )
}
