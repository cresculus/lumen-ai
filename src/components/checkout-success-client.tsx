"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function CheckoutSuccessClient() {
  const params = useSearchParams();
  const isDemo = params.get("demo") === "1";

  return (
    <>
      <h1 className="font-display text-3xl font-semibold text-lumen-cream">
        You&apos;re all set
      </h1>
      <p className="mt-4 text-slate-300">
        {isDemo
          ? "Your tracks are in the library. Open it anytime from the nav."
          : "Your order is confirmed. Digital music is waiting in your library."}
      </p>
      <Link
        href="/account"
        className="mt-8 inline-flex rounded-full bg-lumen-gold px-6 py-3 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
      >
        Open library
      </Link>
    </>
  );
}
