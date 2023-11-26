import type { NextApiRequest, NextApiResponse } from 'next';
import { reviewHandler } from './userService';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return reviewHandler(req, res);
}
