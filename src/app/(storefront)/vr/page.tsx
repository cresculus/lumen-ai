import Link from "next/link";
import type { Metadata } from "next";
import { PhotoHeader } from "@/components/photo-header";

export const metadata: Metadata = {
  title: "Augmented Reality and Virtual Reality Rooms",
  description:
    "Augmented reality and virtual reality listening rooms from Lumen Listening Rooms. Coming soon. Listening stays free.",
};

export default function VrRoomsPage() {
  return (
    <div className="w-full bg-[#0a1525]">
      <PhotoHeader
        image="/wallpapers/preview/voyager.jpg"
        eyebrow="Coming soon"
        title="Augmented reality and virtual reality rooms"
      >
        <p className="text-lg text-slate-200">
          Listening rooms you can step into. Augmented reality and virtual
          reality. This section is not open yet.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/music"
            className="rounded-full border border-white/30 bg-black/20 px-7 py-3.5 text-sm font-medium text-lumen-cream hover:bg-black/40"
          >
            Listen free
          </Link>
          <Link
            href="/wallpapers"
            className="rounded-full bg-lumen-gold px-7 py-3.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
          >
            4K wallpapers
          </Link>
        </div>
      </PhotoHeader>
    </div>
  );
}
