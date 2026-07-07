"use client";

import { signIn, signOut } from "next-auth/react";
import { Shield, User } from "lucide-react";

type Provider = "google" | "github";

const oauthProviders: { id: Provider; label: string }[] = [
  { id: "google", label: "Continue with Google" },
  { id: "github", label: "Continue with GitHub" },
];

export function OAuthButtons({ callbackUrl = "/account" }: { callbackUrl?: string }) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {oauthProviders.map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={() => signIn(provider.id, { callbackUrl })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            {provider.label}
          </button>
        ))}
      </div>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <p className="relative mx-auto w-fit bg-[#070b16] px-3 text-xs uppercase tracking-wider text-slate-500">
          Demo sign-in (no OAuth needed)
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() =>
            signIn("demo", { account: "customer", callbackUrl })
          }
          className="flex items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/10 px-4 py-3 text-sm font-medium text-violet-100 transition hover:bg-violet-500/20"
        >
          <User className="h-4 w-4" />
          Demo guest
        </button>
        <button
          type="button"
          onClick={() => signIn("demo", { account: "admin", callbackUrl: "/admin" })}
          className="flex items-center justify-center gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-100 transition hover:bg-amber-500/20"
        >
          <Shield className="h-4 w-4" />
          Demo admin
        </button>
      </div>

      <p className="text-center text-xs text-slate-500">
        Demo mode uses mock data when the database is empty.
      </p>
    </div>
  );
}

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
    >
      Sign out
    </button>
  );
}
