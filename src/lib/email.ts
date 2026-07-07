import { Resend } from "resend";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function sendPurchaseEmail({
  to,
  orderId,
  items,
}: {
  to: string;
  orderId: string;
  items: string[];
}) {
  const resend = getResend();
  const from = process.env.EMAIL_FROM || "orders@lumenai.com";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!resend) {
    console.log("[email skipped] Resend not configured", { to, orderId, items });
    return;
  }

  await resend.emails.send({
    from,
    to,
    subject: "Your Lumen AI order is confirmed",
    html: `
      <h1>Thank you for your purchase</h1>
      <p>Order ID: ${orderId}</p>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
      <p><a href="${appUrl}/account">View your library and orders</a></p>
    `,
  });
}
