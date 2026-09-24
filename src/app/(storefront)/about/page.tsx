import Link from "next/link";
import { PhotoHeader } from "@/components/photo-header";

export const metadata = {
  title: "About",
  description:
    "Quiet rooms for deep sleep, focus, late nights, calm meditation, and soft restoration.",
};

export default function AboutPage() {
  return (
    <div>
      <PhotoHeader
        eyebrow="Lumen Listening"
        title="Quiet rooms for deep sleep, focus, late nights, calm meditation, and soft restoration."
      >
        <p className="text-lg text-slate-200">
          Long-form atmospheres you can leave on. Warm, cinematic, unhurried.
          Press play. Dim the lights. Stay as long as you need.
        </p>
      </PhotoHeader>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-lg leading-relaxed text-slate-300">
          Lumen Listening is one room at a time. Deep sleep, focus, late
          nights, calm meditation, and soft restoration. Listening stays free
          on YouTube and here.
        </p>
        <p className="mt-4 leading-relaxed text-slate-400">
          The shop is 22 momme silk for the night. Checkout is not open yet.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 border-t border-white/10 pt-8">
          <Link
            href="/music"
            className="rounded-full bg-lumen-gold px-6 py-2.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
          >
            Listen
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-white/15 px-6 py-2.5 text-sm text-lumen-cream hover:bg-white/5"
          >
            Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
