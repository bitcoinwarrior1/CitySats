import { ObjectId } from 'bson';
import { AuthData, Contact, Profile, Review } from '../../components/profile';
import { getProfileCollection } from './connect';

export const getProfileById = async (_id: string) => {
    try {
        const userCollection = await getProfileCollection();
        const data = await userCollection.findOne<Profile>({
            _id: new ObjectId(_id)
        });

        return { data };
    } catch (error) {
        return { error };
    }
};

export const getProfileByUsername = async (username: string) => {
    try {
        const userCollection = await getProfileCollection();
        const data = await userCollection.findOne<Profile>({
            username
        });

        return { data };
    } catch (error) {
        return { error };
    }
};

export const getProfileByEmail = async (email: string | null | undefined) => {
    try {
        const userCollection = await getProfileCollection();
        const data = await userCollection.findOne<Profile>({
            'contact.email': email
        });

        return { data };
    } catch (error) {
        return { error };
    }
};

export const getProfilesByLocation = async (lat: number, lng: number) => {
    try {
        const profileCollection = await getProfileCollection();
        const query = {
            lat: { $gt: lat - 1, $lt: lat + 1 },
            lng: { $gt: lng - 1, $lt: lng + 1 }
        };
        const cursor = profileCollection.find(query);

        const profiles = [];

        for await (const d of cursor) {
            profiles.push(d);
        }

        return { data: profiles };
    } catch (e) {
        return { error: e };
    }
};

export const saveProfileToDb = async (profile: Profile) => {
    try {
        const profileCollection = await getProfileCollection();

        const query = { 'contact.email': profile.contact?.email };
        const options = { upsert: true };

        const { _id, ...updateFields } = profile;
        const update = { $set: { ...updateFields } };

        const insertResult = await profileCollection.updateOne(
            query,
            update,
            options
        );

        return { data: insertResult };
    } catch (e) {
        return { error: e };
    }
};

export const saveProfileOnAuth = async (authData: AuthData) => {
    const { picture, email, name } = authData;
    const { error, data: dbProfile } = await getProfileByUsername(name);
    if (error) return { error };
    if (dbProfile?.username) return { data: 'user already exists' };
    const profile = {
        username: name,
        picture,
        contact: { email },
        buyer: false,
        seller: false,
        bio: '',
        lat: 0,
        lng: 0,
        markerImagePath: ''
    };

    return saveProfileToDb(profile);
};
