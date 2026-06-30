import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const DEFAULT_RECEIVE_ADDRESS = "info@destormedesign.be";

function stripQuotes(v: string): string {
  return v.replace(/^["']+|["']+$/g, "").trim();
}

function normalizeEmail(addr: string): string {
  const match = addr.match(/<([^>]+)>/);
  return (match ? match[1] : addr).trim().toLowerCase();
}

export async function POST(req: Request) {
  const rawBody = await req.text();

  const apiKey = process.env.RESEND_API_KEY
    ? stripQuotes(process.env.RESEND_API_KEY.trim())
    : "";
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET
    ? stripQuotes(process.env.RESEND_WEBHOOK_SECRET.trim())
    : "";

  if (!apiKey || !webhookSecret) {
    console.error("RESEND_API_KEY or RESEND_WEBHOOK_SECRET is not set");
    return Response.json({ error: "Not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);

  let event;
  try {
    event = resend.webhooks.verify({
      payload: rawBody,
      headers: {
        id: req.headers.get("svix-id") ?? "",
        timestamp: req.headers.get("svix-timestamp") ?? "",
        signature: req.headers.get("svix-signature") ?? "",
      },
      webhookSecret,
    });
  } catch (err) {
    console.error("Resend webhook verification failed:", err);
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  if (event.type !== "email.received") {
    return Response.json({ ok: true });
  }

  const receiveAddress = normalizeEmail(
    stripQuotes(
      (process.env.INBOUND_RECEIVE_ADDRESS ?? DEFAULT_RECEIVE_ADDRESS).trim(),
    ),
  );
  const forwardTo = stripQuotes(
    (process.env.INBOUND_FORWARD_TO ?? site.email).trim(),
  );
  const forwardFrom = process.env.INBOUND_FORWARD_FROM
    ? stripQuotes(process.env.INBOUND_FORWARD_FROM.trim())
    : process.env.CONTACT_FROM_EMAIL
      ? stripQuotes(process.env.CONTACT_FROM_EMAIL.trim())
      : `DESTORME DESIGN <${DEFAULT_RECEIVE_ADDRESS}>`;

  const recipients = [
    ...event.data.to,
    ...event.data.cc,
    ...event.data.bcc,
  ].map(normalizeEmail);

  if (!recipients.includes(receiveAddress)) {
    return Response.json({ ok: true, skipped: true });
  }

  const { data, error } = await resend.emails.receiving.forward({
    emailId: event.data.email_id,
    to: forwardTo,
    from: forwardFrom,
  });

  if (error) {
    console.error("Inbound email forward failed:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, id: data.id });
}
