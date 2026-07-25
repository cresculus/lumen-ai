import { redirect } from "next/navigation";

/** Unlimited / music subscriptions paused — shop is the commerce path. */
export default function PricingPage() {
  redirect("/shop");
}
