'use client';
import GoogleMap from 'google-maps-react-markers';
import { useEffect, useState } from 'react';
import { Profile } from './profile';
import { emptyProfile } from '../lib/constants';
import InfoWindow from './InfoWindow';

const mapContainerStyle = {
    width: '100vw',
    minHeight: '100vw',
    height: '450px',
    marginTop: '1%',
    marginBottom: '1%'
};

const Map = ({}) => {
    const [location, setLocation] = useState({
        lat: 0,
        lng: 0
    });
    const [loading, setLoading] = useState(true);
    const [profilesNearby, setProfilesNearby] = useState(Array());
    const [selectedProfile, setSelectedProfile] = useState(emptyProfile);

    const getProfilesNearby = () => {
        const query = `${window.location.origin}/api/user/nearbyProfiles?lat=${location.lat}&lng=${location.lng}`;
        fetch(query)
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                setProfilesNearby((prev) => {
                    return prev.concat(responseJson.data);
                });
                setLoading(false);
            })
            .catch(console.error);
    };

    useEffect(() => {
        if (loading) {
            navigator.geolocation.getCurrentPosition(
                (position: {
                    coords: { latitude: number; longitude: number };
                }) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    getProfilesNearby();
                },
                () => {
                    getProfilesNearby();
                }
            );
        }
    }, []);

    const handleMapMove = (map: any) => {
        if (!loading) {
            setLocation({ lat: map.center[1], lng: map.center[0] });
            getProfilesNearby();
        }
    };

    const renderMarkerProfile = (profile: Profile) => {
        setSelectedProfile(profile);
    };

    const handleCloseInfoWindow = () => {
        setSelectedProfile(emptyProfile);
    };

    return (
        <div id={'map'}>
            {!loading && (
                <GoogleMap
                    apiKey={'AIzaSyAQWSnntCOZdRP6hAKv2wR9nLGwOv69BZ0'}
                    defaultCenter={location}
                    defaultZoom={13}
                    style={mapContainerStyle}
                    onChange={handleMapMove}
                >
                    {profilesNearby.map((profile: Profile, index) => (
                        <a
                            onClick={() => renderMarkerProfile(profile)}
                            key={index}
                            // @ts-ignore
                            lat={profile.lat}
                            lng={profile.lng}
                        >
                            <img
                                src={profile.markerImagePath}
                                width={'25px'}
                                height={'25px'}
                                alt={profile.bio}
                            />
                        </a>
                    ))}

                    {selectedProfile.username !== '' && (
                        <InfoWindow
                            position={{
                                lat: selectedProfile.lat,
                                lng: selectedProfile.lng
                            }}
                            onClose={handleCloseInfoWindow}
                            bio={selectedProfile.bio}
                            reviews={selectedProfile.reviews ?? []}
                            contact={selectedProfile.contact ?? {}}
                            username={selectedProfile.username}
                        ></InfoWindow>
                    )}
                </GoogleMap>
            )}
        </div>
    );
};

export default Map;
