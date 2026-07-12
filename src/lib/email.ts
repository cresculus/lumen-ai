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
  const from = process.env.EMAIL_FROM || "orders@lumenaimusic.com";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const libraryUrl = `${appUrl}/account`;

  if (!resend) {
    console.log("[email skipped] Resend not configured", { to, orderId, items });
    return;
  }

  await resend.emails.send({
    from,
    to,
    subject: "Your Lumen AI Music order is ready",
    html: `
      <div style="font-family: Georgia, serif; color: #0f1c2e; line-height: 1.5;">
        <h1 style="font-weight: 600;">Sound, woven in light</h1>
        <p>Thank you — your order is confirmed.</p>
        <p style="color: #666; font-size: 14px;">Order ID: ${orderId}</p>
        <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
        <p>
          Open your library to stream full length and download lossless files
          (signed links, limited uses):
        </p>
        <p>
          <a href="${libraryUrl}" style="color: #8a7340;">
            View your sound library
          </a>
        </p>
        <p style="font-size: 13px; color: #666;">
          For relaxation and wellness only. Lumen AI Music.
        </p>
      </div>
    `,
  });
}
