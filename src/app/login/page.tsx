import { OAuthButtons } from "@/components/oauth-buttons";
import Link from "next/link";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-16">
      <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Welcome</p>
      <h1 className="mt-2 text-3xl font-semibold text-white">Sign in to Lumen AI</h1>
      <p className="mt-3 text-slate-400">
        Access your music library, cart, and admin dashboard. Use demo sign-in to
        explore without OAuth setup.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <OAuthButtons callbackUrl="/account" />
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        New here?{" "}
        <Link href="/music" className="text-violet-300 hover:text-violet-200">
          Browse music first →
        </Link>
      </p>
    </div>
  );
}
