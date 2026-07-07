"use client";

import Link from "next/link";
import { CheckoutButton } from "@/components/buy-button";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-white">Your cart</h1>
      {items.length === 0 ? (
        <p className="mt-6 text-slate-400">
          Your cart is empty.{" "}
          <Link href="/music" className="text-violet-300 hover:text-violet-200">
            Browse music
          </Link>
        </p>
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="text-sm text-slate-400">{item.type.toLowerCase()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.productId, Number(e.target.value))
                    }
                    className="w-16 rounded-lg border border-white/10 bg-[#0b1020] px-2 py-1 text-sm text-white"
                  />
                  <p className="w-20 text-right text-violet-200">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="text-sm text-slate-400 hover:text-rose-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <CheckoutButton />
          </div>
        </div>
      )}
    </div>
  );
}
