import { Footer } from "@/components/footer";
import { NavbarClient } from "@/components/navbar-client";
import { SignedInBanner } from "@/components/signed-in-banner";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarClient />
      <SignedInBanner />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}