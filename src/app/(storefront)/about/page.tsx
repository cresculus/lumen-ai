import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Lumen Listening Rooms — free quiet rooms, plus sleep and wellness objects for deeper rest.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm uppercase tracking-[0.25em] text-lumen-gold-light">
        Our story
      </p>
      <h1 className="font-display mt-3 text-4xl font-semibold text-lumen-cream">
        About Lumen Listening Rooms
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-slate-300">
        Lumen Listening Rooms builds intimate sound sanctuaries for deep sleep,
        deep work, late nights, and soft resets — including the story skins of
        Quiet Kingdom. Listening stays free on YouTube and in Rooms.
      </p>
      <p className="mt-4 leading-relaxed text-slate-400">
        This site is where those rooms meet objects for rest: sleep masks, soft
        nights, and calm essentials. Presence over noise. Warmth over hustle.
      </p>

      <h2 className="font-display mt-12 text-xl text-lumen-gold-light">
        How it works
      </h2>
      <ul className="mt-4 space-y-3 text-slate-400">
        <li>
          <strong className="text-lumen-cream">Free rooms</strong> — long-form
          listening on YouTube and here. No subscription required.
        </li>
        <li>
          <strong className="text-lumen-cream">Wellness shop</strong> — objects
          that help you stay in the room: masks, ear plugs, quiet tools.
        </li>
        <li>
          <strong className="text-lumen-cream">Quiet Kingdom</strong> — fantasy
          story skins for the same calm purpose: focus and soft resets.
        </li>
      </ul>

      <h2 className="font-display mt-12 text-xl text-lumen-gold-light">
        What makes us different
      </h2>
      <ul className="mt-4 space-y-3 text-slate-400">
        <li>
          <strong className="text-lumen-cream">Human authenticity</strong> —
          Every release passes through human ears, hands, and heart.
        </li>
        <li>
          <strong className="text-lumen-cream">Serene immersion</strong> — Depth
          over dopamine. Rooms meant to be left on.
        </li>
        <li>
          <strong className="text-lumen-cream">Poetic warmth</strong> —
          Cinematic yet intimate; vast feeling with candlelit closeness.
        </li>
      </ul>

      <div className="mt-10 flex flex-wrap gap-3 border-t border-white/10 pt-8">
        <Link
          href="/shop"
          className="rounded-full bg-lumen-gold px-6 py-2.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
        >
          Shop wellness
        </Link>
        <Link
          href="/music"
          className="rounded-full border border-white/15 px-6 py-2.5 text-sm text-lumen-cream hover:bg-white/5"
        >
          Free rooms
        </Link>
      </div>
    </div>
  );
}
