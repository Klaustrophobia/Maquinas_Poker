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
    if (error instanceof Error) {
      console.error('Error al obtener inventario:', error.message);
      return NextResponse.json({ error: `Error en obtener inventario: ${error.message}` }, { status: 500 });
    }
    console.error('Error desconocido al obtener inventario:', error);
    return NextResponse.json({ error: 'Error desconocido al obtener inventario' }, { status: 500 });
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
    if (error instanceof Error) {
      console.error('Error al agregar maquina:', error.message);
      return NextResponse.json({ error: `Error en agregar maquina: ${error.message}` }, { status: 500 });
    }
    console.error('Error desconocido al agregar maquina:', error);
    return NextResponse.json({ error: 'Error desconocido al agregar maquina' }, { status: 500 });
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
    if (error instanceof Error) {
      console.error('Error al actualizar maquina:', error.message);
      return NextResponse.json({ error: `Error en actualizar maquina: ${error.message}` }, { status: 500 });
    }
    console.error('Error desconocido al actualizar maquina:', error);
    return NextResponse.json({ error: 'Error desconocido al actualizar maquina' }, { status: 500 });
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
    if (error instanceof Error) {
      console.error('Error al eliminar maquina:', error.message);
      return NextResponse.json({ error: `Error en eliminar maquina: ${error.message}` }, { status: 500 });
    }
    console.error('Error desconocido al eliminar maquina:', error);
    return NextResponse.json({ error: 'Error desconocido al eliminar maquina' }, { status: 500 });
  }
}