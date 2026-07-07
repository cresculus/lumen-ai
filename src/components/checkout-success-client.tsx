"use client";

import { useSearchParams } from "next/navigation";

export function CheckoutSuccessClient() {
  const params = useSearchParams();
  const isDemo = params.get("demo") === "1";

  return (
    <>
      <h1 className="text-3xl font-semibold text-white">Thank you!</h1>
      <p className="mt-4 text-slate-300">
        {isDemo
          ? "Demo order completed — cart cleared and logged on the server."
          : "Your order is confirmed. Digital music is in your library."}
      </p>
    </>
  );
}
