import Link from "next/link";
import { auth } from "@/auth";
import { ShoppingCart, Sparkles, User } from "lucide-react";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070b16]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 text-violet-300">
            <Sparkles className="h-4 w-4" />
          </span>
          Lumen <span className="text-violet-300">AI</span>
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
              className="rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-white"
            >
              {label}
            </Link>
          ))}
          {session?.user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="rounded-lg px-3 py-2 text-violet-300 hover:bg-violet-500/10"
            >
              Admin
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/5"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
          </Link>
          {session?.user ? (
            <Link
              href="/account"
              className="inline-flex items-center gap-2 rounded-full bg-violet-500/20 px-3 py-1.5 text-sm text-violet-100 hover:bg-violet-500/30"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-violet-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-violet-400"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
