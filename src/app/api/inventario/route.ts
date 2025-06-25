import { connectDB } from '@/lib/db';
import { authenticateRole } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;

  try {
    const db = await connectDB();
    const result = await db.request().query('SELECT * FROM Inventario');
    return NextResponse.json(result.recordset);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener inventario' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const { nombre, estado } = body;
    const db = await connectDB();
    await db
      .request()
      .input('nombre', nombre)
      .input('estado', estado)
      .query('INSERT INTO Inventario (nombre, estado) VALUES (@nombre, @estado)');
    return NextResponse.json({ message: 'Máquina agregada' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al agregar máquina' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const { id, nombre, estado } = body;
    const db = await connectDB();
    await db
      .request()
      .input('id', id)
      .input('nombre', nombre)
      .input('estado', estado)
      .query('UPDATE Inventario SET nombre=@nombre, estado=@estado WHERE id=@id');
    return NextResponse.json({ message: 'Máquina actualizada' });
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
    await db.request().input('id', id).query('DELETE FROM Inventario WHERE id=@id');
    return NextResponse.json({ message: 'Máquina eliminada' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });
  }
}
