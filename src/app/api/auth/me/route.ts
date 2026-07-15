import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json(null);
  
  // Return only safe info
  return Response.json({
    role: session.role,
    name: session.name
  });
}
