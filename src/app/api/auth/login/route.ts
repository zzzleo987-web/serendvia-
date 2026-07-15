import { getAdminCredentials, createSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // Check if it's admin
    const adminCreds = getAdminCredentials();
    if (username === adminCreds.username && password === adminCreds.password) {
      await createSession({
        username: adminCreds.username,
        role: "admin",
        name: adminCreds.name,
      });
      return NextResponse.json({ success: true, role: "admin" });
    }

    // Check if it's a customer (mock for now)
    if (username === "customer" && password === "customer123") {
      await createSession({
        username: "customer",
        role: "customer",
        name: "Test Customer",
      });
      return NextResponse.json({ success: true, role: "customer" });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
