import type { NextApiRequest, NextApiResponse } from 'next';
import { profileHandler } from './userService';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return profileHandler(req, res);
}
