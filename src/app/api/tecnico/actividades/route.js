import { getOrderActivities, addTechnicianActivity } from '@/libs/db';
import { getSession } from 'next-auth/react';

export async function GET(request) {
  const session = await getSession({ req: request });
  if (!session || session.user.role !== 'tecnico') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  try {
    const activities = await getOrderActivities(orderId);
    return new Response(JSON.stringify(activities), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener actividades' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  const session = await getSession({ req: request });
  if (!session || session.user.role !== 'tecnico') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const activityData = await request.json();

  try {
    await addTechnicianActivity({
      ...activityData,
      technician_id: session.user.id
    });
    
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al crear actividad' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}