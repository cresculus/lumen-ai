"use client";

import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { User } from "lucide-react";

type Provider = "google" | "github";

const oauthProviders: { id: Provider; label: string }[] = [
  { id: "google", label: "Continue with Google" },
  { id: "github", label: "Continue with GitHub" },
];

export function OAuthButtons({ callbackUrl = "/account" }: { callbackUrl?: string }) {
  const [loading, setLoading] = useState(false);

  async function demoGuestSignIn() {
    setLoading(true);
    try {
      await signIn("demo", {
        account: "customer",
        callbackUrl: "/account",
        redirect: true,
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Demo sign-in failed. Check that ENABLE_MOCK_AUTH is not false.");
    }
  }

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
        <p className="relative mx-auto w-fit bg-[#0F1C2E] px-3 text-xs uppercase tracking-wider text-slate-500">
          Or try as a guest
        </p>
      </div>

      <button
        type="button"
        disabled={loading}
        onClick={demoGuestSignIn}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-lumen-gold/30 bg-lumen-gold/10 px-4 py-3 text-sm font-medium text-lumen-cream transition hover:bg-lumen-gold/20 disabled:opacity-60"
      >
        <User className="h-4 w-4" />
        {loading ? "Opening library…" : "Demo guest"}
      </button>

      <p className="text-center text-xs text-slate-500">
        Admin access is only available when you sign in with the owner Google
        account. Demo guest is a normal member library.
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
