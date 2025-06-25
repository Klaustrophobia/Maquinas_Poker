import { connectDB } from '@/lib/db';
import { authenticateRole } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'cliente'])(req);
  if (auth) return auth;

  try {
    const db = await connectDB();
    const result = await db.request().query('SELECT * FROM Finanzas');
    return NextResponse.json(result.recordset);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener finanzas' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const { descripcion, monto } = body;
    const db = await connectDB();
    await db
      .request()
      .input('descripcion', descripcion)
      .input('monto', monto)
      .query('INSERT INTO Finanzas (descripcion, monto) VALUES (@descripcion, @monto)');
    return NextResponse.json({ message: 'Registro agregado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al agregar registro' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const { id, descripcion, monto } = body;
    const db = await connectDB();
    await db
      .request()
      .input('id', id)
      .input('descripcion', descripcion)
      .input('monto', monto)
      .query('UPDATE Finanzas SET descripcion=@descripcion, monto=@monto WHERE id=@id');
    return NextResponse.json({ message: 'Registro actualizado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const db = await connectDB();
    await db.request().input('id', id).query('DELETE FROM Finanzas WHERE id=@id');
    return NextResponse.json({ message: 'Registro eliminado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });
  }
}