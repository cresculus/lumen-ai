"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowRight } from "lucide-react";

/**
 * Only nudge guests who signed in but aren't on library/admin yet —
 * and only if the sticky nav Library button isn't enough context.
 * Disabled: nav already shows Library / Dashboard when signed in.
 */
export function SignedInBanner() {
  return null;
}

/** Kept for optional reuse (e.g. post-checkout). Not mounted globally. */
export function SignedInBannerActive() {
  const { data: session, status } = useSession();
  const pathname = usePathname() || "";

  if (status !== "authenticated" || !session?.user) return null;
  if (pathname.startsWith("/account") || pathname.startsWith("/admin")) {
    return null;
  }

  const isAdmin = session.user.role === "ADMIN";
  const href = isAdmin ? "/admin" : "/account";
  const label = isAdmin ? "Open admin dashboard" : "Open your library";

  return (
    <div className="border-b border-lumen-gold/25 bg-lumen-gold/15 px-4 py-3">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-lumen-cream">
          Signed in as{" "}
          <span className="font-medium text-white">
            {session.user.name || session.user.email}
          </span>
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-full bg-lumen-gold px-4 py-2 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
        >
          {label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
