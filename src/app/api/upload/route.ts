import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { isAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  const authed = await isAdmin();
  if (!authed) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const destSlug = formData.get("destSlug") as string | null;
    const type = formData.get("type") as string || "image"; // image or video
    const category = formData.get("category") as string || "general"; // e.g., 'hero', 'nearby', 'gallery'

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Determine storage path
    // Default: public/content/uploads/
    // If destSlug: public/content/destinations/[slug]/[type]s/
    let relativeDir = "content/uploads";
    if (destSlug) {
      relativeDir = `content/destinations/${destSlug}/${type}s`;
    }

    const absoluteDir = join(process.cwd(), "public", relativeDir);
    
    // 2. Ensure directory exists
    await mkdir(absoluteDir, { recursive: true });

    // 3. Create unique-ish filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${category}_${timestamp}_${sanitizedName}`;
    const absolutePath = join(absoluteDir, fileName);
    const publicPath = `/${relativeDir}/${fileName}`;

    // 4. Write file
    await writeFile(absolutePath, buffer);

    return Response.json({ 
      url: publicPath,
      name: fileName
    });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
