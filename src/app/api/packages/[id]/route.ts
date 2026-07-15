import { updatePackage, deletePackage } from "@/lib/packages";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAdmin();
  if (!authed) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const updated = updatePackage(id, body);
  if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAdmin();
  if (!authed) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const deleted = deletePackage(id);
  if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ success: true });
}
