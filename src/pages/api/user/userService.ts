import {
    getProfileByEmail,
    getProfileById,
    saveProfileToDb
} from '../../../app/db/users/profile';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export async function handleProfile(req: NextApiRequest, res: NextApiResponse) {
    // Retrieve the session from the request context
    const session = await getServerSession(req, res, authOptions);

    // Check if the user is authenticated
    if (!session) {
        return res.status(401).json({ error: 'unauthorised' });
    }

    // Fetch the user's profile from the database
    const { error: dbError, data: dbProfile } = await getProfileByEmail(
        session.user?.email
    );

    // Handle database errors
    if (dbError) {
        return res.status(500).json({ error: dbError });
    }

    // Return the profile data or an error message
    return res.status(200).json({ data: dbProfile });
}

export const updateHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    // Retrieve the session from the request context
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        const { error: dbError, data: dbProfile } = await getProfileByEmail(
            session.user?.email
        );
        if (dbError) return res.status(400).json({ error: dbError });

        const { profile } = req.body.params;
        if (!profile)
            return res.status(400).json({ error: 'No profile info provided' });
        const { error: dbSaveError } = await saveProfileToDb(profile);
        if (dbSaveError) return res.status(500).json({ error: dbSaveError });

        return res.status(200).json({ data: 'profile updated' });
    } else {
        return res.status(401).json({ error: 'unauthorised' });
    }
};

export const reviewHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    // Retrieve the session from the request context
    const session = await getServerSession(req, res, authOptions);

    if (!session) return res.status(401).json({ error: 'unauthorised' });

    const { error: dbError, data: dbProfile } = await getProfileByEmail(
        session.user?.email
    );
    if (dbError) return res.status(500).json({ error: dbError });

    const { rating, ratedProfileId, review } = req.body.params;
    if (!rating) return res.status(400).json({ error: 'No rating provided' });
    if (!ratedProfileId)
        return res.status(400).json({ error: 'No profile provided' });
    const { error: dbRatedProfileError, data: ratedDbProfile } =
        await getProfileById(ratedProfileId);
    if (dbRatedProfileError)
        return res.status(500).json({ error: dbRatedProfileError });
    if (!ratedDbProfile)
        return res.status(400).json({ error: 'rated profile does not exist' });
    ratedDbProfile?.reviews?.push(review);
    const { error: dbSaveError } = await saveProfileToDb(ratedDbProfile);
    if (dbSaveError) return res.status(500).json({ error: dbSaveError });

    return res.status(200).json({ data: 'profile updated' });
};
