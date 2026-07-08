import { StorefrontChrome } from "@/components/storefront-chrome";
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
  title: {
    default: "Lumen AI Music — Sound, Woven in Light",
    template: "%s | Lumen AI Music",
  },
  description:
    "Hand-curated ambient soundscapes for deep rest, focus, and cinematic drift. Human-finished AI composition — ad-free streaming at lumenaimusic.com.",
  openGraph: {
    title: "Lumen AI Music",
    description:
      "Sound, woven in light. Premium ambient for deep sleep, focus, and quiet restoration.",
    type: "website",
    siteName: "Lumen AI Music",
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
        <Providers>
          <StorefrontChrome>{children}</StorefrontChrome>
        </Providers>
      </body>
    </html>
  );
}
