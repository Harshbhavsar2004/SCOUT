import { Metadata } from 'next';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata for the project
export const metadata = {
  title: 'SCOUT - Online Examination & Assessment System',
  description:
    'A secure and transparent Online Examination and Assessment System integrating CO-PO mapping with Blockchain for tamper-proof records and result integrity.',
  keywords: [
    'Online Examination',
    'Assessment System',
    'CO-PO Mapping',
    'Blockchain',
    'Secure Exams',
    'Transparent Evaluation',
  ],
  authors: [{ name: 'Your Name or Organization' }],
  openGraph: {
    title: 'SCOUT - Online Examination & Assessment System',
    description:
      'A secure and transparent Online Examination and Assessment System integrating CO-PO mapping with Blockchain for tamper-proof records and result integrity.',
    url: 'https://yourdomain.com', // replace with your domain
    siteName: 'SCOUT',
    images: [
      {
        url: '/LOGO.png', // Path to your logo
        width: 800,
        height: 600,
        alt: 'SCOUT Logo',
      },
    ],
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico', // favicon path
    apple: '/apple-touch-icon.png', // optional for iOS devices
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/LOGOBG.png" />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
