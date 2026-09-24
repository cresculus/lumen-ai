import Link from "next/link";

type ProductCardProps = {
  title: string;
  slug?: string;
  price?: number;
  description?: string | null;
  href: string;
  badge?: string;
  image?: string | null;
};

export function ProductCard({
  title,
  description,
  href,
  badge,
  image,
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-lumen-gold/40 hover:bg-white/[0.07]"
    >
      <div className="relative aspect-square bg-[#0a1525]">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-lumen-gold/20 to-blue-500/10" />
        )}
      </div>
      <div className="p-5">
        {badge && (
          <span className="mb-2 inline-block rounded-full bg-lumen-gold/20 px-2.5 py-0.5 text-xs text-lumen-gold-light">
            {badge}
          </span>
        )}
        <h3 className="text-lg font-medium text-white group-hover:text-lumen-cream">
          {title}
        </h3>
        {description && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-400">{description}</p>
        )}
        <p className="mt-4 text-sm uppercase tracking-[0.16em] text-lumen-gold-light">
          Coming soon
        </p>
      </div>
    </Link>
  );
}
