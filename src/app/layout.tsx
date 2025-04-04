import CookiesConfirm from "@/components/layout/cookies-confirm";
import { AuthProvider } from "@/components/layout/providers/auth-provider";
import I18nProvider from "@/components/layout/providers/i18n-provider";
import LoaderProvider from "@/components/layout/providers/loader-provider";
import { Toaster } from "@/components/ui/sonner";
import { SITE_DOMAIN_FRONT } from "@/constants/app.constants";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_DOMAIN_FRONT),
  openGraph: {
    locale: "ru",
    alternateLocale: "en",
    countryName: "Russia"
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <LoaderProvider>
            <AuthProvider>
              <I18nProvider>
                <Toaster duration={5000} closeButton richColors />
                {children}
                <CookiesConfirm />
              </I18nProvider>
            </AuthProvider>
          </LoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
