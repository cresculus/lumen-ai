import type { Role } from "@/generated/prisma/client";

/** Sole admin identity for Lumen Listening Rooms. Overridable via ADMIN_EMAIL env. */
export const DEFAULT_ADMIN_EMAIL = "brandon.sardelli@gmail.com";

export function getAdminEmail() {
  return (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim().toLowerCase();
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === getAdminEmail();
}

/** Only the configured admin email is ADMIN — everyone else is CUSTOMER. */
export function roleForEmail(email: string | null | undefined): Role {
  return isAdminEmail(email) ? "ADMIN" : "CUSTOMER";
}
