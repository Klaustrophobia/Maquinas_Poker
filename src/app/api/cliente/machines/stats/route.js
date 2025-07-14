import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import db from '@/libs/db';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId');

  if (!session) {
    return Response.json({ error: 'No autenticado' }, { status: 401 });
  }

  // Solo clientes pueden ver sus propias estadísticas
  if (session.user.role !== 'cliente' || session.user.id !== clientId) {
    return Response.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    const stats = db.prepare(`
      SELECT 
        SUM(CASE WHEN status = 'Operativa' THEN 1 ELSE 0 END) as operational,
        SUM(CASE WHEN status = 'En mantenimiento' THEN 1 ELSE 0 END) as maintenance,
        SUM(CASE WHEN status = 'Fuera de servicio' THEN 1 ELSE 0 END) as outOfService
      FROM poker_machines
      WHERE client_id = ?
    `).get(clientId);

    return Response.json({
      operational: stats.operational || 0,
      maintenance: stats.maintenance || 0,
      outOfService: stats.outOfService || 0
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return Response.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}