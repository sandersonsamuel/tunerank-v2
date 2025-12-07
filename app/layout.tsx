import type { Metadata } from "next";
import { JetBrains_Mono } from 'next/font/google';
import { NavigationHeader } from "@/components/layout/navbar";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/providers/auth";
import { MobileTabBar } from "@/components/layout/tabbar";


export const metadata: Metadata = {
  title: "Tune Rank",
  description: "Ranking your favorite tunes",
};

const font = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR">
      <body
        className={`${font.className} antialiased dark space-y-5 relative mb-32`}
      >
        <AuthProvider>
          <Toaster />
          <NavigationHeader />
          <MobileTabBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
