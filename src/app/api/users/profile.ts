import { ObjectId } from 'bson';
import { Profile } from '../../components/profile';
import {getProfileCollection} from "./connect";

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
