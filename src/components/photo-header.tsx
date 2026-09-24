export function PhotoHeader({
  image,
  eyebrow,
  title,
  children,
}: {
  image: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-white/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1525] via-[#0a1525]/88 to-[#0a1525]/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1525]/80 via-transparent to-[#0a1525]/30" />
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
