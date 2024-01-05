import NextAuthLightning, {
    NextAuthLightningConfig
} from 'next-auth-lightning-provider';
import generateQr from 'next-auth-lightning-provider/generators/qr';
import generateName from 'next-auth-lightning-provider/generators/name';
import generateAvatar from 'next-auth-lightning-provider/generators/avatar';
import { kv } from '@vercel/kv';

const config: NextAuthLightningConfig = {
    // required
    baseUrl: process.env.NEXTAUTH_URL ?? '',
    secret: process.env.NEXTAUTH_SECRET ?? '',
    storage: {
        async set({ k1, session }) {
            await kv.set(`k1:${k1}`, session);
        },
        async get({ k1 }) {
            return await kv.get(`k1:${k1}`);
        },
        async update({ k1, session }) {
            const old = (await kv.get(`k1:${k1}`)) || {};
            await kv.set(`k1:${k1}`, { ...old, ...session });
        },
        async delete({ k1 }) {
            await kv.del(`k1:${k1}`);
        }
    },
    generateQr,
    // optional
    generateName,
    generateAvatar,
    theme: {
        colorScheme: 'dark'
    }
};

const { provider, handler } = NextAuthLightning(config);

export const lightningProvider = provider;

export default handler;
