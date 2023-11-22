import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextAuthProvider } from './components/NextAuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'CitySats',
    description: 'CitySats.com homepage'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <NextAuthProvider>
                <body className={inter.className}>{children}</body>
            </NextAuthProvider>
        </html>
    );
}
