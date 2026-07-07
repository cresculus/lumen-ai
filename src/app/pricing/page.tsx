import { auth } from "@/auth";
import { PricingCards } from "@/components/pricing-cards";

export const metadata = { title: "Pricing" };

export default async function PricingPage() {
  const session = await auth();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300">
          Simple pricing
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Sleep & focus music your way
        </h1>
        <p className="mt-4 text-slate-400">
          Preview any track free. Subscribe for unlimited high-quality streaming,
          or buy individual tracks to own forever.
        </p>
      </div>
      <div className="mt-12">
        <PricingCards isLoggedIn={!!session?.user} />
      </div>
    </div>
  );
}
