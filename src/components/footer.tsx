import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-0 mt-auto border-t border-white/10 bg-lumen-midnight">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lumen-listening-rooms-logo.svg"
            alt="Lumen Listening Rooms"
            className="h-8 w-auto"
          />
          <p className="mt-2 text-xs text-slate-500">
            © {new Date().getFullYear()} Lumen Listening Rooms. For relaxation
            and wellness only.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-lumen-cream">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-lumen-cream">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
