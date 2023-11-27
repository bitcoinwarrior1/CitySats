import type { NextApiRequest, NextApiResponse } from 'next';
import { nearbyProfilesHandler } from './userService';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return nearbyProfilesHandler(req, res);
}
