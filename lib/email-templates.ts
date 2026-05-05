/**
 * Inline HTML + table layout for transactional mail clients.
 * Matches site tokens: globals.css (--background, --accent, …).
 */

import { site, siteUrl } from "@/lib/site";

/** Absolute URL for email clients (never relative). */
export function publicAssetUrl(path: string): string {
  const base = siteUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

const bg = "#f7f7f7";
const surface = "#ffffff";
const fg = "#0a0a0a";
const muted = "#5c5c5c";
const accent = "#e1f033";
const border = "#eaeaea";

const fontStack =
  "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

function emailShell(innerHtml: string, preheader: string): string {
  const logoSrc = publicAssetUrl("/brand-mark.png");
  const escapePre = escapeHtml(preheader);

  return `<!DOCTYPE html>
<html lang="nl-BE">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${escapeHtml(site.title)}</title>
</head>
<body style="margin:0;padding:0;background:${bg};-webkit-font-smoothing:antialiased">
<span style="display:none!important;visibility:hidden;mso-hide:all;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden">${escapePre}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${bg};border-collapse:collapse">
<tr>
<td align="center" style="padding:40px 16px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-collapse:collapse;background:${surface};border:1px solid ${border}">
<tr>
<td style="padding:28px 32px;border-bottom:4px solid ${accent};background:${surface}">
<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
<tr>
<td style="vertical-align:middle;padding-right:16px">
<img src="${logoSrc}" alt="${escapeHtml(site.title)}" width="48" height="48" style="display:block;width:48px;height:48px;border-radius:50%;object-fit:cover;border:0"/>
</td>
<td style="vertical-align:middle;font-family:${fontStack}">
<p style="margin:0;font-size:13px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${fg};line-height:1.25">DESTORME</p>
<p style="margin:2px 0 0;font-size:10px;font-weight:300;letter-spacing:0.45em;text-transform:uppercase;color:${muted};line-height:1.2">DESIGN</p>
<p style="margin:8px 0 0;font-size:9px;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${muted};line-height:1.4">${escapeHtml(site.tagline)}</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:36px 32px;font-family:${fontStack};font-size:15px;line-height:1.65;color:${fg}">
${innerHtml}
</td>
</tr>
<tr>
<td style="padding:24px 32px;background:#fafafa;border-top:1px solid ${border};font-family:${fontStack};font-size:11px;line-height:1.6;color:${muted};letter-spacing:0.04em">
<p style="margin:0;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;font-size:10px;color:${fg}">${escapeHtml(site.title)}</p>
<p style="margin:10px 0 0">${escapeHtml(site.email)} · ${escapeHtml(site.phoneDisplay)}</p>
<p style="margin:12px 0 0">
<a href="${escapeHtml(siteUrl)}" style="color:${fg};font-weight:600;text-decoration:none;border-bottom:1px solid ${fg}">${escapeHtml(new URL(siteUrl).host)}</a>
&nbsp;·&nbsp;
<a href="${escapeHtml(site.instagram)}" style="color:${fg};font-weight:600;text-decoration:none;border-bottom:1px solid ${fg}">${escapeHtml(site.instagramHandle)}</a>
</p>
</td>
</tr>
</table>
<p style="margin:20px 0 0;font-family:${fontStack};font-size:10px;color:${muted};text-align:center">Je ontvangt deze mail na een actie op onze website.</p>
</td>
</tr>
</table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildConfirmationEmail(params: {
  firstName: string;
}): { html: string; text: string } {
  const { firstName } = params;
  const inner = `
<p style="margin:0 0 20px;font-size:11px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:${muted}">Bevestiging aanvraag</p>
<p style="margin:0 0 16px;font-size:20px;font-weight:600;line-height:1.3;color:${fg};letter-spacing:0.08em;text-transform:uppercase">Bedankt, ${escapeHtml(firstName)}</p>
<p style="margin:0 0 16px">Je aanvraag is goed bij ons binnengekomen. We bekijken je bericht persoonlijk en nemen <strong style="font-weight:600;color:${fg}">zo snel mogelijk contact</strong> met je op, doorgaans binnen <strong style="font-weight:600;color:${fg}">twee werkdagen</strong>.</p>
<p style="margin:0 0 28px;padding:14px 16px;background:${bg};border-left:3px solid ${accent};font-size:14px;color:${muted}">Controleer je inbox voor updates. Als je niets ziet binnen een paar minuten, bekijk ook je spam- of reclame-tab.</p>
<p style="margin:0;font-size:15px;line-height:1.6">Met vriendelijke groet,</p>
<p style="margin:8px 0 0;font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${fg}">${escapeHtml(site.title)}</p>
`;
  const preheader =
    `${firstName}, we hebben je aanvraag ontvangen. We antwoorden binnen twee werkdagen.`;

  const text = [
    `${site.title}`,
    "",
    `Beste ${firstName},`,
    "",
    "Je aanvraag is bij ons binnengekomen. We nemen zo snel mogelijk contact met je op, doorgaans binnen twee werkdagen.",
    "",
    site.email,
    site.phoneDisplay,
    siteUrl,
  ].join("\n");

  return { html: emailShell(inner, preheader), text };
}

export function buildStudioNotificationEmail(params: {
  rows: [string, string][];
  message: string;
}): { html: string; text: string } {
  const { rows, message } = params;
  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr>
<td style="padding:10px 16px 10px 0;vertical-align:top;font-family:${fontStack};font-size:13px;font-weight:700;color:${fg};letter-spacing:0.06em;text-transform:uppercase;border-bottom:1px solid ${border};width:140px">${escapeHtml(k)}</td>
<td style="padding:10px 0;vertical-align:top;font-family:${fontStack};font-size:14px;color:${muted};border-bottom:1px solid ${border}">${escapeHtml(v)}</td>
</tr>`,
    )
    .join("");

  const inner = `
<p style="margin:0 0 16px;font-size:11px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:${muted}">Website — nieuwe aanvraag</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${tableRows}</table>
<p style="margin:28px 0 10px;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${fg}">Bericht</p>
<p style="margin:0;font-size:14px;line-height:1.65;color:${muted};white-space:pre-wrap;font-family:${fontStack}">${escapeHtml(message)}</p>
`;

  const preheader = `Nieuwe contactaanvraag via ${site.title}`;

  const text = [
    `Nieuwe aanvraag via ${site.title}`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Bericht:",
    message,
  ].join("\n");

  return { html: emailShell(inner, preheader), text };
}
