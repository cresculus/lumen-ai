"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  BarChart3,
  Beaker,
  Bell,
  ChevronDown,
  ChevronLeft,
  Compass,
  FileText,
  Gift,
  Home,
  Library,
  MoreHorizontal,
  Music2,
  Package,
  ShoppingBag,
  Sparkles,
  UserRound,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  external?: boolean;
};

const userNav: NavItem[] = [
  { href: "/", label: "Home", icon: Home, exact: true },
  { href: "/music", label: "Explore", icon: Compass },
  { href: "/content-studio.html", label: "Create", icon: Sparkles, external: true },
  { href: "/content-studio.html", label: "Studio", icon: Music2, external: true },
  { href: "/account", label: "Library", icon: Library, exact: true },
];

const userBottomNav: NavItem[] = [
  { href: "/pricing", label: "Earn Credits", icon: Gift },
  { href: "/content-studio.html", label: "Labs", icon: Beaker, external: true },
  { href: "/terms", label: "Terms & Policies", icon: FileText },
];

const adminNav: NavItem[] = [
  { href: "/admin", label: "Home", icon: LayoutDashboard, exact: true },
  { href: "/music", label: "Explore", icon: Compass },
  { href: "/admin/music/new", label: "Create", icon: Sparkles },
  { href: "/content-studio.html", label: "Studio", icon: Music2, external: true },
  { href: "/admin/music", label: "Library", icon: Library },
  { href: "/admin/orders", label: "Notifications", icon: Bell },
];

const adminBottomNav: NavItem[] = [
  { href: "/admin/shop", label: "Shop", icon: ShoppingBag },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/orders", label: "Orders", icon: Package },
  { href: "/terms", label: "Terms & Policies", icon: FileText },
];

function NavLink({
  item,
  collapsed,
}: {
  item: NavItem;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const active = item.exact
    ? pathname === item.href
    : pathname === item.href ||
      (item.href !== "/" && pathname.startsWith(item.href));

  const className = cn(
    "group flex w-full items-center gap-3 rounded-full px-4 py-2 text-left text-[14px] leading-6 transition",
    active
      ? "bg-white/10 text-white"
      : "text-white/55 hover:bg-white/5 hover:text-white",
    collapsed && "justify-center px-2",
  );

  const content = (
    <>
      <item.icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </>
  );

  if (item.external) {
    return (
      <a href={item.href} className={className} title={item.label}>
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} title={item.label}>
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
  const [collapsed, setCollapsed] = useState(false);
  const displayName =
    name ||
    session?.user?.name ||
    email?.split("@")[0] ||
    session?.user?.email?.split("@")[0] ||
    "Creator";
  const displayEmail = email || session?.user?.email || "";
  const isAdmin =
    variant === "admin" || session?.user?.role === "ADMIN";
  const nav = isAdmin ? adminNav : userNav;
  const bottom = isAdmin ? adminBottomNav : userBottomNav;
  const credits =
    statusLabel ||
    (isAdmin ? "Admin" : "Library");

  return (
    <aside
      className={cn(
        "group/sidebar relative flex h-full flex-col gap-4 overflow-y-auto border-r border-white/10 bg-[#0a0f18] text-white transition-[width] duration-200",
        collapsed ? "w-[72px]" : "w-[200px]",
      )}
      data-collapsed={collapsed}
      style={{ minWidth: collapsed ? 72 : 200, maxWidth: collapsed ? 72 : 200 }}
    >
      <div className="flex h-[88px] items-start justify-start p-4 pt-8">
        <Link
          href={isAdmin ? "/admin" : "/"}
          className={cn(
            "relative inline-flex max-w-[7rem] items-center gap-2 p-2",
            collapsed && "max-w-none justify-center px-0",
          )}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lumen-gold/20 text-lumen-gold shadow-[0_0_24px_rgba(201,162,39,0.35)]">
            <span className="h-2 w-2 rounded-full bg-lumen-gold" />
          </span>
          {!collapsed && (
            <span className="font-display text-lg font-semibold leading-none tracking-tight">
              Lumen
            </span>
          )}
        </Link>
      </div>

      <button
        type="button"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => setCollapsed((c) => !c)}
        className={cn(
          "absolute top-[35px] z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white",
          collapsed ? "left-1/2 -translate-x-1/2" : "right-4",
        )}
      >
        <ChevronLeft
          className={cn("h-[18px] w-[18px] transition", collapsed && "rotate-180")}
        />
      </button>

      <div className="flex min-h-14 flex-col items-stretch justify-center gap-1 px-3">
        <Link
          href="/account"
          className={cn(
            "flex w-full items-center gap-2 rounded-full p-1 text-left text-white/55 transition hover:bg-white/5 hover:text-white",
            collapsed && "justify-center",
          )}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-lumen-gold/50 to-indigo-500/40 text-sm font-medium text-white">
            {displayName.slice(0, 1).toUpperCase()}
          </span>
          {!collapsed && (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-medium leading-4 text-white/90">
                  {displayName}
                </span>
                <span className="mt-0.5 block truncate text-[13px] leading-4 text-white/40">
                  {credits}
                </span>
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-white/35" />
            </>
          )}
        </Link>
      </div>

      {!collapsed && (
        <div className="-mt-2 mb-1 px-4">
          <Link
            href={isAdmin ? "/admin/music/new" : "/pricing"}
            className="flex w-full items-center justify-center rounded-full border border-white/12 bg-white/5 px-3 py-2 text-[13px] font-medium text-white/85 transition hover:bg-white/10"
          >
            {isAdmin ? "Upload track" : "Upgrade to Premier"}
          </Link>
        </div>
      )}

      <nav className="flex flex-col gap-px px-3">
        {nav.map((item) => (
          <NavLink key={`${item.href}-${item.label}`} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <div className="min-h-2 flex-1" />

      <nav className="mb-4 flex flex-col gap-px px-3">
        {bottom.map((item) => (
          <NavLink key={`${item.href}-${item.label}`} item={item} collapsed={collapsed} />
        ))}
        {!collapsed && displayEmail && (
          <p className="mt-2 truncate px-4 text-[11px] text-white/25">{displayEmail}</p>
        )}
        <span
          className={cn(
            "flex w-full items-center gap-3 rounded-full px-4 py-2 text-[14px] text-white/40",
            collapsed && "justify-center px-2",
          )}
        >
          <MoreHorizontal className="h-[18px] w-[18px]" />
          {!collapsed && <span>More</span>}
        </span>
      </nav>
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
    <div className="suno-shell flex h-[100dvh] w-full flex-col overflow-hidden bg-[#0a0f18]">
      <div className="flex min-h-0 w-full flex-1 overflow-hidden">
        <div className="hidden md:flex">
          <DashboardSidebar
            variant={variant}
            email={email}
            name={name}
            statusLabel={statusLabel}
          />
        </div>
        <div className="dashboard-content relative flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          {children}
        </div>
      </div>

      <MobileDashNav variant={variant} />
    </div>
  );
}

function MobileDashNav({ variant }: { variant: "user" | "admin" }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = variant === "admin" || session?.user?.role === "ADMIN";
  const items = [
    {
      href: isAdmin ? "/admin" : "/",
      label: "Home",
      icon: isAdmin ? LayoutDashboard : Home,
    },
    { href: "/music", label: "Explore", icon: Compass },
    {
      href: isAdmin ? "/admin/music/new" : "/content-studio.html",
      label: "Create",
      icon: Sparkles,
      accent: true,
      external: !isAdmin,
    },
    {
      href: isAdmin ? "/admin/music" : "/account",
      label: "Library",
      icon: Library,
    },
    { href: "/account", label: "Profile", icon: UserRound, profile: true },
  ] as const;

  return (
    <div className="dash-mobile-nav flex h-[60px] w-full items-center justify-between gap-0 overflow-x-auto border-t border-white/10 bg-[#0a0f18] px-2 py-3 md:hidden">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));
        const className = cn(
          "flex flex-1 items-center justify-center rounded-full py-1.5 transition",
          "accent" in item && item.accent
            ? "bg-gradient-to-r from-lumen-gold to-amber-300 text-lumen-midnight"
            : active
              ? "text-white"
              : "text-white/45",
        );
        const Icon = item.icon;
        if ("external" in item && item.external) {
          return (
            <a key={item.label} href={item.href} className={className} aria-label={item.label}>
              <Icon className="h-6 w-6" />
            </a>
          );
        }
        if ("profile" in item && item.profile) {
          return (
            <Link key={item.label} href={item.href} className={className} aria-label={item.label}>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-lumen-gold/50 to-indigo-500/40 text-[10px] font-semibold text-white">
                {(session?.user?.name || session?.user?.email || "U")
                  .slice(0, 1)
                  .toUpperCase()}
              </span>
            </Link>
          );
        }
        return (
          <Link key={item.label} href={item.href} className={className} aria-label={item.label}>
            <Icon className="h-6 w-6" />
          </Link>
        );
      })}
    </div>
  );
}
