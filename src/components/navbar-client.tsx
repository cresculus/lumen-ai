"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { CartNavLink } from "@/components/cart-nav-link";
import { LayoutDashboard, Menu, User, X } from "lucide-react";

export function NavbarClient() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const isAdmin = session?.user?.role === "ADMIN";
  const dashHref = isAdmin ? "/admin" : "/account";
  const dashLabel = isAdmin ? "Dashboard" : "Library";
  const shopHref = session?.user
    ? "/account?tab=shop"
    : "/login?callbackUrl=/account%3Ftab%3Dshop";

  const navLinks = [
    ["Music", "/music"],
    ["Pricing", "/pricing"],
    ["About", "/about"],
    ["Shop", shopHref],
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-lumen-indigo/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Lumen Listening Rooms"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lumen-listening-rooms-logo.svg"
            alt="Lumen Listening Rooms"
            className="h-7 w-auto md:h-8"
            width={200}
            height={28}
          />
        </Link>

        <nav className="hidden items-center gap-1 text-sm text-slate-300 md:flex">
          {navLinks.map(([label, href]) => (
            <Link
              key={`${label}-${href}`}
              href={href}
              className="rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-lumen-cream"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartNavLink />
          {session?.user ? (
            <Link
              href={dashHref}
              className="inline-flex items-center gap-2 rounded-full bg-lumen-gold px-4 py-1.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
            >
              {isAdmin ? (
                <LayoutDashboard className="h-4 w-4" />
              ) : (
                <User className="h-4 w-4" />
              )}
              {dashLabel}
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-lumen-gold px-4 py-1.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
            >
              Sign in
            </Link>
          )}
          <button
            type="button"
            className="rounded-lg p-2 text-slate-300 hover:bg-white/5 hover:text-lumen-cream md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1 text-sm text-slate-300">
            {navLinks.map(([label, href]) => (
              <Link
                key={`${label}-${href}`}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-lumen-cream"
              >
                {label}
              </Link>
            ))}
            {session?.user && (
              <Link
                href={dashHref}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-lumen-gold-light hover:bg-lumen-gold/10"
              >
                {dashLabel}
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
