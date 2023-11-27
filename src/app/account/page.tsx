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
        return fetch(`${window.location.origin}/api/user/update`, {
            method: 'POST',
            body: JSON.stringify(profileData)
        });
    };

    const setLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position: { coords: { latitude: number; longitude: number } }) => {
                profileData.lat = position.coords.latitude;
                profileData.lng = position.coords.longitude;
                // @ts-ignore
                document.getElementById('location').innerText =
                    `lat: ${position.coords.latitude}, long: ${position.coords.longitude}`;
                setProfileData(profileData);
            }
        );
    };

    useEffect(() => {
        if (session) {
            fetch(`${window.location.origin}/api/user/profile`, {
                credentials: 'include'
            })
                .then((response) => {
                    return response.json();
                })
                .then((jsonBody) => {
                    setProfileData(jsonBody.data);
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
                    <p>{`Your username: ${session.user?.name}`}</p>
                    <br></br>
                    <button id={'setLocation'} onClick={setLocation}>
                        Set your location
                    </button>
                    <br></br>
                    <p id={'location'}></p>
                    <br></br>
                    <p id={'rating'}>
                        Your ratings:{' '}
                        {profileData.reviews?.map((r) => {
                            return r.toString();
                        })}
                    </p>
                    <br></br>
                    <fieldset>
                        <legend>Profile type:</legend>
                        <div>
                            <input type="radio" id="buyer" value="buyer" />
                            <label htmlFor="buyer">Buyer</label>
                        </div>
                        <div>
                            <input type="radio" id="seller" value="buyer" />
                            <label htmlFor="seller">Seller</label>
                        </div>
                    </fieldset>
                    <br></br>
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
