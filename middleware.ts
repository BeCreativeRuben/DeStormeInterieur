import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GONE_HTML = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex, nofollow"/>
<title>Website niet beschikbaar</title>
</head>
<body style="font-family:system-ui,sans-serif;margin:2rem;color:#111">
<p>Deze website is niet meer beschikbaar.</p>
</body>
</html>`;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Keep inbound email forwarding webhook working.
  if (pathname.startsWith("/api/webhooks/resend")) {
    return NextResponse.next();
  }

  // All other API routes are gone.
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Gone" }, { status: 410 });
  }

  // Let Next serve its own internals; still attach noindex where possible.
  if (
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt"
  ) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  // Public HTML: 410 Gone with minimal body (no personal/business content).
  return new NextResponse(GONE_HTML, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
