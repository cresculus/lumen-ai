export const metadata = {
  title: "About",
  description:
    "Lumen AI Music creates intimate, human-finished sound sanctuaries — premium ambient art for deep rest, focus, and cinematic drift.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm uppercase tracking-[0.25em] text-lumen-gold-light">
        Our story
      </p>
      <h1 className="font-display mt-3 text-4xl font-semibold text-lumen-cream">
        About Lumen AI Music
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-slate-300">
        Lumen AI Music creates intimate, human-finished sound sanctuaries that
        blend the boundless imagination of AI composition with the discernment of
        a master curator. Each piece is composed, then lovingly stitched,
        mastered, and layered with optional healing frequencies — never generic,
        never clinical.
      </p>
      <p className="mt-4 leading-relaxed text-slate-400">
        We exist to offer a quiet, luminous space where you can drift into deep
        rest, restore your nervous system, focus without force, or simply
        inhabit vast inner worlds. Our work is premium ambient art for those who
        value presence over noise and beauty over algorithms.
      </p>

      <h2 className="font-display mt-12 text-xl text-lumen-gold-light">
        What makes us different
      </h2>
      <ul className="mt-4 space-y-3 text-slate-400">
        <li>
          <strong className="text-lumen-cream">Human authenticity</strong> — AI
          is a tool, never the author. Every release passes through human ears,
          hands, and heart.
        </li>
        <li>
          <strong className="text-lumen-cream">Serene immersion</strong> — We
          design for long, uninterrupted listening. Depth over dopamine.
        </li>
        <li>
          <strong className="text-lumen-cream">Poetic warmth</strong> — Futuristic
          yet intimate; cosmic scale rendered with candlelit closeness.
        </li>
        <li>
          <strong className="text-lumen-cream">Intentional craft</strong> — Slow,
          deliberate post-production. Nothing is rushed or auto-generated.
        </li>
      </ul>

      <p className="mt-10 border-t border-white/10 pt-8 text-slate-500">
        YouTube is where many journeys begin. This site is your ad-free sanctuary
        — stream in full quality, own what you love, and explore wellness
        objects that match the sonic world.
      </p>
    </div>
  );
}
