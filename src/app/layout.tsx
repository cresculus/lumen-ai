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
      "Lumen Listening — Quiet rooms for deep sleep, focus, late nights, calm meditation, and soft restoration",
    template: "%s | Lumen Listening",
  },
  description:
    "Quiet rooms for deep sleep, focus, late nights, calm meditation, and soft restoration. Long-form atmospheres you can leave on. Warm, cinematic, unhurried.",
  openGraph: {
    title: "Lumen Listening",
    description:
      "Quiet rooms for deep sleep, focus, late nights, calm meditation, and soft restoration. Press play. Dim the lights. Stay as long as you need.",
    type: "website",
    siteName: "Lumen Listening",
    url: "https://www.lumenlistening.com",
  },
  twitter: {
    card: "summary",
    title: "Lumen Listening",
    description:
      "Press play. Dim the lights. Stay as long as you need.",
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
