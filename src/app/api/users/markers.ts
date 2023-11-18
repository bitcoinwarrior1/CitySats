import { getMarkersCollection, getProfileCollection } from './connect';
import { ObjectId } from 'bson';

export interface Marker {
    lat: Number;
    lng: Number;
    placeId: string;
    profileId: number;
}

export const getMarkerByProfileId = async (profileId: string) => {
    try {
        const userCollection = await getProfileCollection();
        const data = await userCollection.findOne<Marker>({
            profileId: new ObjectId(profileId)
        });

        return { data };
    } catch (error) {
        return { error };
    }
};

export const getMarkers = async () => {
    try {
        const markersCollection = await getMarkersCollection();
        const data = markersCollection.find<Marker[]>;

        return { data };
    } catch (error) {
        return { error };
    }
};

export const saveMarkerToDb = async (marker: Marker) => {
    try {
        const markerCollection = await getMarkersCollection();

        const query = { profileId: marker.profileId };
        const options = { upsert: true };
        const update = { $set: marker };

        const insertResult = await markerCollection.updateOne(
            query,
            update,
            options
        );

        return { data: insertResult };
    } catch (e) {
        return { error: e };
    }
};
