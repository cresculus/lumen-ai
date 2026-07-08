import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div />
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-lumen-gold-light"
          >
            ← View storefront
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
