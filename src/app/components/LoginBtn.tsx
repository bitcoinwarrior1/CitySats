'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '../page.module.css';

export default function LoginBtn() {
    const { data: session } = useSession();
    if (session) {
        return (
            <div id={styles.login}>
                <p>
                    Signed in as {session?.user?.email} <br />
                    <button onClick={() => signOut()}>Sign out</button>
                </p>
            </div>
        );
    }
    return (
        <div id={styles.login}>
            <p>
                Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
            </p>
        </div>
    );
}
