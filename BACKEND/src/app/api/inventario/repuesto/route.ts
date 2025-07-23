import { authenticateRole } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/data-source';
import { Repuesto } from '@/entity/Repuesto';
import { Proveedor } from '@/entity/Proveedor';

export async function GET(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'tecnico'])(req);
  if (auth) return auth;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    const db = await getDataSource();
    const repuestoRepo = db.getRepository(Repuesto);

    if (id) {
      const repuesto = await repuestoRepo.findOne({
        where: { id: Number(id) },
        relations: ['proveedor']
      });
      if (!repuesto) return NextResponse.json({ error: 'Repuesto no encontrado' }, { status: 404 });
      return NextResponse.json(repuesto);
    }

    const repuestos = await repuestoRepo.find({ relations: ['proveedor'] });
    return NextResponse.json(repuestos);
  } catch (error) {
    return NextResponse.json(
      { error: `Error al obtener repuestos: ${(error as Error).message}` },
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
    if (!proveedor) return NextResponse.json({ error: 'Proveedor no encontrado' }, { status: 404 });

    const nuevoRepuesto = db.getRepository(Repuesto).create({
      ...body,
      proveedor,
      fecha_ultimo_reabastecimiento: body.fecha_ultimo_reabastecimiento
        ? new Date(body.fecha_ultimo_reabastecimiento)
        : null
    });

    await db.getRepository(Repuesto).save(nuevoRepuesto);
    return NextResponse.json({ message: 'Repuesto creado correctamente' });
  } catch (error) {
    return NextResponse.json(
      { error: `Error al crear repuesto: ${(error as Error).message}` },
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
    const repuestoRepo = db.getRepository(Repuesto);

    const repuesto = await repuestoRepo.findOneBy({ id: body.id });
    if (!repuesto) return NextResponse.json({ error: 'Repuesto no encontrado' }, { status: 404 });

    Object.assign(repuesto, body);

    await repuestoRepo.save(repuesto);
    return NextResponse.json({ message: 'Repuesto actualizado correctamente' });
  } catch (error) {
    return NextResponse.json(
      { error: `Error al actualizar repuesto: ${(error as Error).message}` },
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
    const repuestoRepo = db.getRepository(Repuesto);

    const repuesto = await repuestoRepo.findOneBy({ id: Number(id) });
    if (!repuesto) return NextResponse.json({ error: 'Repuesto no encontrado' }, { status: 404 });

    await repuestoRepo.remove(repuesto);
    return NextResponse.json({ message: 'Repuesto eliminado correctamente' });
  } catch (error) {
    return NextResponse.json(
      { error: `Error al eliminar repuesto: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
