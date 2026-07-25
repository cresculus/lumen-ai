export const metadata = {
  title: "About",
  description:
    "Lumen Listening Rooms — quiet rooms for feeling, focus, deep rest, and soft resets.",
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
        Lumen Listening Rooms builds intimate sound sanctuaries — places you can
        leave on for deep sleep, deep work, late nights, and soft resets. Each
        room is carefully finished: stitched, mastered, and shaped for long,
        uninterrupted listening.
      </p>
      <p className="mt-4 leading-relaxed text-slate-400">
        We exist for presence over noise. Warm, cinematic, unhurried atmospheres
        where you can rest, focus without force, or step into a quieter inner
        world — including the story skins of Quiet Kingdom.
      </p>

      <h2 className="font-display mt-12 text-xl text-lumen-gold-light">
        The rooms
      </h2>
      <ul className="mt-4 space-y-3 text-slate-400">
        <li>
          <strong className="text-lumen-cream">Focus Rooms</strong> — deep work,
          study, and calm concentration.
        </li>
        <li>
          <strong className="text-lumen-cream">Sleep Rooms</strong> — overnight
          hush for insomnia and soft rest.
        </li>
        <li>
          <strong className="text-lumen-cream">Quiet Kingdom</strong> — fantasy
          listening rooms; story skins for the same quiet purpose.
        </li>
        <li>
          <strong className="text-lumen-cream">Late Night Rooms</strong> — coffee
          hours, quiet drives, and wind-down.
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
          <strong className="text-lumen-cream">Serene immersion</strong> — We
          design for long, uninterrupted listening. Depth over dopamine.
        </li>
        <li>
          <strong className="text-lumen-cream">Poetic warmth</strong> —
          Cinematic yet intimate; vast feeling rendered with candlelit
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
