// import { connectDB } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
// importamos la conexion de TypeORM y la entidad
import { getDataSource } from '@/data-source';
import { Maquina } from '@/entity/Maquina';
import { corsHeaders, handlePreflight } from '@/lib/cors';

export async function OPTIONS() {
  return handlePreflight();
}

//Get para traer la lista de maquinas
export async function GET(req: NextRequest) {
  try {
    // Conexión a la base de datos
    const db = await getDataSource();
    const maquinaRepository = db.getRepository(Maquina);

    // Obtener la lista de maquinas
    const maquinas = await maquinaRepository.find();

    return new NextResponse(JSON.stringify(maquinas), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error en obtener maquinas (GET):', error.message);
      return NextResponse.json({ error: `Error en obtener maquinas: ${error.message}` }, { status: 500 });
    }
    console.error('Error desconocido en obtener maquinas (GET):', error);
    return NextResponse.json({ error: 'Error desconocido en obtener maquinas' }, { status: 500 });
  }
}
