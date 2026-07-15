import {
  getDestinationBySlug,
  addNearbyPlace,
  reorderNearbyPlaces,
} from "@/lib/destinations";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(dest.nearbyPlaces);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authed = await isAdmin();
  if (!authed) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  const body = await request.json();
  const place = addNearbyPlace(slug, body);
  if (!place) return Response.json({ error: "Destination not found" }, { status: 404 });
  return Response.json(place, { status: 201 });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authed = await isAdmin();
  if (!authed) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  const { orderedSlugs } = await request.json();
  const result = reorderNearbyPlaces(slug, orderedSlugs);
  if (!result) return Response.json({ error: "Destination not found" }, { status: 404 });
  return Response.json(result);
}
