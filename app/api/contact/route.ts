export async function POST() {
  return Response.json({ error: "Gone" }, { status: 410 });
}

export async function GET() {
  return Response.json({ error: "Gone" }, { status: 410 });
}
