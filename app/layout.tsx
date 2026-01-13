import "./globals.css";
import Footer from "@/components/footer/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Header from "@/components/header/Header";
import { Providers } from "@/components/Providers";
import { Fraunces, Manrope } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body
        className={`${manrope.variable} ${fraunces.variable} flex flex-col min-h-screen items-center antialiased scrollbar-thin scrollbar-thumb-primary-400 scrollbar-track-transparent`}
      >
        <Providers>
          <Header />
          <main className="flex flex-grow justify-center w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 pb-20">
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
