import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold text-white">Thank you!</h1>
      <p className="mt-4 text-slate-300">
        Your order is confirmed. Digital music is now in your library.
      </p>
      <Link
        href="/account"
        className="mt-8 inline-block rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white hover:bg-violet-400"
      >
        Go to account
      </Link>
    </div>
  );
}
