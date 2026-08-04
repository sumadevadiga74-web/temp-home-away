import './globals.css';
import Providers from './providers';
import Navbar from '@/components/navbar/Navbar';
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Providers>
            <Navbar />
            <main className="container py-10">
              {children}
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}