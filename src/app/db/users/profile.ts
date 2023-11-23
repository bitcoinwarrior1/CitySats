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
            email
        });

        return { data };
    } catch (error) {
        return { error };
    }
};

export const saveProfileToDb = async (profile: Profile) => {
    try {
        const profileCollection = await getProfileCollection();

        const query = { userId: profile._id };
        const options = { upsert: true };
        const update = { $set: profile };

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
        contact: { email }
    };

    return saveProfileToDb(profile);
};
