// src/app/api/finanzas/route.js
import { getFinancialDataByClient } from '@/libs/db';

export async function GET() {
  // Temporal: usar un clientId fijo para pruebas
  const clientId = 'CL001'; // Cambia esto por el ID de cliente real
  
  try {
    const data = await getFinancialDataByClient(clientId);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}