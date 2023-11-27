'use client';

import styles from '../page.module.css';
import Description from '../components/description';
import Grid from '../components/grid';
import LoginBtn from '../components/login-btn';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Profile } from '../components/profile';

const emptyProfile: Profile = {
    username: ''
};

export default function Page() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(emptyProfile);

    const updateProfile = () => {
        return fetch('http://localhost:3000/api/user/update', {
            method: 'POST',
            body: JSON.stringify(profileData)
        });
    };

    const setLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position: { coords: { latitude: number; longitude: number } }) => {
                profileData.lat = position.coords.latitude;
                profileData.lng = position.coords.longitude;
                setProfileData(profileData);
            }
        );
    };

    useEffect(() => {
        // TODO get the host dynamically
        if (session) {
            console.log('useEffect session', session);
            // TODO cannot get auth data from server side
            fetch('http://localhost:3000/api/user/profile', {
                credentials: 'include'
            })
                .then((response) => {
                    // TODO
                    setProfileData(response.json as unknown as Profile);
                    setLoading(false);
                })
                .catch(console.error);
        }
    }, [session]);

    if (!session) {
        return (
            <main className={styles.main}>
                <Description />
                <LoginBtn />
                <Grid />
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <Description />
            {!loading && (
                <div id={'profileDetails'}>
                    <input
                        type={'text'}
                        placeholder={'username'}
                        id={'username'}
                    />
                    <button id={'setLocation'} onClick={setLocation}>
                        Set your location
                    </button>
                    <p id={'rating'}>Your rating:</p>
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
                    <button id={'update'} onClick={updateProfile}>
                        Update details
                    </button>
                </div>
            )}
            <LoginBtn />
            <Grid />
        </main>
    );
}
