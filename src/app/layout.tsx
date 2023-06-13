import Navbar from '@/components/navbar';
import './globals.css';
import { Mukta } from 'next/font/google';
import { Footer } from '@/components/footer';
import { names } from '@/globals/constants';

const inter = Mukta({ weight: '400', subsets: ['latin'] });

export const metadata = {
  title: { template: `%s | ${names.siteName}`, default: names.siteName },
  description: names.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'black' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
