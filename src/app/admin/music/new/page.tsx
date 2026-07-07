"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewMusicPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/digital-products", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
      router.push("/admin/music");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <h2 className="text-xl font-medium text-white">Upload music</h2>
      {[
        ["title", "Title", "text"],
        ["description", "Description", "text"],
        ["price", "Price (USD)", "number"],
        ["tags", "Tags (comma separated)", "text"],
        ["youtubeUrl", "YouTube video URL", "url"],
        ["bpm", "BPM", "number"],
      ].map(([name, label, type]) => (
        <div key={name}>
          <label className="mb-1 block text-sm text-slate-300">{label}</label>
          <input
            name={name}
            type={type}
            step={name === "price" ? "0.01" : undefined}
            required={name === "title" || name === "price"}
            className="w-full rounded-lg border border-white/10 bg-[#0b1020] px-3 py-2 text-white"
          />
        </div>
      ))}
      <div>
        <label className="mb-1 block text-sm text-slate-300">Audio file</label>
        <input
          name="audio"
          type="file"
          accept="audio/*"
          required
          className="w-full text-sm text-slate-300"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-slate-300">Cover art</label>
        <input
          name="cover"
          type="file"
          accept="image/*"
          className="w-full text-sm text-slate-300"
        />
      </div>
      <div className="flex gap-4">
        <select
          name="status"
          defaultValue="PUBLISHED"
          className="rounded-lg border border-white/10 bg-[#0b1020] px-3 py-2 text-white"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input name="featured" type="checkbox" value="true" />
          Featured
        </label>
      </div>
      {error && <p className="text-sm text-rose-300">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-violet-500 px-6 py-2.5 text-sm text-white disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Publish track"}
      </button>
    </form>
  );
}
