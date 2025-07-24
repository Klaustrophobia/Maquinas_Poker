import { authenticateRole } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/data-source';
import { Maquina } from '@/entity/Maquina';
import { Proveedor } from '@/entity/Proveedor';
import { Ubicacion } from '@/entity/Ubicacion';

export async function GET(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'tecnico'])(req);
  if (auth) return auth;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    const db = await getDataSource();
    const maquinaRepo = db.getRepository(Maquina);

    if (id) {
      const maquina = await maquinaRepo.findOne({
        where: { id: Number(id) },
        relations: ['proveedor', 'ubicacion']
      });
      if (!maquina) return NextResponse.json({ error: 'Máquina no encontrada' }, { status: 404 });
      return NextResponse.json(maquina);
    }

    const maquinas = await maquinaRepo.find({ relations: ['proveedor', 'ubicacion'] });
    return NextResponse.json(maquinas);
  } catch (error) {
    return NextResponse.json(
      { error: `Error al obtener máquinas: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const db = await getDataSource();

    const proveedor = await db.getRepository(Proveedor).findOneBy({ id: body.proveedor_id });
    const ubicacion = await db.getRepository(Ubicacion).findOneBy({ id: body.ubicacion_id });

    if (!proveedor || !ubicacion) {
      return NextResponse.json({ error: 'Proveedor o ubicación no encontrada' }, { status: 404 });
    }

    const nuevaMaquina = db.getRepository(Maquina).create({
      ...body,
      proveedor,
      ubicacion,
      fecha_adquisicion: new Date(body.fecha_adquisicion),
      fecha_instalacion: body.fecha_instalacion ? new Date(body.fecha_instalacion) : null,
      ultimo_mantenimiento: body.ultimo_mantenimiento ? new Date(body.ultimo_mantenimiento) : null,
      proximo_mantenimiento: body.proximo_mantenimiento ? new Date(body.proximo_mantenimiento) : null,
      creado_en: new Date(),
      actualizado_en: new Date()
    });

    await db.getRepository(Maquina).save(nuevaMaquina);
    return NextResponse.json({ message: 'Máquina creada correctamente' });
  } catch (error) {
    return NextResponse.json(
      { error: `Error al crear máquina: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'tecnico'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const db = await getDataSource();
    const maquinaRepo = db.getRepository(Maquina);

    const maquina = await maquinaRepo.findOneBy({ id: body.id });
    if (!maquina) return NextResponse.json({ error: 'Máquina no encontrada' }, { status: 404 });

    Object.assign(maquina, {
      ...body,
      actualizado_en: new Date()
    });

    await maquinaRepo.save(maquina);
    return NextResponse.json({ message: 'Máquina actualizada correctamente' });
  } catch (error) {
    return NextResponse.json(
      { error: `Error al actualizar máquina: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  try {
    const db = await getDataSource();
    const maquinaRepo = db.getRepository(Maquina);

    const maquina = await maquinaRepo.findOneBy({ id: Number(id) });
    if (!maquina) return NextResponse.json({ error: 'Máquina no encontrada' }, { status: 404 });

    await maquinaRepo.remove(maquina);
    return NextResponse.json({ message: 'Máquina eliminada correctamente' });
  } catch (error) {
    return NextResponse.json(
      { error: `Error al eliminar máquina: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

