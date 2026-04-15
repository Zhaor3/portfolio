import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Simon Zhao — Mechanical Engineer & Robotics',
  description:
    'Portfolio of Ruoxiang (Simon) Zhao — Mechanical Engineering student at RPI, incoming M.S. Robotics at the University of Michigan. Robotics, autonomous vehicles, and control systems.',
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
      'Portfolio of Simon Zhao — RPI Mechanical Engineering, incoming M.S. Robotics at University of Michigan.',
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
        {children}
      </body>
    </html>
  );
}
