import { authenticateRole } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/data-source';
import { Finanza } from '@/entity/Finanza';

export async function GET(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'cliente'])(req);
  if (auth) return auth;

  try {
    const db = await getDataSource();
    const finanzasRepository = db.getRepository(Finanza);
    const result = await finanzasRepository.find({
      relations: ['maquina_id', 'usuario_id', 'transaccion_id', 'proveedor_id', 'orden_trabajo_id']
    });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al obtener finanzas:', error.message);
      return NextResponse.json(
        { error: `Error al obtener finanzas: ${error.message}` },
        { status: 500 }
      );
    }
    console.error('Error desconocido al obtener finanzas:', error);
    return NextResponse.json(
      { error: 'Error desconocido al obtener finanzas' },
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
      tipo_movimiento,
      descripcion,
      monto,
      moneda,
      fecha_movimiento,
      maquina_id,
      usuario_id,
      transaccion_id,
      proveedor_id,
      orden_trabajo_id,
      referencia_externa,
      notas
    } = body;

    if (!tipo_movimiento || monto == null || !moneda || !fecha_movimiento || !maquina_id || !usuario_id || !transaccion_id || !proveedor_id || !orden_trabajo_id) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const db = await getDataSource();
    const finanzasRepository = db.getRepository(Finanza);

    const nuevaFinanza = finanzasRepository.create({
      tipo_movimiento,
      descripcion,
      monto,
      moneda,
      fecha_movimiento: new Date(fecha_movimiento),
      maquina_id: { id: maquina_id },
      usuario_id: { id: usuario_id },
      transaccion_id: { id: transaccion_id },
      proveedor_id: { id: proveedor_id },
      orden_trabajo_id: { id: orden_trabajo_id },
      referencia_externa,
      notas,
      creado_en: new Date(),
      actualizado_en: new Date()
    });

    await finanzasRepository.save(nuevaFinanza);
    return NextResponse.json({ message: 'Movimiento financiero registrado exitosamente' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al registrar movimiento financiero:', error.message);
      return NextResponse.json(
        { error: `Error al registrar movimiento financiero: ${error.message}` },
        { status: 500 }
      );
    }
    console.error('Error desconocido al registrar movimiento financiero:', error);
    return NextResponse.json(
      { error: 'Error desconocido al registrar movimiento financiero' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const { id, monto, notas, descripcion, moneda } = body;

    if (!id) {
      return NextResponse.json({ error: 'Falta el ID del registro financiero' }, { status: 400 });
    }

    const db = await getDataSource();
    const finanzasRepository = db.getRepository(Finanza);
    const finanza = await finanzasRepository.findOne({
      where: { id },
      relations: ['maquina_id', 'usuario_id', 'transaccion_id', 'proveedor_id', 'orden_trabajo_id']
    });

    if (!finanza) {
      return NextResponse.json({ error: 'Registro financiero no encontrado' }, { status: 404 });
    }

    if (monto !== undefined) finanza.monto = monto;
    if (descripcion !== undefined) finanza.descripcion = descripcion;
    if (moneda !== undefined) finanza.moneda = moneda;
    if (notas !== undefined) finanza.notas = notas;

    finanza.actualizado_en = new Date();

    await finanzasRepository.save(finanza);
    return NextResponse.json({ message: 'Registro financiero actualizado correctamente' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al actualizar registro financiero:', error.message);
      return NextResponse.json(
        { error: `Error al actualizar registro financiero: ${error.message}` },
        { status: 500 }
      );
    }
    console.error('Error desconocido al actualizar registro financiero:', error);
    return NextResponse.json(
      { error: 'Error desconocido al actualizar registro financiero' },
      { status: 500 }
    );
  }
}
