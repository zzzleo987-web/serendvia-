import { getAdminCredentials, createSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const creds = getAdminCredentials();

    if (username !== creds.username || password !== creds.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await createSession({
      username: creds.username,
      role: "admin",
      name: creds.name,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

