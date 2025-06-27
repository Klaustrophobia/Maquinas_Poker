import { connectDB } from '@/lib/db';
import { authenticateRole } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'tecnico'])(req);
  if (auth) return auth;

  try {
    const db = await connectDB();
    const result = await db.request().query('SELECT * FROM Mantenimientos');
    return NextResponse.json(result.recordset);
  } catch (error: unknown) {
    // Manejo de errores: imprime en consola para depuración
    if (error instanceof Error) {
      console.error('Error al obtener mantenimientos:', error.message);
      return NextResponse.json({ error: `Error en obtener mantenimientos: ${error.message}` }, { status: 500 });
    }
    // Si el error no es una instancia de Error, es un error desconocido
    console.error('Error desconocido al obtener mantenimientos:', error);
    return NextResponse.json({ error: 'Error desconocido al obtener mantenimientos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'cliente'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const { orden_trabajo_id, tipo, descripcion, acciones_realizadas, repuestos_utilizados, costo_estimado, costo_real, fecha_programada, fecha_realizacion, tecnico_id, resultado, observaciones } = body;
    const db = await connectDB();
    await db
      .request()
      .input('orden_trabajo_id', orden_trabajo_id)
      .input('tipo', tipo)
      .input('descripcion', descripcion)
      .input('acciones_realizadas', acciones_realizadas)
      .input('repuestos_utilizados', repuestos_utilizados)
      .input('costo_estimado', costo_estimado)
      .input('costo_real', costo_real)
      .input('fecha_programada', fecha_programada)
      .input('fecha_realizacion', fecha_realizacion)
      .input('tecnico_id', tecnico_id)
      .input('resultado', resultado)
      .input('observaciones', observaciones)
      .query("INSERT INTO Mantenimientos (orden_trabajo_id, tipo, descripcion, acciones_realizadas, repuestos_utilizados, costo_estimado, costo_real, fecha_programada, fecha_realizacion, tecnico_id, resultado, observaciones) VALUES (@orden_trabajo_id, @tipo, @descripcion, @acciones_realizadas, @repuestos_utilizados, @costo_estimado, @costo_real, @fecha_programada, @fecha_realizacion, @tecnico_id, @resultado, @observaciones)");
    return NextResponse.json({ message: 'Falla reportada' });
  } 
  catch (error: unknown) {
    // Manejo de errores: imprime en consola para depuración
    if (error instanceof Error) {
      console.error('Error al reportar falla:', error.message);
      return NextResponse.json({ error: `Error al reportar falla: ${error.message}` }, { status: 500 });
    }
    // Si el error no es una instancia de Error, es un error desconocido
    console.error('Error desconocido al reportar falla:', error);
    return NextResponse.json({ error: 'Error desconocido al reportar falla' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'tecnico'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const { id } = body;
    const db = await connectDB();
    await db
      .request()
      .input('id', id)
      .query("UPDATE ordenes_trabajo SET estado='resuelto' WHERE id=@id");
    return NextResponse.json({ message: 'Estado actualizado a resuelto' });
  } 
  catch (error: unknown) {
    // Manejo de errores: imprime en consola para depuración
    if (error instanceof Error) {
      console.error('Error al actualizar estado:', error.message);
      return NextResponse.json({ error: `Error en actualizar estado: ${error.message}` }, { status: 500 });
    }
    // Si el error no es una instancia de Error, es un error desconocido
    console.error('Error desconocido al actualizar estado:', error);
    return NextResponse.json({ error: 'Error desconocido al actualizar estado' }, { status: 500 });
  }
}