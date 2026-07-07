import { OAuthButtons } from "@/components/oauth-buttons";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="text-3xl font-semibold text-white">Welcome to Lumen AI</h1>
      <p className="mt-3 text-slate-400">
        Sign in to buy music, track orders, and access your library.
      </p>
      <div className="mt-8">
        <OAuthButtons />
      </div>
    </div>
  );
}
