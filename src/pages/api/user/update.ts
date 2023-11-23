import type { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { setSession, update } from './userService';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return update(req);
}

// @ts-ignore
export async function getServerSideProps(context) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );
    setSession(session);
    return {
        props: {
            session
        }
    };
}
