import { ParticleField } from "@/components/particle-field";

export function PhotoHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-[#0a1525]">
      <ParticleField />
      <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
        <p className="text-xs uppercase tracking-[0.32em] text-lumen-gold-light">
          {eyebrow}
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-medium leading-[1.05] text-lumen-cream md:text-6xl">
          {title}
        </h1>
        {children ? <div className="mt-5 max-w-2xl">{children}</div> : null}
      </div>
    </header>
  );
}
