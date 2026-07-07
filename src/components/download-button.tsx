"use client";

import { useState } from "react";

function DownloadButton({ productId, title }: { productId: string; title: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const response = await fetch(`/api/download/${productId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (error) {
      alert(error instanceof Error ? error.message : "Download failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="rounded-lg bg-violet-500/20 px-3 py-1.5 text-sm text-violet-100 hover:bg-violet-500/30"
    >
      {loading ? "Preparing..." : `Download ${title}`}
    </button>
  );
}

export { DownloadButton };
