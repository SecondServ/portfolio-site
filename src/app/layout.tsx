import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hector Zhang — Data Analyst',
  description: 'Personal portfolio: data analysis, Tableau dashboards, and projects.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
