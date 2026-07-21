"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Library,
  LogOut,
  Music2,
  Package,
  ShoppingBag,
  Upload,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import type { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  external?: boolean;
};

type NavSection = { title: string; items: NavItem[] };

const userSections: NavSection[] = [
  {
    title: "Sanctuary",
    items: [
      { href: "/account", label: "My library", icon: Library, exact: true },
      { href: "/music", label: "Browse music", icon: Music2 },
      { href: "/pricing", label: "Subscription", icon: CreditCard },
    ],
  },
  {
    title: "Shop",
    items: [{ href: "/shop", label: "Wellness shop", icon: ShoppingBag }],
  },
];

const adminSections: NavSection[] = [
  {
    title: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Catalog",
    items: [
      { href: "/admin/music", label: "Music catalog", icon: Music2 },
      { href: "/admin/music/new", label: "Upload track", icon: Upload },
    ],
  },
  {
    title: "Commerce",
    items: [
      { href: "/admin/shop", label: "Shop products", icon: ShoppingBag },
      { href: "/admin/orders", label: "Orders", icon: Package },
    ],
  },
];

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = item.exact
    ? pathname === item.href
    : pathname === item.href ||
      (item.href !== "/" && pathname.startsWith(`${item.href}`));

  const className = cn(
    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
    active
      ? "bg-lumen-gold/15 text-lumen-cream shadow-[inset_3px_0_0_0_#c9a227]"
      : "text-slate-400 hover:bg-white/5 hover:text-lumen-cream",
  );

  const content = (
    <>
      <item.icon
        className={cn("h-4 w-4 shrink-0", active && "text-lumen-gold")}
      />
      <span className="truncate">{item.label}</span>
    </>
  );

  if (item.external) {
    return (
      <a href={item.href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

export function DashboardSidebar({
  variant = "user",
  email,
  name,
  statusLabel,
}: {
  variant?: "user" | "admin";
  email?: string;
  name?: string;
  statusLabel?: string;
}) {
  const { data: session } = useSession();
  const isAdmin =
    variant === "admin" || session?.user?.role === "ADMIN";
  const sections = isAdmin ? adminSections : userSections;
  const displayName =
    name ||
    session?.user?.name ||
    email?.split("@")[0] ||
    session?.user?.email?.split("@")[0] ||
    "Member";
  const displayEmail = email || session?.user?.email || "";
  const badge =
    statusLabel || (isAdmin ? "Creator admin" : "Member library");

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-white/10 bg-lumen-midnight">
      <div className="border-b border-white/10 px-5 py-6">
        <Link href={isAdmin ? "/admin" : "/account"} className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lumen-listening-rooms-logo.svg"
            alt="Lumen Listening Rooms"
            className="h-8 w-auto"
          />
          <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-lumen-gold-light/80">
            {isAdmin ? "Creator console" : "Sound library"}
          </p>
        </Link>
      </div>

      <div className="border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-lumen-gold/40 to-lumen-indigo text-sm font-semibold text-lumen-cream">
            {displayName.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-lumen-cream">
              {displayName}
            </p>
            <p className="truncate text-xs text-slate-500">{badge}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink key={`${item.href}-${item.label}`} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-4">
        {displayEmail && (
          <p className="truncate px-1 text-[11px] text-slate-600">
            {displayEmail}
          </p>
        )}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-lumen-cream"
        >
          View storefront
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-lumen-cream"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

export function DashboardShell({
  children,
  variant = "user",
  email,
  name,
  statusLabel,
}: {
  children: ReactNode;
  variant?: "user" | "admin";
  email?: string;
  name?: string;
  statusLabel?: string;
}) {
  return (
    <div className="flex min-h-[100dvh] w-full bg-[#0a1525]">
      <div className="hidden md:flex">
        <DashboardSidebar
          variant={variant}
          email={email}
          name={name}
          statusLabel={statusLabel}
        />
      </div>
      <div className="flex min-h-[100dvh] min-w-0 flex-1 flex-col">
        <MobileTopBar variant={variant} />
        <div className="dashboard-content flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function MobileTopBar({ variant }: { variant: "user" | "admin" }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isAdmin =
    variant === "admin" || session?.user?.role === "ADMIN";
  const links = isAdmin
    ? [
        { href: "/admin", label: "Home" },
        { href: "/admin/music", label: "Music" },
        { href: "/admin/music/new", label: "Upload" },
        { href: "/admin/orders", label: "Orders" },
        { href: "/account", label: "Library" },
      ]
    : [
        { href: "/account", label: "Library" },
        { href: "/music", label: "Browse" },
        { href: "/pricing", label: "Plan" },
        { href: "/shop", label: "Shop" },
      ];

  return (
    <div className="border-b border-white/10 bg-lumen-midnight/95 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lumen-listening-rooms-logo.svg"
            alt="Lumen Listening Rooms"
            className="h-7 w-auto"
          />
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
            {isAdmin ? "Creator console" : "Sound library"}
          </p>
        </div>
        <Link
          href="/"
          className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate-300"
        >
          Store
        </Link>
      </div>
      <div className="flex gap-1 overflow-x-auto px-3 pb-3">
        {links.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-xl px-3 py-1.5 text-xs",
                active
                  ? "bg-lumen-gold/20 text-lumen-cream"
                  : "bg-white/5 text-slate-400",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
