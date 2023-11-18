'use client';
import GoogleMap from 'google-maps-react-markers';
import { coordinates, Marker } from './Marker';

const mapContainerStyle = {
    width: '90vw',
    height: '85vw',
    'margin-top': '1%',
    'margin-bottom': '1%'
};

const center = {
    lat: -33.865143, // Set your default latitude
    lng: 151.2099 // Set your default longitude
};

const Map = ({}) => {
    return (
        <div id={'map'}>
            <GoogleMap
                apiKey={'AIzaSyAQWSnntCOZdRP6hAKv2wR9nLGwOv69BZ0'}
                defaultCenter={center}
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
