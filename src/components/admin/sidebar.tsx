"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  LayoutDashboard,
  Music,
  Package,
  ShoppingBag,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/music", label: "Music catalog", icon: Music },
  { href: "/admin/music/new", label: "Upload track", icon: Upload },
  { href: "/admin/shop", label: "Shop products", icon: ShoppingBag },
  { href: "/admin/orders", label: "Orders", icon: Package },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-white/10 bg-[#0F1C2E]/80 lg:w-64 lg:border-b-0 lg:border-r lg:min-h-[calc(100vh-4rem)]">
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-lumen-gold-light">
          Lumen AI Admin
        </p>
        <p className="mt-1 text-sm text-slate-400">Creator dashboard</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-2 pb-4 lg:flex-col lg:px-3">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition",
                active
                  ? "bg-lumen-gold/20 text-lumen-cream"
                  : "text-slate-400 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
