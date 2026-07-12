import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ShopPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/account%3Ftab%3Dshop");
  }
  redirect("/account?tab=shop");
}
