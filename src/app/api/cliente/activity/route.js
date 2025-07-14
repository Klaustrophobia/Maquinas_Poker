import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import db from '@/libs/db';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId');
  const limit = searchParams.get('limit') || 5;

  if (!session) {
    return Response.json({ error: 'No autenticado' }, { status: 401 });
  }

  if (session.user.role !== 'cliente' || session.user.id !== clientId) {
    return Response.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    // Obtener reportes recientes
    const reports = db.prepare(`
      SELECT 
        id,
        'report' as type,
        description,
        created_at as date,
        'Reporte de máquina' as title
      FROM machine_reports
      WHERE client_id = ?
      ORDER BY created_at DESC
      LIMIT ?
    `).all(clientId, limit);

    // Obtener cambios de estado recientes (simplificado)
    const statusChanges = db.prepare(`
      SELECT 
        'status_change' as type,
        'Cambio de estado: ' || status as description,
        updated_at as date,
        'Actualización de máquina' as title
      FROM poker_machines
      WHERE client_id = ?
      ORDER BY updated_at DESC
      LIMIT ?
    `).all(clientId, limit);

    // Combinar y ordenar actividades
    const activities = [...reports, ...statusChanges]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);

    return Response.json(activities);
  } catch (error) {
    console.error('Error al obtener actividad:', error);
    return Response.json(
      { error: 'Error al obtener actividad reciente' },
      { status: 500 }
    );
  }
}