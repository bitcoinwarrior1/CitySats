'use client';
import GoogleMap from 'google-maps-react-markers';
import { coordinates, Marker } from './Marker';
import { useEffect, useState } from "react";

const mapContainerStyle = {
    width: '90vw',
    height: '85vw',
    marginTop: '1%',
    marginBottom: '1%'
};

const Map = ({}) => {
    const [location, setLocation] = useState({
        lat: 0,
        lng: 0,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position: { coords: { latitude: number; longitude: number; }; }) => {
            setLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        })
    }, [location])

    return (
        <div id={'map'}>
            <GoogleMap
                apiKey={'AIzaSyAQWSnntCOZdRP6hAKv2wR9nLGwOv69BZ0'}
                defaultCenter={location}
                defaultZoom={12}
                style={mapContainerStyle}
            >
                {coordinates.map((data, index) => (
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
        </div>
    );
};

export default Map;
