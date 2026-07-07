import Link from "next/link";
import { Suspense } from "react";
import { CheckoutSuccessClient } from "@/components/checkout-success-client";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <Suspense fallback={<p className="text-white">Loading…</p>}>
        <CheckoutSuccessClient />
      </Suspense>
      <Link
        href="/account"
        className="mt-8 inline-block rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white hover:bg-violet-400"
      >
        Go to account
      </Link>
    </div>
  );
}
