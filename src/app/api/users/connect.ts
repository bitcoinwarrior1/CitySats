import { MongoClient } from 'mongodb';

let mongoClient: MongoClient;

export const getMongoClient = () => {
    // TODO
    const mongoUrl = 'getMongoUrl()';

    if (!mongoClient) {
        mongoClient = new MongoClient(mongoUrl, { ignoreUndefined: true });
    }

    return mongoClient;
};

export const getMarkersCollection = async () => {
    // const markers = [
    //     { lat: 37.7749, lng: -122.4194, placeId: 'your_place_id_1', profileId: '1' },
    //     { lat: 34.0522, lng: -118.2437, placeId: 'your_place_id_2', profileId: '2'},
    // ];
    const client = getMongoClient();
    const db = client.db('citysats');
    return db.collection('markers');
};

export const getProfileCollection = async () => {
    const client = getMongoClient();
    const db = client.db('citysats');
    return db.collection('profile');
};
