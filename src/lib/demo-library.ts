/** Client-side demo library for mock-catalog purchases (no DB rows). */

export type DemoLibraryTrack = {
  id: string;
  digitalProductId: string;
  title: string;
  slug: string;
  tags: string[];
  downloadCount: number;
  maxDownloads: number;
};

const KEY = "lumen-demo-library-v1";
const FAV_KEY = "lumen-demo-favorites-v1";

export function readDemoLibrary(): DemoLibraryTrack[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DemoLibraryTrack[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function mergeDemoLibrary(tracks: DemoLibraryTrack[]) {
  if (typeof window === "undefined") return;
  const existing = readDemoLibrary();
  const byId = new Map(existing.map((t) => [t.digitalProductId, t]));
  for (const track of tracks) {
    byId.set(track.digitalProductId, track);
  }
  localStorage.setItem(KEY, JSON.stringify([...byId.values()]));
}

export function readDemoFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAV_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleDemoFavorite(productId: string): string[] {
  const current = new Set(readDemoFavorites());
  if (current.has(productId)) current.delete(productId);
  else current.add(productId);
  const next = [...current];
  localStorage.setItem(FAV_KEY, JSON.stringify(next));
  return next;
}
