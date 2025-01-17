import I18nProvider from "@/components/layout/I18nProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <I18nProvider>
            <Toaster duration={5000} pauseWhenPageIsHidden closeButton richColors />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
