"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { NavbarClient } from "@/components/navbar-client";
import { SignedInBanner } from "@/components/signed-in-banner";

function isAppShellRoute(pathname: string) {
  // Only admin keeps the dense sidebar shell; /account uses storefront chrome.
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function StorefrontChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const appShell = isAppShellRoute(pathname);

  if (appShell) {
    return <>{children}</>;
  }

  return (
    <>
      <NavbarClient />
      <SignedInBanner />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
