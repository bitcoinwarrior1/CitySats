import type { NextApiRequest, NextApiResponse } from 'next';
import { updateHandler } from './userService';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return updateHandler(req, res);
}
