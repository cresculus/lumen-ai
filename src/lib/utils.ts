import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildUtmUrl(baseUrl: string, campaign: string) {
  const url = new URL(baseUrl);
  url.searchParams.set("utm_source", "youtube");
  url.searchParams.set("utm_medium", "video");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}
