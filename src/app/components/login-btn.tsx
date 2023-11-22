'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginBtn() {
    const { data: session } = useSession();
    if (session) {
        return (
            <h5>
                Signed in as {session?.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </h5>
        );
    }
    return (
        <h5>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </h5>
    );
}
