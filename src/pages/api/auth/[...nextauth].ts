import 'dotenv/config';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import RedditProvider from 'next-auth/providers/reddit';
import { saveProfileOnAuth } from '../../../app/db/users/profile';

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET ?? '',
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? ''
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? '',
            clientSecret: process.env.GOOGLE_SECRET ?? ''
        }),
        RedditProvider({
            clientId: process.env.REDDIT_ID ?? '',
            clientSecret: process.env.REDDIT_SECRET ?? ''
        })
    ],
    callbacks: {
        // @ts-ignore
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
                await saveProfileOnAuth(token);
            }
            return token;
        },
        // @ts-ignore
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken;
            return session;
        }
    }
};
export default NextAuth(authOptions);
