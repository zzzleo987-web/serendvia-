import { updateChronicle, deleteChronicle, getChronicleBySlug } from "@/lib/chronicles";
import { isAdmin } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!await isAdmin()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  try {
    const data = await req.json();
    const updated = updateChronicle(slug, data);
    if (!updated) {
      return Response.json({ error: "Story not found" }, { status: 404 });
    }
    return Response.json(updated);
  } catch (err) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!await isAdmin()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const success = deleteChronicle(slug);
  if (!success) {
    return Response.json({ error: "Story not found" }, { status: 404 });
  }
  return Response.json({ message: "Deleted" });
}
