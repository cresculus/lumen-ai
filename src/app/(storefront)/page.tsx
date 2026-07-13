import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full bg-[#0a1525]">
      <section className="relative min-h-[78vh] overflow-hidden bg-[#0f1c2e] md:min-h-[88vh]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(201,162,39,0.18),transparent_50%),radial-gradient(ellipse_at_80%_60%,rgba(15,40,70,0.9),transparent_55%),linear-gradient(180deg,#0f1c2e_0%,#0a1525_100%)]" />
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(232,212,138,0.12)_1px,transparent_1px)] [background-size:28px_28px]" />
        </div>

        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 md:min-h-[88vh] md:justify-center md:pb-24 md:pt-20">
          <p className="mb-5 font-display text-2xl text-lumen-gold-light md:text-3xl">
            Lumen AI Music
          </p>
          <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-lumen-cream md:text-6xl">
            Sound Experiences
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Hand-finished ambient for deep rest and focus — AI composition,
            human curation, ad-free in your library.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/music"
              className="rounded-full bg-lumen-gold px-7 py-3.5 text-sm font-medium text-lumen-midnight shadow-lg shadow-lumen-gold/20 hover:bg-lumen-gold-light"
            >
              Explore Music
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
    </div>
  );
}
