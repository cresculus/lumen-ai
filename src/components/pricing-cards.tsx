"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Single track",
    price: "From $2.99",
    description: "Own one track forever. Download in full quality.",
    cta: "Browse music",
    href: "/music",
    highlight: false,
    features: [
      "Full lossless download",
      "Lifetime access to purchased tracks",
      "Stream in your library",
    ],
  },
  {
    name: "Lumen Unlimited",
    price: "$9.99/mo",
    description: "Stream the entire catalog. Best for daily sleep & focus.",
    cta: "Subscribe",
    href: null,
    highlight: true,
    features: [
      "Unlimited streaming — full catalog",
      "Highest quality audio from R2",
      "New tracks as you upload them",
      "10% off shop purchases",
      "Cancel anytime",
    ],
  },
  {
    name: "Wellness bundle",
    price: "Shop",
    description: "Physical sleep & focus products shipped to you.",
    cta: "Visit shop",
    href: "/shop",
    highlight: false,
    features: [
      "Night caps, masks, ear plugs",
      "Curated for better rest",
      "Bundles coming soon",
    ],
  },
];

export function PricingCards({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    if (!isLoggedIn) {
      window.location.href = "/login?callbackUrl=/pricing";
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/subscribe", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (e) {
      alert(e instanceof Error ? e.message : "Subscription unavailable");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative rounded-2xl border p-6 ${
            plan.highlight
              ? "border-violet-400/40 bg-gradient-to-b from-violet-500/15 to-transparent shadow-lg shadow-violet-500/10"
              : "border-white/10 bg-white/[0.03]"
          }`}
        >
          {plan.highlight && (
            <span className="mb-4 inline-flex items-center gap-1 rounded-full bg-violet-500/25 px-2.5 py-0.5 text-xs text-violet-100">
              <Sparkles className="h-3 w-3" />
              Most popular
            </span>
          )}
          <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
          <p className="mt-2 text-3xl font-light text-violet-200">{plan.price}</p>
          <p className="mt-3 text-sm text-slate-400">{plan.description}</p>
          <ul className="mt-6 space-y-2">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                {f}
              </li>
            ))}
          </ul>
          {plan.href ? (
            <Link
              href={plan.href}
              className="mt-8 block w-full rounded-full border border-white/15 py-2.5 text-center text-sm font-medium text-white hover:bg-white/5"
            >
              {plan.cta}
            </Link>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={handleSubscribe}
              className="mt-8 w-full rounded-full bg-violet-500 py-2.5 text-sm font-medium text-white hover:bg-violet-400 disabled:opacity-50"
            >
              {loading ? "Redirecting…" : plan.cta}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
