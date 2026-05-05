"use client";

import { useState } from "react";

type Props = {
  email: string;
  className?: string;
};

/** Plain e-mail display + copy — avoids mailto: so users aren’t sent to the mail app by accident. */
export function CopyEmail({ email, className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <div className={className}>
      <p className="mt-1 break-all text-sm font-medium text-foreground">{email}</p>
      <button
        type="button"
        onClick={copy}
        className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-foreground underline underline-offset-4 hover:no-underline"
      >
        {copied ? "Gekopieërd" : "Kopieer adres"}
      </button>
    </div>
  );
}
