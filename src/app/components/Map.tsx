"use client"
import GoogleMap from "google-maps-react-markers";

const mapContainerStyle = {
    width: '65vw',
    height: '35vw',
    'margin-top': '5%',
    'margin-bottom': '1%'
};

const center = {
    lat: 33.8955044, // Set your default latitude
    lng: -151, // Set your default longitude
};

const Map = ({ }) => {
    return (
        <div id={'map'}>
            <GoogleMap
                apiKey={"AIzaSyAQWSnntCOZdRP6hAKv2wR9nLGwOv69BZ0"} defaultCenter={center} defaultZoom={5} style={mapContainerStyle}>
            </GoogleMap>
        </div>
    );
};

export default Map;