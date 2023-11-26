import type { NextApiRequest, NextApiResponse } from 'next';
import { handleProfile } from './userService';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return handleProfile(req, res);
}
