import { auth } from "@/auth";
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

  const isAdmin = session.user.role === "ADMIN";

  return (
    <DashboardShell
      variant={isAdmin ? "admin" : "user"}
      email={session.user.email || undefined}
      name={session.user.name || undefined}
      statusLabel={isAdmin ? "Creator admin" : "Member library"}
    >
      {children}
    </DashboardShell>
  );
}