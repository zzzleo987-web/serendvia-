import { updateNearbyPlace, deleteNearbyPlace } from "@/lib/destinations";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string; placeSlug: string }> }
) {
  const authed = await isAdmin();
  if (!authed) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { slug, placeSlug } = await params;
  const body = await request.json();
  const updated = updateNearbyPlace(slug, placeSlug, body);
  if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string; placeSlug: string }> }
) {
  const authed = await isAdmin();
  if (!authed) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { slug, placeSlug } = await params;
  const deleted = deleteNearbyPlace(slug, placeSlug);
  if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ success: true });
}
