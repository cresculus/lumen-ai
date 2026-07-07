"use client";

import { useState } from "react";
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
      className="rounded-full bg-violet-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-400"
    >
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}

export function CheckoutButton() {
  const { items, utm } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  async function handleCheckout() {
    setLoading(true);
    setError("");

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
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
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
        onClick={handleCheckout}
        className="w-full rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white hover:bg-violet-400 disabled:opacity-50"
      >
        {loading ? "Redirecting..." : `Checkout ${formatPrice(items.reduce((s, i) => s + i.price * i.quantity, 0))}`}
      </button>
    </div>
  );
}
