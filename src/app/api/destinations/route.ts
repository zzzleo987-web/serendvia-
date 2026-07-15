import { getDestinations, createDestination, getDestinationBySlug } from "@/lib/destinations";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const destinations = getDestinations();
  return Response.json(destinations);
}

export async function POST(req: Request) {
  if (!await isAdmin()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    
    if (!data.slug || !data.name) {
      return Response.json({ error: "Name and Slug are required" }, { status: 400 });
    }

    if (getDestinationBySlug(data.slug)) {
      return Response.json({ error: "Destination with this slug already exists" }, { status: 400 });
    }

    const newDest = createDestination({
      ...data,
      nearbyPlaces: [],
      facts: data.facts || [],
      packageIds: data.packageIds || []
    });

    return Response.json(newDest);
  } catch (err) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

