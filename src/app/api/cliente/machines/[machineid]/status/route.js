import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import db from '@/libs/db';

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  const { machineId } = params;
  const { status } = await request.json();

  if (!session) {
    return Response.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    // Verificar que la máquina pertenece al cliente
    const machine = db.prepare(`
      SELECT id FROM poker_machines 
      WHERE id = ? AND client_id = ?
    `).get(machineId, session.user.id);

    if (!machine) {
      return Response.json({ error: 'Máquina no encontrada' }, { status: 404 });
    }

    // Actualizar estado
    db.prepare(`
      UPDATE poker_machines 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(status, machineId);

    return Response.json({ 
      message: `Estado de la máquina actualizado a ${status}`,
      machineId
    });
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    return Response.json(
      { error: 'Error al actualizar estado' },
      { status: 500 }
    );
  }
}