import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.mcspencerenterprise.co.za",
  port: 465,
  secure: true,
  auth: {
    user: "no-reply@mcspencerenterprise.co.za",
    pass: process.env["SMTP_PASS"] ?? "",
  },
  tls: { rejectUnauthorized: false },
});

function formatZAR(amount: number) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 2 }).format(amount);
}

interface OrderEmailOptions {
  to: string;
  customerName: string;
  orderNumber: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  address?: string;
  city?: string;
  postalCode?: string;
}

export async function sendOrderConfirmation(opts: OrderEmailOptions) {
  const itemRows = opts.items
    .map(
      (it) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:13px;">${it.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:13px;text-align:center;">${it.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:13px;text-align:right;">${formatZAR(it.price * it.quantity)}</td>
        </tr>`
    )
    .join("");

  const deliveryLine =
    opts.deliveryFee === 0
      ? `<tr><td style="padding:6px 12px;font-size:13px;color:#555;">Delivery</td><td colspan="2" style="padding:6px 12px;font-size:13px;text-align:right;color:#4a7c2f;font-weight:bold;">FREE</td></tr>`
      : `<tr><td style="padding:6px 12px;font-size:13px;color:#555;">Delivery</td><td colspan="2" style="padding:6px 12px;font-size:13px;text-align:right;">${formatZAR(opts.deliveryFee)}</td></tr>`;

  const shippingBlock =
    opts.address
      ? `<p style="margin:0 0 4px;font-size:13px;">${opts.address}</p>
         <p style="margin:0;font-size:13px;">${opts.city ?? ""}${opts.postalCode ? ", " + opts.postalCode : ""}, South Africa</p>`
      : `<p style="margin:0;font-size:13px;color:#888;">Not provided</p>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#1a3a6b;padding:28px 32px;text-align:center;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:900;letter-spacing:-0.5px;">McSpencer Enterprise</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.65);font-size:13px;">South Africa's Multi-Category Marketplace</p>
        </td></tr>

        <!-- Hero -->
        <tr><td style="padding:32px 32px 24px;text-align:center;border-bottom:1px solid #eee;">
          <div style="width:64px;height:64px;background:#e8f5e9;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
            <span style="font-size:32px;">✅</span>
          </div>
          <h2 style="margin:0 0 8px;color:#1a3a6b;font-size:20px;font-weight:900;">Order Received!</h2>
          <p style="margin:0;color:#555;font-size:14px;">Hi <strong>${opts.customerName}</strong>, thank you for shopping with us.</p>
          <p style="margin:8px 0 0;font-size:13px;color:#888;">Order reference: <strong style="color:#1a3a6b;">${opts.orderNumber}</strong></p>
        </td></tr>

        <!-- Items -->
        <tr><td style="padding:24px 32px 0;">
          <h3 style="margin:0 0 12px;font-size:14px;font-weight:700;color:#1a3a6b;text-transform:uppercase;letter-spacing:0.05em;">Your Items</h3>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:8px;overflow:hidden;">
            <thead>
              <tr style="background:#f8f9fb;">
                <th style="padding:10px 12px;text-align:left;font-size:12px;color:#888;font-weight:600;text-transform:uppercase;">Item</th>
                <th style="padding:10px 12px;text-align:center;font-size:12px;color:#888;font-weight:600;text-transform:uppercase;">Qty</th>
                <th style="padding:10px 12px;text-align:right;font-size:12px;color:#888;font-weight:600;text-transform:uppercase;">Amount</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
            <tfoot style="background:#f8f9fb;">
              <tr><td style="padding:6px 12px;font-size:13px;color:#555;">Subtotal</td><td colspan="2" style="padding:6px 12px;font-size:13px;text-align:right;">${formatZAR(opts.subtotal)}</td></tr>
              ${deliveryLine}
              <tr style="border-top:2px solid #eee;">
                <td style="padding:10px 12px;font-size:15px;font-weight:900;color:#1a3a6b;">Total</td>
                <td colspan="2" style="padding:10px 12px;font-size:15px;font-weight:900;color:#1a3a6b;text-align:right;">${formatZAR(opts.total)}</td>
              </tr>
            </tfoot>
          </table>
        </td></tr>

        <!-- Shipping -->
        <tr><td style="padding:24px 32px 0;">
          <h3 style="margin:0 0 10px;font-size:14px;font-weight:700;color:#1a3a6b;text-transform:uppercase;letter-spacing:0.05em;">Delivery Address</h3>
          <div style="background:#f8f9fb;border-radius:8px;padding:14px 16px;">
            ${shippingBlock}
          </div>
        </td></tr>

        <!-- What's Next -->
        <tr><td style="padding:24px 32px 0;">
          <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:10px;padding:16px 20px;">
            <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#b45309;">What happens next?</p>
            <p style="margin:0;font-size:13px;color:#78350f;line-height:1.6;">
              Our team will review your order and send you a <strong>formal invoice with payment instructions</strong> within <strong>24 hours</strong>. No upfront payment is needed right now.
            </p>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:28px 32px;text-align:center;border-top:1px solid #eee;margin-top:24px;">
          <p style="margin:0 0 6px;font-size:13px;color:#888;">Questions? Email us at <a href="mailto:support@mcspencerenterprise.co.za" style="color:#1a3a6b;font-weight:600;">support@mcspencerenterprise.co.za</a></p>
          <p style="margin:0;font-size:12px;color:#aaa;">McSpencer Enterprise (Pty) Ltd · 208 Jeppe Street, Johannesburg · South Africa</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from: '"McSpencer Enterprise" <no-reply@mcspencerenterprise.co.za>',
    to: opts.to,
    subject: `Order Confirmed — ${opts.orderNumber} | McSpencer Enterprise`,
    html,
    text: `Hi ${opts.customerName}, your order ${opts.orderNumber} has been received. Total: ${formatZAR(opts.total)}. Our team will contact you within 24 hours with payment instructions. Questions? Email support@mcspencerenterprise.co.za`,
  });
}
