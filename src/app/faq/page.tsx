import styles from '../page.module.css';
import Description from '../components/Description';
import Grid from '../components/Grid';

export default function Page() {
    return (
        <main className={styles.main}>
            <Description />
            <div id={'faq'}>
                <h2>FAQ</h2>
                <br></br>
                <h4>Why should I use this site over a traditional exchange?</h4>
                <br></br>
                <p>
                    This site is perfect for anybody looking to buy/sell bitcoin
                    in their local area, with cash and without KYC or an ID.
                    Most exchanges today require ID and KYC verification, while
                    also imposing other restrictions. Many banks also impose
                    transfer limits to exchanges, and many exchanges are also
                    obliged to freeze users accounts.{' '}
                </p>
                <br></br>
                <p>
                    This site is perfect for anybody looking to do simple cash
                    trades, without worrying about leaking their privacy, or
                    having their accounts frozen.
                </p>
                <br></br>
                <h4>How can I stay safe while using this site?</h4>
                <br></br>
                <p>
                    Please refer to the <a href={'safety'}>Safety & Rules</a>{' '}
                    page for more info.
                </p>
                <br></br>
                <h4>What are your fees?</h4>
                <br></br>
                <p>Using this site is completely free.</p>
                <br></br>
                <h4>Is this website opensource?</h4>
                <br></br>
                <p>
                    Yes, you can find the code here:
                    https://github.com/James-Sangalli/CitySats.
                </p>
            </div>
            <Grid />
        </main>
    );
}
