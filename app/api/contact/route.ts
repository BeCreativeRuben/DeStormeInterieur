import { Resend } from "resend";
import { buildConfirmationEmail, buildStudioNotificationEmail } from "@/lib/email-templates";
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

  const stripQuotes = (v: string) => v.replace(/^["']+|["']+$/g, "").trim();
  const apiKey = process.env.RESEND_API_KEY
    ? stripQuotes(process.env.RESEND_API_KEY.trim())
    : "";
  const from = process.env.CONTACT_FROM_EMAIL
    ? stripQuotes(process.env.CONTACT_FROM_EMAIL.trim())
    : "";
  const toEnv = process.env.CONTACT_TO_EMAIL?.trim();
  const to = toEnv ? stripQuotes(toEnv) : site.email;

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

  const { html: studioHtml, text: studioText } = buildStudioNotificationEmail({
    rows,
    message,
  });

  const confirmSubject = `We hebben je aanvraag ontvangen — ${site.title}`;
  const firstName = name.split(/\s+/)[0] ?? name;
  const { html: confirmHtml, text: confirmText } = buildConfirmationEmail({ firstName });

  const notifySubject = `Website: aanvraag van ${name}`;

  type SendErr =
    | { name?: string | null; message?: string | null; statusCode?: number | null }
    | undefined;
  type EmailSendResult = Awaited<ReturnType<typeof resend.emails.send>>;
  let notifyResult: EmailSendResult;
  let confirmResult: EmailSendResult;
  try {
    [notifyResult, confirmResult] = await Promise.all([
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
  } catch (err) {
    console.error("Resend threw:", err);
    return Response.json(
      {
        error: "Het verzenden is mislukt. Probeer later opnieuw of bel ons.",
        code: "RESEND_EXCEPTION",
      },
      { status: 502 },
    );
  }

  const notifyErr = notifyResult.error;
  const confirmErr = confirmResult.error;

  const resendDetail = (e: SendErr) =>
    e?.message ?? e?.name ?? (e?.statusCode != null ? `HTTP ${e.statusCode}` : undefined);

  if (notifyErr && confirmErr) {
    console.error("Resend errors:", notifyErr, confirmErr);
    return Response.json(
      {
        error: "Het verzenden is mislukt. Probeer later opnieuw of bel ons.",
        code: "RESEND_BOTH_FAILED",
        hints: [
          resendDetail(notifyErr) && `Studio-mail: ${resendDetail(notifyErr)}`,
          resendDetail(confirmErr) && `Bevestigingsmail: ${resendDetail(confirmErr)}`,
        ].filter(Boolean),
      },
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
