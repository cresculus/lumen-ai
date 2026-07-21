export const metadata = {
  title: "About",
  description:
    "Lumen Listening Rooms — quiet spaces for deep sleep, focus, late nights, and soft restoration.",
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
        Lumen Listening Rooms creates intimate sound sanctuaries for deep rest,
        focus, and quiet nights. Each piece is carefully finished — stitched,
        mastered, and shaped for long, uninterrupted listening.
      </p>
      <p className="mt-4 leading-relaxed text-slate-400">
        We exist to offer a quiet, luminous space where you can drift into deep
        rest, soften the day, focus without force, or simply inhabit a vast
        inner world. Premium ambient for those who value presence over noise.
      </p>

      <h2 className="font-display mt-12 text-xl text-lumen-gold-light">
        What makes us different
      </h2>
      <ul className="mt-4 space-y-3 text-slate-400">
        <li>
          <strong className="text-lumen-cream">Human authenticity</strong> —
          Every release passes through human ears, hands, and heart.
        </li>
        <li>
          <strong className="text-lumen-cream">Serene immersion</strong> — We
          design for long, uninterrupted listening. Depth over dopamine.
        </li>
        <li>
          <strong className="text-lumen-cream">Poetic warmth</strong> —
          Cinematic yet intimate; cosmic scale rendered with candlelit
          closeness.
        </li>
        <li>
          <strong className="text-lumen-cream">Intentional craft</strong> — Slow,
          deliberate finishing. Nothing is rushed.
        </li>
      </ul>

      <p className="mt-10 border-t border-white/10 pt-8 text-slate-500">
        YouTube is where many journeys begin. This site is your quiet room —
        stream in full quality, own what you love, and explore wellness objects
        that match the sonic world.
      </p>
    </div>
  );
}
