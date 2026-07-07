"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";

type PhysicalProduct = {
  id: string;
  title: string;
  price: number;
  inventory: number;
  category: string;
  status: string;
};

export default function AdminShopPage() {
  const [products, setProducts] = useState<PhysicalProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadProducts() {
    const response = await fetch("/api/admin/physical-products");
    const data = await response.json();
    setProducts(data.products || []);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/physical-products", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Create failed");
      event.currentTarget.reset();
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-medium text-white">Add shop product</h2>
        {[
          ["title", "Title"],
          ["description", "Description"],
          ["price", "Price (USD)"],
          ["inventory", "Inventory"],
          ["category", "Category"],
          ["weight", "Weight (oz)"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="mb-1 block text-sm text-slate-300">{label}</label>
            <input
              name={name}
              required={name === "title" || name === "price"}
              className="w-full rounded-lg border border-white/10 bg-[#0b1020] px-3 py-2 text-white"
            />
          </div>
        ))}
        <div>
          <label className="mb-1 block text-sm text-slate-300">Image</label>
          <input name="image" type="file" accept="image/*" className="text-sm text-slate-300" />
        </div>
        <select
          name="status"
          defaultValue="PUBLISHED"
          className="rounded-lg border border-white/10 bg-[#0b1020] px-3 py-2 text-white"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
        {error && <p className="text-sm text-rose-300">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-violet-500 px-6 py-2.5 text-sm text-white"
        >
          {loading ? "Saving..." : "Add product"}
        </button>
      </form>

      <div>
        <h2 className="mb-4 text-xl font-medium text-white">Current products</h2>
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-white">{product.title}</p>
              <p className="text-sm text-slate-400">
                {product.status} · {formatPrice(product.price)} · {product.inventory} in stock
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
