import { Footer } from "@/components/footer";
import { NavbarClient } from "@/components/navbar-client";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarClient />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}