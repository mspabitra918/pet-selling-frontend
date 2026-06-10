import type { Metadata } from "next";
import { Open_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import TopBar from "@/src/components/layout/TopBar";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "PawVerse — Premium Pets for Loving Homes",
    template: "%s · PawVerse",
  },
  description:
    "PawVerse is the premium marketplace to find healthy, ethically raised dogs, cats, and birds from vetted breeders across the US and Canada.",
  keywords: [
    "premium pets",
    "buy puppies",
    "adopt pets",
    "vetted breeders",
    "Canada",
  ],
  openGraph: {
    title: "PawVerse — Premium Pets for Loving Homes",
    description:
      "Find healthy, ethically raised pets from vetted breeders across the US and Canada.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-cream text-ink">
        {/* <TopBar /> */}
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
