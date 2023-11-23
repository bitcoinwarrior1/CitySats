import type { NextApiRequest, NextApiResponse } from 'next'
import {useSession} from "next-auth/react";
import {authOptions} from "../auth/[...nextauth]";
import {getServerSession} from "next-auth";

type ResponseData = {
    message: string
}

// TODO other routes needed:
// update user profile (protected)
// get user profiles by location
// leave a rating review (protected)

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { data: session } = useSession()
    if(session) {
        res.status(200).json({ message: 'Hello World!' })
    }
    res.status(401)
}

// @ts-ignore
export async function getServerSideProps(context) {
    return {
        props: {
            session: await getServerSession(
                context.req,
                context.res,
                authOptions
            ),
        },
    }
}