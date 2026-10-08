import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EVENT_TYPES = [
  "Wedding / Sangeet",
  "Corporate event",
  "College fest",
  "Birthday / Private party",
  "Other",
];

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isPhone = (v) => /^\+?[\d\s()-]{7,20}$/.test(v) && v.replace(/\D/g, "").length >= 7;

function validate({ name, contact, eventType, city, date, message }) {
  if (!name || name.length < 2 || name.length > 100) return "Enter your name (2–100 characters).";
  if (!contact || !(isEmail(contact) || isPhone(contact))) return "Enter a valid phone number or email address.";
  if (!EVENT_TYPES.includes(eventType)) return "Choose an event type.";
  if (city.length > 80) return "Keep the city under 80 characters.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) return "Choose the event date.";
  if (message && message.length > 1500) return "Keep event details under 1500 characters.";
  return null;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The request was not valid JSON." }, { status: 400 });
  }

  // Honeypot: real visitors never fill the hidden "company" field
  if (body.company) return Response.json({ ok: true });

  const data = {
    name: String(body.name ?? "").trim(),
    contact: String(body.contact ?? "").trim(),
    eventType: String(body.eventType ?? "").trim(),
    city: String(body.city ?? "").trim(),
    date: String(body.date ?? "").trim(),
    message: String(body.message ?? "").trim(),
  };

  const problem = validate(data);
  if (problem) return Response.json({ error: problem }, { status: 400 });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, BOOKING_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Booking email not sent: SMTP_USER / SMTP_PASS are not set.");
    return Response.json({ error: "Online booking isn't set up yet. Send the request by email instead." }, { status: 503 });
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const prettyDate = new Date(`${data.date}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const rows = [
    ["Name", data.name],
    ["Contact", data.contact],
    ["Event type", data.eventType],
    ["City", data.city || "Not provided"],
    ["Date", prettyDate],
    ["Details", data.message || "Not provided"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#0D0C0B">
      <h2 style="background:#FF5B35;padding:16px 20px;margin:0;border-radius:8px 8px 0 0">New booking request</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="padding:12px 20px;border-bottom:1px solid #eee;font-weight:bold;width:120px;vertical-align:top">${k}</td>
              <td style="padding:12px 20px;border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(v)}</td>
            </tr>`
          )
          .join("")}
      </table>
      <p style="font-size:12px;color:#777">Sent from the booking form on your portfolio site.</p>
    </div>`;

  try {
    await transporter.sendMail({
      from: `"Portfolio Bookings" <${SMTP_USER}>`,
      to: BOOKING_TO || "jokekarshadab@gmail.com",
      replyTo: isEmail(data.contact) ? data.contact : undefined,
      subject: `Booking: ${data.eventType}${data.city ? ` in ${data.city}` : ""} on ${prettyDate} (${data.name})`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Booking email failed:", err);
    return Response.json({ error: "The email server didn't accept the request. Send it by email instead." }, { status: 502 });
  }
}
