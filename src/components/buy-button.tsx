"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";

type BuyButtonProps = {
  productId: string;
  title: string;
  price: number;
  slug: string;
  type: "DIGITAL" | "PHYSICAL";
};

export function BuyButton({
  productId,
  title,
  price,
  slug,
  type,
}: BuyButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addItem({ productId, title, price, slug, type });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className="rounded-full bg-lumen-gold px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-lumen-gold/20 hover:bg-lumen-gold"
    >
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}

export function CheckoutButton() {
  const router = useRouter();
  const { items, utm, clearCart, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"stripe" | "demo" | null>(null);
  const hasPhysical = items.some((item) => item.type === "PHYSICAL");
  const [shipping, setShipping] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  async function handleStripeCheckout() {
    setLoading(true);
    setError("");
    setMode("stripe");

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            type: item.type,
            productId: item.productId,
            quantity: item.quantity,
          })),
          utm,
          shipping: hasPhysical ? shipping : undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(
        err instanceof Error
          ? `${err.message} — try demo checkout below.`
          : "Checkout failed",
      );
    } finally {
      setLoading(false);
      setMode(null);
    }
  }

  async function handleDemoCheckout() {
    setLoading(true);
    setError("");
    setMode("demo");

    try {
      const response = await fetch("/api/checkout/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            type: item.type,
          })),
          total,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Demo checkout failed");

      clearCart();
      router.push("/checkout/success?demo=1");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Demo checkout failed");
    } finally {
      setLoading(false);
      setMode(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-slate-400">Order summary</p>
        <p className="mt-1 text-2xl font-medium text-white">{formatPrice(total)}</p>
        <p className="mt-1 text-xs text-slate-500">{items.length} line item(s)</p>
      </div>

      {hasPhysical && (
        <div className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-medium text-white">Shipping address</h3>
          {(["name", "line1", "line2", "city", "state", "zip"] as const).map(
            (field) => (
              <input
                key={field}
                placeholder={field}
                value={shipping[field]}
                onChange={(e) =>
                  setShipping((current) => ({
                    ...current,
                    [field]: e.target.value,
                  }))
                }
                className="rounded-lg border border-white/10 bg-[#0b1020] px-3 py-2 text-sm text-white"
              />
            ),
          )}
        </div>
      )}

      {error && <p className="text-sm text-rose-300">{error}</p>}

      <button
        type="button"
        disabled={loading || items.length === 0}
        onClick={handleStripeCheckout}
        className="w-full rounded-full bg-lumen-gold px-6 py-3 text-sm font-medium text-white hover:bg-lumen-gold disabled:opacity-50"
      >
        {loading && mode === "stripe" ? "Redirecting…" : `Pay with Stripe ${formatPrice(total)}`}
      </button>

      <button
        type="button"
        disabled={loading || items.length === 0}
        onClick={handleDemoCheckout}
        className="w-full rounded-full border border-amber-400/30 bg-amber-500/10 px-6 py-3 text-sm font-medium text-amber-100 hover:bg-amber-500/20 disabled:opacity-50"
      >
        {loading && mode === "demo" ? "Processing…" : "Demo checkout (no payment)"}
      </button>

      <p className="text-center text-xs text-slate-500">
        Demo checkout logs the order and clears your cart — for testing only.
      </p>
    </div>
  );
}
