import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteHandler, profileHandler } from './userService';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return deleteHandler(req, res);
}
