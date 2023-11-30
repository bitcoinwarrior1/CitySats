import styles from '../page.module.css';
import Description from '../components/Description';
import Grid from '../components/Grid';

export default function Page() {
    return (
        <main className={styles.main}>
            <Description />
            <div id={'safety'}>
                <h2>How to use this site safely & rules to follow:</h2>
                <br></br>
                <p>1. Read the reviews.</p>
                <br></br>
                <p>
                    2. Only do trades in person, preferably in a public place.
                </p>
                <br></br>
                <p>
                    3. Only buy/sell bitcoin with cash, no bank transfers or
                    Paypal. Please report anybody that asks for payment in
                    anything other than cash.
                </p>
                <br></br>
                <p>4. Report suspicious accounts.</p>
                <br></br>
                <p>
                    5. If there is a local CitySats meetup in your area, feel
                    free to do trades there.
                </p>
                <br></br>
                <p>6. Do not give your ID to anyone on the site.</p>
            </div>
            <Grid />
        </main>
    );
}
