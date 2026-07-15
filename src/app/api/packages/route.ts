import { getPackages, createPackage } from "@/lib/packages";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const packages = getPackages();
  return Response.json(packages);
}

export async function POST(request: Request) {
  const authed = await isAdmin();
  if (!authed) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newPkg = createPackage(body);
    return Response.json(newPkg, { status: 201 });
  } catch (err) {
    return Response.json({ error: "Invalid data" }, { status: 400 });
  }
}
