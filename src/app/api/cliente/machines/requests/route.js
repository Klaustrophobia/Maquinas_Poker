import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import db from '@/libs/db';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const { name, model, location, reason } = await request.json();

  if (!session) {
    return Response.json({ error: 'No autenticado' }, { status: 401 });
  }

  if (!name || !reason) {
    return Response.json(
      { error: 'Nombre y motivo son requeridos' },
      { status: 400 }
    );
  }

  try {
    // Crear solicitud
    const result = db.prepare(`
      INSERT INTO machine_requests 
      (client_id, name, model, location, reason)
      VALUES (?, ?, ?, ?, ?)
    `).run(session.user.id, name, model || '', location || '', reason);

    return Response.json({ 
      message: 'Solicitud creada exitosamente',
      requestId: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    return Response.json(
      { error: 'Error al crear solicitud' },
      { status: 500 }
    );
  }
}