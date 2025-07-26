import { getOrderUsedParts, addUsedPart } from '@/libs/db';
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
    const parts = await getOrderUsedParts(orderId);
    return new Response(JSON.stringify(parts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener repuestos' }), {
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

  const partData = await request.json();

  try {
    await addUsedPart(partData);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al registrar repuesto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}