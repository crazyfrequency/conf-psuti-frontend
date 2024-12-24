'use server'

import { Toaster } from "@/components/ui/sonner";
import { getScopedI18n } from "@/locales/server";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const title = (await getScopedI18n('title'))('default')
 
  return {
    title: {
      template: `%s | ${title}`,
      default: title
    }
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
