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
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener mantenimientos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'cliente'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const { descripcion, maquina_id } = body;
    const db = await connectDB();
    await db
      .request()
      .input('descripcion', descripcion)
      .input('maquina_id', maquina_id)
      .query("INSERT INTO Mantenimiento (descripcion, maquina_id, estado) VALUES (@descripcion, @maquina_id, 'pendiente')");
    return NextResponse.json({ message: 'Falla reportada' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al reportar falla' }, { status: 500 });
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
      .query("UPDATE Mantenimiento SET estado='resuelto' WHERE id=@id");
    return NextResponse.json({ message: 'Estado actualizado a resuelto' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al actualizar estado' }, { status: 500 });
  }
}