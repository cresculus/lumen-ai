import Link from "next/link";

const ROOMS = [
  {
    href: "/music?tag=focus",
    label: "Focus Rooms",
    blurb: "Deep work, study, and calm concentration.",
  },
  {
    href: "/music?tag=sleep",
    label: "Sleep Rooms",
    blurb: "Overnight hush for insomnia and soft rest.",
  },
  {
    href: "/music?tag=fantasy",
    label: "Quiet Kingdom",
    blurb: "Fantasy story skins for focus and soft resets.",
  },
  {
    href: "/music?tag=late%20night",
    label: "Late Night Rooms",
    blurb: "Coffee hours, quiet drives, and wind-down.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="w-full bg-[#0a1525]">
      <section className="relative min-h-[78vh] overflow-hidden bg-[#0f1c2e] md:min-h-[88vh]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(201,162,39,0.18),transparent_50%),radial-gradient(ellipse_at_80%_60%,rgba(15,40,70,0.9),transparent_55%),linear-gradient(180deg,#0f1c2e_0%,#0a1525_100%)]" />
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(232,212,138,0.12)_1px,transparent_1px)] [background-size:28px_28px]" />
        </div>

        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 md:min-h-[88vh] md:justify-center md:pb-24 md:pt-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lumen-listening-rooms-logo.svg"
            alt="Lumen Listening Rooms"
            className="mb-5 h-10 w-auto md:h-12"
          />
          <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-lumen-cream md:text-6xl">
            Quiet rooms for feeling, focus &amp; soft resets
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Long-form atmospheres for deep sleep, deep work, late nights, and
            soft restoration. Warm, cinematic, unhurried — leave them on.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/music"
              className="rounded-full bg-lumen-gold px-7 py-3.5 text-sm font-medium text-lumen-midnight shadow-lg shadow-lumen-gold/20 hover:bg-lumen-gold-light"
            >
              Explore Rooms
            </Link>
            <Link
              href="/account"
              className="rounded-full border border-lumen-cream/25 px-7 py-3.5 text-sm font-medium text-lumen-cream hover:bg-white/5"
            >
              Library
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-lumen-cream/25 px-7 py-3.5 text-sm font-medium text-lumen-cream hover:bg-white/5"
            >
              Go Unlimited
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <p className="text-sm uppercase tracking-[0.28em] text-lumen-gold-light">
            Choose a room
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold text-lumen-cream md:text-4xl">
            Four doors. One quiet purpose.
          </h2>
          <p className="mt-4 max-w-xl text-slate-400">
            Match the YouTube shelves — Focus, Sleep, Quiet Kingdom, and Late
            Night. Same calm listening. Different doors in.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {ROOMS.map((room) => (
              <Link
                key={room.label}
                href={room.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-6 transition hover:border-lumen-gold/35 hover:bg-white/[0.05]"
              >
                <h3 className="font-display text-xl text-lumen-cream group-hover:text-lumen-gold-light">
                  {room.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {room.blurb}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
