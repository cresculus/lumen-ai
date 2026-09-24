import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

export const dynamic = "force-dynamic";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lumenlistening.com"),
  title: {
    default:
      "Lumen Listening Rooms — Quiet rooms for feeling, focus, and deep rest",
    template: "%s | Lumen Listening Rooms",
  },
  description:
    "Quiet rooms for feeling, focus, and deep rest — one place at a time. Free to listen. No ads on this site.",
  openGraph: {
    title: "Lumen Listening Rooms",
    description:
      "Free quiet rooms for focus and rest, plus sleep and wellness essentials.",
    type: "website",
    siteName: "Lumen Listening Rooms",
    url: "https://www.lumenlistening.com",
  },
  twitter: {
    card: "summary",
    title: "Lumen Listening Rooms",
    description:
      "Free quiet rooms for focus and rest, plus sleep and wellness essentials.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
