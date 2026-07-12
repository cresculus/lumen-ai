import { auth } from "@/auth";
import { Footer } from "@/components/footer";
import { NavbarClient } from "@/components/navbar-client";
import { DashboardShell } from "@/components/dashboard/sidebar";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = { title: "Library" };

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  if (session.user.role === "ADMIN") {
    return (
      <DashboardShell
        variant="admin"
        email={session.user.email || undefined}
        name={session.user.name || undefined}
        statusLabel="Creator admin"
      >
        {children}
      </DashboardShell>
    );
  }

  return (
    <>
      <NavbarClient />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
