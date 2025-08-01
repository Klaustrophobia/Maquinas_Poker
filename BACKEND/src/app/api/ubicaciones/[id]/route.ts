import { NextRequest, NextResponse } from 'next/server';
import { getItemUbicacionController } from '@/controllers/ubicaciones.controller';
import { corsHeaders, handlePreflight } from '@/lib/cors';

export async function OPTIONS() {
  return handlePreflight();
}

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
  const id = Number(params.id);

    const result = await getItemUbicacionController(id);
    
    if (result.error) {
      return new NextResponse(JSON.stringify({ error: result.error }), {
        status: 401,
        headers: corsHeaders
      });
    }

    return new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: corsHeaders
    });
    
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error en login (POST):', error.message);
      return new NextResponse(JSON.stringify({ error: `Error en login: ${error.message}` }), { status: 500 });
    }
    console.error('Error desconocido en login (POST):', error);
    return new NextResponse(JSON.stringify({ error: 'Error desconocido en login' }), { status: 500 });
  }
}