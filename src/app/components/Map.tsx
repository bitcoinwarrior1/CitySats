'use client';
import GoogleMap from 'google-maps-react-markers';
import { Marker } from './Marker';
import { useEffect, useState } from 'react';

const mapContainerStyle = {
    width: '90vw',
    height: '85vw',
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

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position: { coords: { latitude: number; longitude: number } }) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                fetch(
                    `${window.location.origin}/api/user/nearbyProfiles?lat=${location.lat}&lng=${location.lng}`
                )
                    .then((response) => {
                        return response.json();
                    })
                    .then((jsonData) => {
                        setProfilesNearby(jsonData.data);
                        setLoading(false);
                    })
                    .catch(console.error);
            }
        );
    }, []);

    return (
        <div id={'map'}>
            {!loading && (
                <GoogleMap
                    apiKey={'AIzaSyAQWSnntCOZdRP6hAKv2wR9nLGwOv69BZ0'}
                    defaultCenter={location}
                    defaultZoom={12}
                    style={mapContainerStyle}
                >
                    {profilesNearby.map((data, index) => (
                        <Marker
                            key={index}
                            lat={data.lat}
                            lng={data.lng}
                            markerId={data.markerId}
                            onClick={data.onClick}
                            buyer={data.buyer}
                            seller={data.seller}
                            image={data.image}
                        ></Marker>
                    ))}
                </GoogleMap>
            )}
        </div>
    );
};

export default Map;
