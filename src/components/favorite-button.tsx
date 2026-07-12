"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";
import { isMockId } from "@/lib/mock-data";
import { readDemoFavorites, toggleDemoFavorite } from "@/lib/demo-library";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!session?.user) {
        setActive(readDemoFavorites().includes(productId));
        return;
      }
      if (session.user.id.startsWith("demo-") || isMockId(productId)) {
        setActive(readDemoFavorites().includes(productId));
        return;
      }
      try {
        const res = await fetch("/api/favorites");
        const data = await res.json();
        if (!cancelled) {
          setActive(
            Array.isArray(data.favorites) &&
              data.favorites.includes(productId),
          );
        }
      } catch {
        if (!cancelled) {
          setActive(readDemoFavorites().includes(productId));
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [productId, session?.user]);

  async function toggle() {
    setLoading(true);
    try {
      if (
        !session?.user ||
        session.user.id.startsWith("demo-") ||
        isMockId(productId)
      ) {
        const next = toggleDemoFavorite(productId);
        setActive(next.includes(productId));
        return;
      }

      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      if (data.local) {
        const next = toggleDemoFavorite(productId);
        setActive(next.includes(productId));
      } else {
        setActive(Boolean(data.favorited));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={toggle}
      aria-label={active ? "Remove from favorites" : "Save to favorites"}
      className={cn(
        "rounded-full border border-white/10 p-2 transition hover:border-lumen-gold/40 hover:bg-lumen-gold/10 disabled:opacity-50",
        active ? "text-lumen-gold" : "text-slate-400",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4", active && "fill-current")} />
    </button>
  );
}
