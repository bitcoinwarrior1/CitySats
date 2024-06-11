import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextAuthProvider } from './components/NextAuthProvider';
import Script from 'next/script';
import Head from 'next/head';

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
            <Script id="hotjar-snippet">
                {`
            <!-- Hotjar Tracking Code for CitySats -->
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:4944093,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
            </Script>
            <NextAuthProvider>
                <body className={inter.className}>{children}</body>
            </NextAuthProvider>
        </html>
    );
}
