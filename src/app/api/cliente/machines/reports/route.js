import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import db from '@/libs/db';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const { machineId, description, severity } = await request.json();

  if (!session) {
    return Response.json({ error: 'No autenticado' }, { status: 401 });
  }

  if (!machineId || !description) {
    return Response.json(
      { error: 'Se requieren ID de máquina y descripción' },
      { status: 400 }
    );
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

    // Crear reporte
    db.prepare(`
      INSERT INTO machine_reports 
      (machine_id, client_id, description, severity)
      VALUES (?, ?, ?, ?)
    `).run(machineId, session.user.id, description, severity || 'Media');

    // Actualizar estado de la máquina
    db.prepare(`
      UPDATE poker_machines 
      SET status = 'Fuera de servicio', updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(machineId);

    return Response.json({ 
      message: 'Reporte creado exitosamente',
      reportId: machineId
    });
  } catch (error) {
    console.error('Error al crear reporte:', error);
    return Response.json(
      { error: 'Error al crear reporte' },
      { status: 500 }
    );
  }
}