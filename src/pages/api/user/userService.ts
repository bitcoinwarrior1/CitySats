import {
    deleteProfileByEmail,
    getProfileByEmail,
    getProfileById,
    getProfileByUsername,
    getProfilesByLocation,
    saveProfileToDb
} from '../../../app/db/users/profile';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { setMarkerImage } from '../../../app/lib/helpers';
import { ObjectId } from 'bson';

export async function profileHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Retrieve the session from the request context
    const session = await getServerSession(req, res, authOptions);

    // Check if the user is authenticated
    if (!session) {
        return res.status(401).json({ error: 'Unauthorised' });
    }

    // Fetch the user's profile from the database
    const { error: dbError, data: dbProfile } = await getProfileByEmail(
        session.user?.email ?? session.user?.name
    );

    // Handle database errors
    if (dbError) {
        return res.status(500).json({ error: dbError });
    }

    // Return the profile data or an error message
    return res.status(200).json({ data: dbProfile });
}

export async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
    // Retrieve the session from the request context
    const session = await getServerSession(req, res, authOptions);

    // Check if the user is authenticated
    if (!session) {
        return res.status(401).json({ error: 'Unauthorised' });
    }

    // Fetch the user's profile from the database
    const { error: dbError } = await deleteProfileByEmail(
        session.user?.email ?? session.user?.name
    );

    // Handle database errors
    if (dbError) {
        return res.status(500).json({ error: dbError });
    }

    // Return the profile data or an error message
    return res.status(200).json({ data: 'profile deleted' });
}

export async function nearbyProfilesHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { lat, lng } = req.query;
    if (!lat || !lng)
        return res.status(400).json({ error: 'Coordinates not provided' });

    const { error: dbError, data: profiles } = await getProfilesByLocation(
        parseFloat(lat as string),
        parseFloat(lng as string)
    );

    if (dbError) return res.status(500).json({ error: dbError });

    return res.status(200).json({ data: profiles });
}

export const updateHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    // Retrieve the session from the request context
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        const { error: dbError, data: dbProfile } = await getProfileByEmail(
            session.user?.email ?? session.user?.name
        );
        if (dbError) return res.status(400).json({ error: dbError });
        const profile = JSON.parse(req.body);
        if (!profile)
            return res.status(400).json({ error: 'No profile info provided' });
        setMarkerImage(profile);
        const { error: dbSaveError } = await saveProfileToDb(profile);
        if (dbSaveError) return res.status(500).json({ error: dbSaveError });

        return res.status(200).json({ data: 'Profile updated' });
    } else {
        return res.status(401).json({ error: 'Unauthorised' });
    }
};

export const reviewHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    // Retrieve the session from the request context
    const session = await getServerSession(req, res, authOptions);

    if (!session) return res.status(401).json({ error: 'Unauthorised' });

    const { error: dbError, data: dbProfileReviewer } = await getProfileByEmail(
        session.user?.email ?? session.user?.name
    );
    if (dbError) return res.status(500).json({ error: dbError });

    if (!dbProfileReviewer?._id)
        return res
            .status(400)
            .json({ error: 'Reviewer profile does not exist' });

    const { data: review } = JSON.parse(req.body);
    if (!review || !review?.star || !review?.username)
        return res.status(400).json({ error: 'Incomplete review provided' });

    const { error: dbRatedProfileError, data: ratedDbProfile } =
        await getProfileByUsername(review.username);

    if (dbRatedProfileError)
        return res.status(500).json({ error: dbRatedProfileError });

    if (!ratedDbProfile)
        return res.status(400).json({ error: 'Rated profile does not exist' });

    if (ratedDbProfile.username === dbProfileReviewer.username)
        return res
            .status(200)
            .json({ error: 'Cannot vote on your own profile' });

    // TODO a review to a particular user should only be submitted by each user once, mongoDb should override if exists
    let reviews = ratedDbProfile?.reviews ?? [];
    reviews = reviews.filter((r) => {
        // Do not allow the same user to have multiple reviews on the same profile
        return r?.profileId?.toString() != dbProfileReviewer._id?.toString();
    });
    reviews.push({ star: review.star, profileId: dbProfileReviewer._id });
    ratedDbProfile.reviews = reviews;

    const { error: dbSaveError } = await saveProfileToDb(ratedDbProfile);

    if (dbSaveError) return res.status(500).json({ error: dbSaveError });

    return res.status(200).json({ data: 'review added' });
};
