'use client';

import styles from '../page.module.css';
import Description from '../components/Description';
import Grid from '../components/Grid';
import LoginBtn from '../components/LoginBtn';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { emptyProfile } from '../lib/constants';
import { getStarRatingInfo } from '../lib/helpers';

export default function Page() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(emptyProfile);

    const updateProfile = async () => {
        try {
            // Send the current state to the server
            await fetch(`${window.location.origin}/api/user/update`, {
                method: 'POST',
                body: JSON.stringify(profileData),
                credentials: 'include'
            });

            // Fetch the updated profile from the server
            const response = await fetch(
                `${window.location.origin}/api/user/profile`,
                {
                    credentials: 'include'
                }
            );
            const jsonBody = await response.json();

            // Use the updated profile directly from the server response
            setProfileData(jsonBody.data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const setLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position: { coords: { latitude: number; longitude: number } }) => {
                setProfileData((prevProfileData) => ({
                    ...prevProfileData,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }));
            },
            (error) => {
                console.error(error);
            },
            { enableHighAccuracy: false } // TODO test this
        );
    };

    const onChangeBuyerAndSeller = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { id, checked } = event.target;

        setProfileData((prevProfileData) => ({
            ...prevProfileData,
            [id]: checked
        }));
    };

    const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setProfileData((prevProfileData) => ({
            ...prevProfileData,
            username: value
        }));
    };
    const onChangeContact = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, id } = event.target;
        setProfileData((prevProfileData) => ({
            ...prevProfileData,
            contact: { ...prevProfileData.contact, [id]: value }
        }));
    };

    const onChangeBio = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setProfileData((prevProfileData) => ({
            ...prevProfileData,
            bio: value
        }));
    };

    useEffect(() => {
        if (session) {
            fetch(`${window.location.origin}/api/user/profile`, {
                credentials: 'include'
            })
                .then((response) => response.json())
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
                    <p>
                        Your username:
                        <input
                            type={'text'}
                            value={profileData.username}
                            onChange={onChangeUsername}
                        ></input>
                    </p>
                    <br></br>
                    <p>
                        Email:
                        <input
                            type={'text'}
                            id={'email'}
                            defaultValue={profileData.contact?.email}
                            onChange={onChangeContact}
                        ></input>
                    </p>
                    <p>
                        Telegram:
                        <input
                            type={'text'}
                            id={'telegram'}
                            defaultValue={profileData.contact?.telegram}
                            onChange={onChangeContact}
                        ></input>
                    </p>
                    <p>
                        Wickr:
                        <input
                            type={'text'}
                            id={'wickr'}
                            defaultValue={profileData.contact?.wickr}
                            onChange={onChangeContact}
                        ></input>
                    </p>
                    <p>
                        Signal:
                        <input
                            type={'text'}
                            id={'signal'}
                            defaultValue={profileData.contact?.signal}
                            onChange={onChangeContact}
                        ></input>
                    </p>
                    <br></br>
                    <button id={'setLocation'} onClick={setLocation}>
                        Set/update your location
                    </button>
                    <br></br>
                    <p
                        id={'location'}
                    >{`lat: ${profileData.lat}, long: ${profileData.lng}`}</p>
                    <br></br>
                    <p>
                        Reviews:
                        {' ' +
                            JSON.stringify(
                                getStarRatingInfo(profileData.reviews ?? [])
                            )}
                    </p>
                    <br></br>
                    <div>
                        <input
                            type="checkbox"
                            id="buyer"
                            checked={profileData.buyer || false}
                            onChange={onChangeBuyerAndSeller}
                        />
                        <label htmlFor="buyer">Buyer</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="seller"
                            checked={profileData.seller || false}
                            onChange={onChangeBuyerAndSeller}
                        />
                        <label htmlFor="seller">Seller</label>
                    </div>
                    <br></br>
                    <p>
                        Your bio. Please include details such as your buy/sell
                        limits and availability.
                    </p>
                    <br></br>
                    <textarea
                        id={'bio'}
                        onChange={onChangeBio}
                        rows={5}
                        cols={50}
                        value={profileData.bio}
                    ></textarea>
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
