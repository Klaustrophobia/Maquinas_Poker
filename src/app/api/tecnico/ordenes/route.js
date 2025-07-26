import { getTechnicianOrders } from '@/libs/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth'; // Cambiado a la ubicación correcta

export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return Response.json({ 
      error: 'Debes iniciar sesión para acceder a este recurso',
      code: 'UNAUTHENTICATED'
    }, { status: 401 });
  }

  if (session.user.role !== 'tecnico') {
    return Response.json({ 
      error: 'No tienes permisos para acceder a este recurso',
      requiredRole: 'tecnico',
      yourRole: session.user.role,
      code: 'UNAUTHORIZED'
    }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  try {
    const orders = await getTechnicianOrders(session.user.id, status || null);
    const safeOrders = Array.isArray(orders) ? orders : [];
    return Response.json({
    success: true,
    data: safeOrders, 
    meta: {
      count: safeOrders.length,
      technician: session.user.id
    }
  });
  } catch (error) {
    console.error('Error fetching technician orders:', error);
    return Response.json({ 
      error: 'Error al obtener las órdenes',
      details: error.message,
      code: 'SERVER_ERROR'
    }, { status: 500 });
  }
}