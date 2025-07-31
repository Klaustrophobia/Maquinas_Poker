import { authenticateRole } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/data-source';
import { Inventario } from '@/entity/Inventario';
import { Repuesto } from '@/entity/Repuesto';

export async function GET(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'tecnico'])(req);
  if (auth) return auth;

  try {
    const db = await getDataSource();
    const inventarioRepository = db.getRepository(Inventario);
    const result = await inventarioRepository.find({
      relations: ['repuesto']
    });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al obtener inventario:', error.message);
      return NextResponse.json(
        { error: `Error al obtener inventario: ${error.message}` },
        { status: 500 }
      );
    }
    console.error('Error desconocido al obtener inventario:', error);
    return NextResponse.json(
      { error: 'Error desconocido al obtener inventario' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const {
      repuesto_id,
      cantidad,
      ubicacion_almacen,
      ultima_entrada_fecha,
      ultima_entrada_cantidad,
      ultima_salida_fecha,
      ultima_salida_cantidad,
      stock,
      notas
    } = body;

    if (!repuesto_id || cantidad == null || !ubicacion_almacen || !ultima_entrada_fecha || !ultima_salida_fecha) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const db = await getDataSource();
    const inventarioRepository = db.getRepository(Inventario);
    const repuestoRepository = db.getRepository(Repuesto);

    const repuesto = await repuestoRepository.findOneBy({ id: repuesto_id });
    if (!repuesto) {
      return NextResponse.json({ error: 'Repuesto no encontrado' }, { status: 404 });
    }

    const nuevoInventario = inventarioRepository.create({
      repuesto,
      cantidad,
      ubicacion_almacen,
      ultima_entrada_fecha: new Date(ultima_entrada_fecha),
      ultima_entrada_cantidad,
      ultima_salida_fecha: new Date(ultima_salida_fecha),
      ultima_salida_cantidad,
      stock,
      notas,
      creado_en: new Date(),
      actualizado_en: new Date()
    });

    await inventarioRepository.save(nuevoInventario);
    return NextResponse.json({ message: 'Inventario creado exitosamente' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al crear inventario:', error.message);
      return NextResponse.json(
        { error: `Error al crear inventario: ${error.message}` },
        { status: 500 }
      );
    }
    console.error('Error desconocido al crear inventario:', error);
    return NextResponse.json({ error: 'Error desconocido al crear inventario' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'tecnico'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const { id, cantidad, stock, ultima_entrada_cantidad, ultima_entrada_fecha, ultima_salida_cantidad, ultima_salida_fecha, notas } = body;

    if (!id) {
      return NextResponse.json({ error: 'Falta el ID del inventario' }, { status: 400 });
    }

    const db = await getDataSource();
    const inventarioRepository = db.getRepository(Inventario);
    const inventario = await inventarioRepository.findOne({ where: { id }, relations: ['repuesto'] });

    if (!inventario) {
      return NextResponse.json({ error: 'Inventario no encontrado' }, { status: 404 });
    }

    // Actualizamos campos si están presentes en el body
    if (cantidad !== undefined) inventario.cantidad = cantidad;
    if (stock !== undefined) inventario.stock = stock;
    if (ultima_entrada_cantidad !== undefined) inventario.ultima_entrada_cantidad = ultima_entrada_cantidad;
    if (ultima_entrada_fecha) inventario.ultima_entrada_fecha = new Date(ultima_entrada_fecha);
    if (ultima_salida_cantidad !== undefined) inventario.ultima_salida_cantidad = ultima_salida_cantidad;
    if (ultima_salida_fecha) inventario.ultima_salida_fecha = new Date(ultima_salida_fecha);
    if (notas !== undefined) inventario.notas = notas;

    inventario.actualizado_en = new Date();

    await inventarioRepository.save(inventario);
    return NextResponse.json({ message: 'Inventario actualizado correctamente' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al actualizar inventario:', error.message);
      return NextResponse.json(
        { error: `Error al actualizar inventario: ${error.message}` },
        { status: 500 }
      );
    }
    console.error('Error desconocido al actualizar inventario:', error);
    return NextResponse.json({ error: 'Error desconocido al actualizar inventario' }, { status: 500 });
  }
}
