import { getDestinationBySlug, updateDestination } from "@/lib/destinations";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(dest);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authed = await isAdmin();
  if (!authed) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  const body = await request.json();
  const updated = updateDestination(slug, body);
  if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(updated);
}
