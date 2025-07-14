// src/app/api/auth/session/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response(JSON.stringify({ error: 'No autenticado' }), {
      status: 401
    });
  }

  return new Response(JSON.stringify(session));
}