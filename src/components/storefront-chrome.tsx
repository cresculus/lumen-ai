"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { NavbarClient } from "@/components/navbar-client";

function isAppShellRoute(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function StorefrontChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  if (isAppShellRoute(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <NavbarClient />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
