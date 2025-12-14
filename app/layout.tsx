import "./globals.css";
import Footer from "@/components/footer/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Header from "@/components/header/Header";
import { Providers } from "@/components/Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className="flex flex-col min-h-screen items-center">
        <Providers>
          <Header />
          <main className="flex flex-grow justify-center w-[1440px] pb-20">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
