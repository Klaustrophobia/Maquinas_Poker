// import { connectDB } from '@/lib/db';
import { authenticateRole } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
// importamos la conexion de TypeORM y la entidad
import { getDataSource } from '@/data-source';
import { Mantenimiento } from '@/entity/Mantenimiento';

export async function GET(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'tecnico'])(req);
  if (auth) return auth;

  try {
    // Conexión a la base de datos
    const db = await getDataSource();
    const mantenimientoRepository = db.getRepository(Mantenimiento);

    const result = await mantenimientoRepository.find();
    return NextResponse.json(result);
  } catch (error) {
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
    // const db = await connectDB();
    if (!orden_trabajo_id || !tipo || !descripcion || !acciones_realizadas || !repuestos_utilizados || !costo_estimado || !costo_real || !fecha_programada || !fecha_realizacion || !tecnico_id || !resultado) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }
    // Conexión a la base de datos
    const db = await getDataSource();
    const mantenimientoRepository = db.getRepository(Mantenimiento);
    const nuevoMantenimiento = mantenimientoRepository.create({
      ordenTrabajo: { id: orden_trabajo_id }, // Asignamos la relación con la orden de trabajo
      tipo,
      descripcion,
      acciones_realizadas,
      repuestos_utilizados,
      costo_estimado,
      costo_real,
      fecha_programada,
      fecha_realizacion,
      tecnico: { id: tecnico_id },
      resultado,
      observaciones
    });
    await mantenimientoRepository.save(nuevoMantenimiento);
    // Respuesta exitosa
    return NextResponse.json({ message: 'Falla reportada exitosamente' });
  } 
  catch (error) {
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
    if (!id) {
      return NextResponse.json({ error: 'Falta el ID del mantenimiento' }, { status: 400 });
    }
    // Conexión a la base de datos
    const db = await getDataSource();
    const mantenimientoRepository = db.getRepository(Mantenimiento);
    // Verificar si el mantenimiento existe
    const mantenimiento = await mantenimientoRepository.findOne({ where: { id } });
    if (!mantenimiento) {
      return NextResponse.json({ error: 'Mantenimiento no encontrado' }, { status: 404 });
    }
    mantenimiento.resultado = 'Realizado';
    await mantenimientoRepository.save(mantenimiento);
    return NextResponse.json({ message: 'Estado actualizado a realizado' });
  }
  catch (error) {
    // Manejo de errores: imprime en consola para depuración
    if (error instanceof Error) {
      console.error('Error al actualizar resultado:', error.message);
      return NextResponse.json({ error: `Error en actualizar resultado: ${error.message}` }, { status: 500 });
    }
    // Si el error no es una instancia de Error, es un error desconocido
    console.error('Error desconocido al actualizar resultado:', error);
    return NextResponse.json({ error: 'Error desconocido al actualizar resultado' }, { status: 500 });
  }
}