import { auth } from "@/auth";
import { PricingCards } from "@/components/pricing-cards";

export const metadata = {
  title: "Pricing",
  description:
    "Uninterrupted drift — subscribe for ad-free streaming or own individual soundscapes forever.",
};

export default async function PricingPage() {
  const session = await auth();

  return (
    <div className="w-full bg-[#0a1525]">
      <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-lumen-gold-light">
          Uninterrupted drift
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold text-lumen-cream">
          Choose your sanctuary
        </h1>
        <p className="mt-4 text-slate-400">
          Pay per song, or subscribe monthly or yearly for the full catalog.
          Yearly includes a free Silk Sleep Mask.
        </p>
      </div>
      <div className="mt-12">
        <PricingCards isLoggedIn={!!session?.user} />
      </div>
      </div>
    </div>
  );
}
