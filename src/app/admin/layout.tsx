import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/sidebar";
import { redirect } from "next/navigation";

export const metadata = { title: "Admin" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/account");

  return (
    <DashboardShell
      variant="admin"
      email={session.user.email || undefined}
      name={session.user.name || undefined}
      statusLabel="Admin · Creator"
    >
      <div className="min-h-0 flex-1 px-4 py-6 md:px-8 md:py-8">{children}</div>
    </DashboardShell>
  );
}