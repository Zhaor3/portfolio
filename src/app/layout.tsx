import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MotionProvider from '@/components/MotionProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Simon Zhao — Mechanical Engineer & Robotics',
  description:
    'Portfolio of Ruoxiang (Simon) Zhao — RPI Mechanical Engineering graduate, Magna Cum Laude, and incoming M.S. Robotics student at the University of Michigan seeking a Summer 2027 internship.',
  keywords: [
    'Simon Zhao',
    'Ruoxiang Zhao',
    'Mechanical Engineering',
    'Robotics',
    'Autonomous Vehicles',
    'RPI',
    'University of Michigan',
    'ROS 2',
    'Portfolio',
  ],
  authors: [{ name: 'Ruoxiang (Simon) Zhao' }],
  openGraph: {
    title: 'Simon Zhao — Mechanical Engineer & Robotics',
    description:
      'RPI Mechanical Engineering graduate, Magna Cum Laude, and incoming University of Michigan M.S. Robotics student seeking a Summer 2027 internship.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased selection:bg-black/10 selection:text-[#1d1d1f]">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
