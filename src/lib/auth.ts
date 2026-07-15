import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const SESSION_COOKIE = "serendivia_session";
const ADMIN_DATA_PATH = path.join(process.cwd(), "src", "data", "admin.json");

export type UserRole = "admin" | "customer";

export interface SessionData {
  username: string;
  role: UserRole;
  name: string;
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (!session?.value) return null;
  
  try {
    return JSON.parse(atob(session.value)) as SessionData;
  } catch {
    return null;
  }
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return session?.role === "admin";
}

export function getAdminCredentials() {
  if (!fs.existsSync(ADMIN_DATA_PATH)) {
    return {
      username: "admin",
      password: "Serendivia@2024",
      name: "Admin",
    };
  }
  const raw = fs.readFileSync(ADMIN_DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function createSession(data: SessionData) {
  const cookieStore = await cookies();
  const value = btoa(JSON.stringify(data));
  cookieStore.set(SESSION_COOKIE, value, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export function updateAdminCredentials(updates: Partial<typeof getAdminCredentials extends () => infer R ? R : any>) {
  const current = getAdminCredentials();
  const updated = { ...current, ...updates };
  fs.writeFileSync(ADMIN_DATA_PATH, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}


