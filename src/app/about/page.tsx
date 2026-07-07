export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-white">About Lumen AI</h1>
      <p className="mt-6 text-lg text-slate-300">
        Lumen AI creates calming sleep and focus music powered by AI, shared on
        YouTube and available for purchase here. We also curate physical products
        that support better rest and deeper focus.
      </p>
      <p className="mt-4 text-slate-400">
        YouTube is where the journey begins. This site is where you support the
        work, own the music, and shop tools for your nightly routine.
      </p>
    </div>
  );
}
