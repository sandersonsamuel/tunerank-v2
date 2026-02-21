import { NavigationHeader } from "@/components/layout/navbar";
import { MobileTabBar } from "@/components/layout/tabbar";
import QueryProvider from "@/components/providers/query-provider";
import type { Metadata } from "next";
import { JetBrains_Mono } from 'next/font/google';
import { Toaster } from "react-hot-toast";
import "./globals.css";


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
        <QueryProvider>
          <Toaster />
          <NavigationHeader />
          <MobileTabBar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
