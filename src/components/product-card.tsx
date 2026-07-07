import Link from "next/link";
import { formatPrice } from "@/lib/utils";

type ProductCardProps = {
  title: string;
  slug: string;
  price: number;
  description?: string | null;
  href: string;
  badge?: string;
};

export function ProductCard({
  title,
  price,
  description,
  href,
  badge,
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-violet-400/40 hover:bg-white/[0.07]"
    >
      <div className="mb-4 aspect-square rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/10" />
      {badge && (
        <span className="mb-2 inline-block rounded-full bg-violet-500/20 px-2.5 py-0.5 text-xs text-violet-200">
          {badge}
        </span>
      )}
      <h3 className="text-lg font-medium text-white group-hover:text-violet-100">
        {title}
      </h3>
      {description && (
        <p className="mt-2 line-clamp-2 text-sm text-slate-400">{description}</p>
      )}
      <p className="mt-4 text-violet-200">{formatPrice(price)}</p>
    </Link>
  );
}
