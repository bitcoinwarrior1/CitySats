import {
    getProfileByEmail,
    getProfileById,
    saveProfileToDb
} from '../../../app/db/users/profile';
import { NextApiRequest } from 'next';

// TODO make sure that the session is validated and cannot be forged (might need to store and pass the jwt from oAuth)
// TODO  get user profiles by location
let session: any;

export const setSession = (currentSession: any) => {
    session = currentSession;
};
export const profile = async () => {
    if (session) {
        const { error: dbError, data: dbProfile } = await getProfileByEmail(
            session.user?.email
        );
        if (dbError) return { error: dbError };
        return { data: dbProfile, status: 200 };
    } else {
        return { error: 'unauthorised', status: 401 };
    }
};

export const update = async (req: NextApiRequest) => {
    if (session) {
        const { error: dbError, data: dbProfile } = await getProfileByEmail(
            session.user?.email
        );
        if (dbError) return { error: dbError, status: 400 };

        const { profile } = req.body.params;
        if (!profile) return { error: 'No profile info provided', status: 400 };
        const { error: dbSaveError } = await saveProfileToDb(profile);
        if (dbSaveError) return { error: dbSaveError, status: 500 };

        return { data: 'profile updated', status: 200 };
    } else {
        return { error: 'unauthorised', status: 401 };
    }
};

export const review = async (req: NextApiRequest) => {
    if (session) {
        const { error: dbError, data: dbProfile } = await getProfileByEmail(
            session.user?.email
        );
        if (dbError) return { error: dbError };

        const { rating, ratedProfileId, review } = req.body.params;
        if (!rating) return { error: 'No rating provided', status: 400 };
        if (!ratedProfileId)
            return { error: 'No profile provided', status: 400 };
        const { error: dbRatedProfileError, data: ratedDbProfile } =
            await getProfileById(ratedProfileId);
        if (dbRatedProfileError)
            return { error: dbRatedProfileError, status: 500 };
        if (!ratedDbProfile)
            return { error: 'rated profile does not exist', status: 200 };
        ratedDbProfile?.reviews?.push(review);
        const { error: dbSaveError } = await saveProfileToDb(ratedDbProfile);
        if (dbSaveError) return { error: dbSaveError, status: 500 };

        return { data: 'profile updated', status: 200 };
    } else {
        return { error: 'unauthorised', status: 401 };
    }
};
