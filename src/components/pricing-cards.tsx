"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

type PlanId = "pay-per-song" | "monthly" | "yearly";

const plans: {
  id: PlanId;
  name: string;
  price: string;
  description: string;
  cta: string;
  href: string | null;
  highlight: boolean;
  badge?: string;
  features: string[];
}[] = [
  {
    id: "pay-per-song",
    name: "Pay per song",
    price: "From $2.99",
    description: "Buy tracks one at a time. Own them in your library.",
    cta: "Browse Music",
    href: "/music",
    highlight: false,
    features: [
      "Add any track to cart",
      "Full lossless download",
      "Stream owned tracks in Library",
    ],
  },
  {
    id: "monthly",
    name: "Unlimited Monthly",
    price: "$9.99/mo",
    description: "Stream the full catalog. Cancel anytime.",
    cta: "Subscribe monthly",
    href: null,
    highlight: false,
    features: [
      "Unlimited streaming — full catalog",
      "Highest quality audio",
      "Cancel anytime",
    ],
  },
  {
    id: "yearly",
    name: "Unlimited Yearly",
    price: "$99/yr",
    description: "Full catalog for a year plus a free Silk Sleep Mask.",
    cta: "Subscribe yearly",
    href: null,
    highlight: true,
    badge: "Free Silk Sleep Mask",
    features: [
      "Unlimited streaming — full catalog",
      "Free Silk Sleep Mask included",
      "Best value for long listening",
    ],
  },
];

export function PricingCards({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [loading, setLoading] = useState<PlanId | null>(null);

  async function handleSubscribe(plan: "monthly" | "yearly") {
    if (!isLoggedIn) {
      window.location.href = "/login?callbackUrl=/pricing";
      return;
    }
    setLoading(plan);
    try {
      const res = await fetch("/api/stripe/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (e) {
      alert(e instanceof Error ? e.message : "Subscription unavailable");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`relative rounded-2xl border p-6 ${
            plan.highlight
              ? "border-lumen-gold/40 bg-gradient-to-b from-lumen-gold/15 to-transparent shadow-lg shadow-lumen-gold/10"
              : "border-white/10 bg-white/[0.03]"
          }`}
        >
          {plan.highlight && plan.badge && (
            <span className="mb-4 inline-flex items-center gap-1 rounded-full bg-lumen-gold/25 px-2.5 py-0.5 text-xs text-lumen-cream">
              <Sparkles className="h-3 w-3" />
              {plan.badge}
            </span>
          )}
          <h3 className="font-display text-xl font-semibold text-lumen-cream">
            {plan.name}
          </h3>
          <p className="mt-2 text-3xl font-light text-lumen-gold-light">
            {plan.price}
          </p>
          <p className="mt-3 text-sm text-slate-400">{plan.description}</p>
          <ul className="mt-6 space-y-2">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-lumen-gold" />
                {f}
              </li>
            ))}
          </ul>
          {plan.href ? (
            <Link
              href={plan.href}
              className="mt-8 block w-full rounded-full border border-white/15 py-2.5 text-center text-sm font-medium text-lumen-cream hover:bg-white/5"
            >
              {plan.cta}
            </Link>
          ) : (
            <button
              type="button"
              disabled={loading !== null}
              onClick={() =>
                handleSubscribe(plan.id as "monthly" | "yearly")
              }
              className="mt-8 w-full rounded-full bg-lumen-gold py-2.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light disabled:opacity-50"
            >
              {loading === plan.id ? "Redirecting…" : plan.cta}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
