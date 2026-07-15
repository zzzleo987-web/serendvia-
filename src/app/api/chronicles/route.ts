import { createChronicle, getChronicleBySlug } from "@/lib/chronicles";
import { isAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  if (!await isAdmin()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    
    if (!data.slug || !data.title) {
      return Response.json({ error: "Title and Slug are required" }, { status: 400 });
    }

    if (getChronicleBySlug(data.slug)) {
      return Response.json({ error: "Story with this slug already exists" }, { status: 400 });
    }

    const newStory = createChronicle(data);
    return Response.json(newStory);
  } catch (err) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
