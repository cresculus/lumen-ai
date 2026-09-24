import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI / VR Rooms",
  description:
    "AI and VR listening rooms from Lumen Listening Rooms. Coming soon. Listening stays free.",
};

export default function VrRoomsPage() {
  return (
    <div className="w-full bg-[#0a1525]">
      <header className="border-b border-white/10 bg-[#0f1c2e]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-sm uppercase tracking-[0.28em] text-lumen-gold-light">
            AI / VR Rooms
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-lumen-cream md:text-6xl">
            Step inside the room
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Rooms you can enter, not only hear. This section is not open yet.
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.18em] text-lumen-gold-light">
            Coming soon
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/music"
              className="rounded-full border border-lumen-cream/25 px-7 py-3.5 text-sm font-medium text-lumen-cream hover:bg-white/5"
            >
              Free listening rooms
            </Link>
            <Link
              href="/wallpapers"
              className="rounded-full bg-lumen-gold px-7 py-3.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
            >
              4K wallpapers
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
