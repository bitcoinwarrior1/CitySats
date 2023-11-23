'use client';

import styles from '../page.module.css';
import Description from '../components/description';
import Grid from '../components/grid';
import LoginBtn from '../components/login-btn';
import {useSession} from "next-auth/react";

export default function Page() {
    // TODO
    // get the user's profile from the DB via the protected route, might need to save auth data in DB for that to work
    // Allow the user to set their profile information (autofilled to the data we have in DB)
    // Save updates to db via a protected api route
    // Users can leave reviews when they have a valid session, review is saved in DB and cannot be done multiple times
    const { data: session } = useSession();
    if (session) {
        return (
            <main className={styles.main}>
                <Description />
                <div id={'profileDetails'}>
                    <input type={'text'} placeholder={'username'} id={'username'}/>
                    <button id={'updateLocation'}>Update your location</button>
                    <p id={'rating'}>Your rating: 5 stars (20 reviewers)</p>
                    <fieldset>
                        <legend>Type:</legend>

                        <div>
                            <input type="radio" id="buyer" value="buyer" />
                            <label htmlFor="buyer">Buyer</label>
                        </div>
                        <div>
                            <input type="radio" id="seller" value="buyer" />
                            <label htmlFor="seller">Seller</label>
                        </div>
                    </fieldset>
                    <button id={'update'}>Update details</button>
                </div>
                <LoginBtn />
                <Grid />
            </main>
        );
    }
    return (
        <main className={styles.main}>
            <Description />
            <LoginBtn />
            <Grid />
        </main>
    );
}
