import { ObjectId } from 'bson';
import { AuthData, Contact, Profile, Review } from '../../components/profile';
import { getProfileCollection } from './connect';
import { emptyContact, emptyProfile } from '../../lib/constants';

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
    let { picture, email, name } = authData;
    if (!email) {
        // if an email address cannot be obtained from auth data, set the email to be the username
        // this allows us to keep a permanent identifier to the user account and will allow those without email addresses to modifier their usernames
        // otherwise we won't be able to locate the account if the username is changed and the user logs in after signing out
        // this is important for reddit auth, as reddit does not provide an email address
        // TODO it might be better to rename the key from email to something more appropriate like identifier
        email = name;
    }
    const { error, data: dbProfile } = await getProfileByEmail(email);
    if (error) return { error };
    if (dbProfile?._id) return { data: 'user already exists' };
    const profile = {
        ...emptyProfile,
        picture,
        username: name,
        contact: { ...emptyContact, email }
    };

    return saveProfileToDb(profile);
};
