"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { CartNavLink } from "@/components/cart-nav-link";
import { User } from "lucide-react";

export function NavbarClient() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-lumen-indigo/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Link
          href="/"
          className="flex items-center gap-2.5 tracking-tight text-lumen-cream"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lumen-gold/15 text-lumen-gold shadow-[0_0_20px_rgba(201,162,39,0.25)]">
            <span className="h-2 w-2 rounded-full bg-lumen-gold" />
          </span>
          <span className="font-display text-lg font-semibold">
            Lumen <span className="text-lumen-gold">AI Music</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm text-slate-300 md:flex">
          {[
            ["Music", "/music"],
            ["Shop", "/shop"],
            ["Pricing", "/pricing"],
            ["About", "/about"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-lumen-cream"
            >
              {label}
            </Link>
          ))}
          {session?.user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="rounded-lg px-3 py-2 text-lumen-gold-light hover:bg-lumen-gold/10"
            >
              Dashboard
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <CartNavLink />
          {session?.user ? (
            <Link
              href="/account"
              className="inline-flex items-center gap-2 rounded-full bg-lumen-gold/15 px-3 py-1.5 text-sm text-lumen-cream hover:bg-lumen-gold/25"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">
                {session.user.name?.split(" ")[0] || "Account"}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-lumen-gold px-4 py-1.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
