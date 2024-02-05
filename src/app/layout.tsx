import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SessionProvider from '@/components/SessionProvider';
import ReactQueryProviders from '@/utils/react-query-provider';
import { cn } from '@/utils/style';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Montserrat, Noto_Sans_KR } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
const montserratEn = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--montserrat',
});

export const metadata: Metadata = {
  title: 'White Mouse Dev',
  description: 'White Mouse Dev',
  icons: {
    icon: '/images/Logo.png',
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
          'flex text-sm lg:text-base bg-slate-950 text-slate-50',
          notoSansKr.className,
          montserratEn.variable
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
              <Footer />
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
