"use client";

import Link from "next/link";
import { CheckoutButton } from "@/components/buy-button";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center gap-3">
        <ShoppingBag className="h-8 w-8 text-violet-400" />
        <div>
          <h1 className="text-3xl font-semibold text-white">Shopping cart</h1>
          <p className="text-sm text-slate-400">Music + wellness products</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-white/15 p-12 text-center">
          <p className="text-slate-400">Your cart is empty.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/music"
              className="rounded-full bg-violet-500 px-5 py-2 text-sm text-white"
            >
              Browse music
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-white/15 px-5 py-2 text-sm text-white"
            >
              Visit shop
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {item.type === "DIGITAL" ? "Digital music" : "Physical product"}
                  </p>
                  <p className="mt-1 text-sm text-violet-200">
                    {formatPrice(item.price)} each
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.productId, Number(e.target.value))
                    }
                    className="w-16 rounded-lg border border-white/10 bg-[#0b1020] px-2 py-1 text-sm text-white"
                  />
                  <p className="w-20 text-right font-medium text-white">
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
            <p className="text-right text-lg text-violet-200 lg:hidden">
              Total: {formatPrice(total)}
            </p>
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <CheckoutButton />
          </div>
        </div>
      )}
    </div>
  );
}
