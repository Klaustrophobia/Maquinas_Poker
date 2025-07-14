import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import db from '@/libs/db';

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: 'No autenticado' }, { status: 401 });
  }

  if (session.user.role !== 'cliente') {
    return Response.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    const machines = db.prepare(`
      SELECT * FROM poker_machines 
      WHERE client_id = ?
      ORDER BY status, name
    `).all(session.user.id);

    return Response.json(machines);
  } catch (error) {
    console.error('Error al obtener máquinas:', error);
    return Response.json(
      { error: 'Error al obtener máquinas' },
      { status: 500 }
    );
  }
}