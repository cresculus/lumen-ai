import Link from "next/link";
import { auth } from "@/auth";
import { ShoppingCart, User } from "lucide-react";

export async function Navbar() {
  let session = null;
  try {
    session = await auth();
  } catch {
    // Auth may not be configured yet during initial deploy.
  }

  return (
    <header className="border-b border-white/10 bg-[#0b1020]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white">
          Lumen <span className="text-violet-300">AI</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/music" className="hover:text-white transition-colors">
            Music
          </Link>
          <Link href="/shop" className="hover:text-white transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          {session?.user?.role === "ADMIN" && (
            <Link href="/admin" className="hover:text-violet-300 transition-colors">
              Admin
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/5"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
          </Link>
          {session?.user ? (
            <Link
              href="/account"
              className="inline-flex items-center gap-2 rounded-full bg-violet-500/20 px-3 py-1.5 text-sm text-violet-100 hover:bg-violet-500/30"
            >
              <User className="h-4 w-4" />
              Account
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
