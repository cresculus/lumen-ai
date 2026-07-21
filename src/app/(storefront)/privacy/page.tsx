export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="prose prose-invert mx-auto max-w-3xl px-4 py-12">
      <h1>Privacy Policy</h1>
      <p>
        Lumen Listening Rooms collects account information through OAuth
        providers (Google, GitHub) and order information necessary to fulfill
        purchases. Payment data is processed by Stripe and not stored on our
        servers.
      </p>
      <p>
        Contact us to request account deletion or data export. Replace this page
        with your finalized legal copy before launch.
      </p>
    </div>
  );
}
