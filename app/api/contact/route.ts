import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const MAX = {
  name: 200,
  email: 320,
  phone: 40,
  projectType: 120,
  location: 200,
  timing: 120,
  message: 8000,
} as const;

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  location?: string;
  timing?: string;
  message?: string;
  privacy?: boolean;
  _hp?: string;
};

function trim(s: unknown, max: number): string {
  const t = typeof s === "string" ? s.trim() : "";
  return t.slice(0, max);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let json: Body;
  try {
    json = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  if (trim(json._hp, 200)) {
    return Response.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() ?? site.email;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return Response.json(
      {
        error: "E-mail is tijdelijk niet beschikbaar. Probeer later opnieuw of bel ons.",
        code: "MISSING_RESEND_API_KEY",
      },
      { status: 503 },
    );
  }
  if (!from) {
    console.error("CONTACT_FROM_EMAIL is not set");
    return Response.json(
      {
        error: "E-mail is tijdelijk niet beschikbaar. Probeer later opnieuw of bel ons.",
        code: "MISSING_CONTACT_FROM_EMAIL",
      },
      { status: 503 },
    );
  }

  const name = trim(json.name, MAX.name);
  const email = trim(json.email, MAX.email);
  const phone = trim(json.phone, MAX.phone);
  const projectType = trim(json.projectType, MAX.projectType);
  const location = trim(json.location, MAX.location);
  const timing = trim(json.timing, MAX.timing);
  const message = trim(json.message, MAX.message);
  const privacy = json.privacy === true;

  if (!name || !email || !projectType || !location || !timing || !message) {
    return Response.json(
      { error: "Vul alle verplichte velden in." },
      { status: 400 },
    );
  }
  if (!privacy) {
    return Response.json(
      { error: "Je moet akkoord gaan met het privacybeleid." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Voer een geldig e-mailadres in." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const rows: [string, string][] = [
    ["Naam", name],
    ["E-mail", email],
    ...(phone ? ([["Telefoon", phone]] as [string, string][]) : []),
    ["Type project", projectType],
    ["Locatie", location],
    ["Timing", timing],
  ];

  const studioHtml = `
    <p>Nieuwe aanvraag via de website <strong>${escapeHtml(site.title)}</strong>.</p>
    <table style="border-collapse:collapse;max-width:560px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;font-weight:600">${escapeHtml(k)}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="margin-top:16px;font-weight:600">Bericht</p>
    <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
  `;

  const studioText = [
    `Nieuwe aanvraag via ${site.title}`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Bericht:",
    message,
  ].join("\n");

  const confirmSubject = `We hebben je aanvraag ontvangen — ${site.title}`;
  const confirmHtml = `
    <p>Beste ${escapeHtml(name.split(/\s+/)[0] ?? name)},</p>
    <p>Bedankt voor je aanvraag. We hebben je bericht goed ontvangen en nemen zo snel mogelijk contact met je op, doorgaans binnen twee werkdagen.</p>
    <p style="margin-top:20px">Met vriendelijke groet,<br><strong>${escapeHtml(site.title)}</strong></p>
  `;
  const confirmText = [
    `Beste ${name.split(/\s+/)[0] ?? name},`,
    "",
    "Bedankt voor je aanvraag. We hebben je bericht goed ontvangen en nemen zo snel mogelijk contact met je op, doorgaans binnen twee werkdagen.",
    "",
    `Met vriendelijke groet,`,
    site.title,
  ].join("\n");

  const notifySubject = `Website: aanvraag van ${name}`;

  const [notifyResult, confirmResult] = await Promise.all([
    resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: notifySubject,
      html: studioHtml,
      text: studioText,
    }),
    resend.emails.send({
      from,
      to: [email],
      subject: confirmSubject,
      html: confirmHtml,
      text: confirmText,
    }),
  ]);

  const notifyErr = notifyResult.error;
  const confirmErr = confirmResult.error;

  if (notifyErr && confirmErr) {
    console.error("Resend errors:", notifyErr, confirmErr);
    return Response.json(
      { error: "Het verzenden is mislukt. Probeer later opnieuw of bel ons." },
      { status: 502 },
    );
  }

  if (notifyErr) {
    console.error("Resend notify error:", notifyErr);
  }
  if (confirmErr) {
    console.error("Resend confirmation error:", confirmErr);
  }

  if (notifyErr || confirmErr) {
    return Response.json(
      {
        error:
          notifyErr && !confirmErr
            ? "Je bevestiging is verstuurd, maar de aanvraag bij de studio kon niet volledig worden afgeleverd. Neem bij voorkeur telefonisch contact op."
            : !notifyErr && confirmErr
              ? "Je aanvraag is doorgestuurd naar de studio, maar de bevestigingsmail kon niet worden verstuurd. Controleer je inbox (spam) of neem contact op als je niets hoort."
              : "Het verzenden is gedeeltelijk mislukt. Probeer later opnieuw of bel ons.",
        partial: true,
      },
      { status: 207 },
    );
  }

  return Response.json({ ok: true });
}
