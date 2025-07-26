import { getWorkOrderDetails } from '@/libs/db';
import { getSession } from 'next-auth/react';

export async function GET(request, { params }) {
  const session = await getSession({ req: request });
  
  if (!session || session.user.role !== 'tecnico') {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = params;

  try {
    // Verifica que la orden pertenezca al técnico logueado
    const order = await getWorkOrderDetails(id, session.user.id);
    
    if (!order) {
      return Response.json({ error: 'Orden no encontrada o no tienes acceso' }, { status: 404 });
    }
    
    return Response.json(order);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}