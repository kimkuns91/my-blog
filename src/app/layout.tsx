import '@/styles/fonts.css';
import '@/styles/globals.css';
import '@radix-ui/themes/styles.css';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SessionProvider from '@/components/SessionProvider';
import StarsCanvas from '@/components/StarBackground';
import ReactQueryProviders from '@/utils/react-query-provider';
import { cn } from '@/utils/style';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'White Mouse Dev',
  description: 'White Mouse Dev',
  icons: {
    icon: '/images/Logo.png',
  },
  other: {
    'google-adsense-account': 'ca-pub-6018531866853167',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={cn(
          'scrollbar flex overflow-x-hidden',
          'bg-slate-950 text-sm text-slate-50',
          'lg:text-base'
        )}
      >
        <SessionProvider session={session}>
          <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-1 flex-col overflow-y-auto">
              <main className="flex flex-1 flex-col">
                <ReactQueryProviders>{children}</ReactQueryProviders>
                <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  closeOnClick
                  pauseOnFocusLoss={false}
                  theme="dark"
                />
              </main>
              <StarsCanvas />
              <Footer />
            </div>
          </div>
          <SpeedInsights />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
