import { clearSession } from "@/lib/auth";
import { RedirectType, redirect } from "next/navigation";

export async function POST() {
  await clearSession();
  return Response.json({ success: true });
}

// Support GET for simple links if needed
export async function GET() {
  await clearSession();
  redirect("/", RedirectType.replace);
}
