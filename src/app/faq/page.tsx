import styles from '../page.module.css';
import Description from '../components/Description';
import Grid from '../components/Grid';

export default function Page() {
    return (
        <main className={styles.main}>
            <Description />
            <div id={styles.faq}>
                <h2>FAQ</h2>
                <br></br>
                <h4>Why should I use this site over a traditional exchange?</h4>
                <br></br>
                <p>
                    This site is perfect for anybody looking to buy/sell bitcoin
                    in their local area, with cash and without KYC or ID. Most
                    exchanges today require ID and KYC verification, impose
                    arbitrary restrictions and can freeze your account without
                    reason. Many banks also impose transfer limits to exchanges
                    or account closures to those they deem suspicious.
                </p>
                <br></br>
                <p>
                    This site is perfect for anybody looking to do simple cash
                    trades, without worrying about leaking their privacy, or
                    having their accounts frozen.
                </p>
                <br></br>
                <h4>What are your fees?</h4>
                <br></br>
                <p>
                    Using this site is completely free, but you must use it at
                    your own risk. CitySats is not able to mediate disputes.{' '}
                </p>
                <br></br>
                <h4>Is this website opensource?</h4>
                <br></br>
                <p>
                    Yes, you can find the code here:
                    https://github.com/James-Sangalli/CitySats.
                </p>
                <br></br>
                <h4>How to use this site safely</h4>
                <br></br>
                <p>1. Favour accounts with good ratings/reviews.</p>
                <br></br>
                <p>
                    2. Only do trades in person, preferably in a public place.
                </p>
                <br></br>
                <p>
                    3. Only buy/sell bitcoin with cash, no bank transfers or
                    Paypal. If over time you build trust with a particular user,
                    you may decide to use other methods (at your own risk).
                </p>
                <br></br>
                <p>
                    4. If there is a local Bitcoin meetup in your area, do
                    trades there.
                </p>
                <br></br>
                <p>
                    5. Do not give your ID to anyone on the site and do not
                    trade with anyone who asks for your ID.
                </p>
                <br></br>
                <p>
                    6. Make sure that the person who contacts you off the site
                    has an account with us. You can check this by matching their
                    contact against their profile marker on the map. This will
                    allow you to check their reviews/ratings and avoid scammers
                    or those with poor reviews/ratings.
                </p>
            </div>
            <Grid />
        </main>
    );
}
