import {getProfileCollection} from "@/app/api/users/connect";
import {ObjectId} from "bson";

export interface Contact {
    telegram: string;
    email: string;
    wickr: string;
    signal: string;
}

export interface Profile {
    userId: Number;
    contact: Contact;
    description: string;
}

export const getProfileById = async (_id: string) => {
    try {
        const userCollection = await getProfileCollection()
        const data = await userCollection.findOne<Profile>({
            _id: new ObjectId(_id),
        })

        return { data }
    } catch (error) {
        return { error }
    }
}

export const saveProfileToDb = async (profile: Profile) => {
    try {
        const profileCollection = await getProfileCollection()

        const query = { userId: profile.userId }
        const options = { upsert: true }
        const update = { $set: profile }

        const insertResult = await profileCollection.updateOne(query, update, options)

        return { data: insertResult }
    } catch (e) {
        return { error: e }
    }
}