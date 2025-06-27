import { connectDB } from '@/lib/db';
import { authenticateRole } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const { nombre, password_hash, rol } = body;
    const db = await connectDB();

    const hashedPassword = await bcrypt.hash(password_hash, 10);
    await db
      .request()
      .input('nombre', nombre)
      .input('password_hash', hashedPassword)
      .input('rol', rol)
      .query('INSERT INTO Usuarios (nombre, password_hash, rol) VALUES (@nombre, @password, @rol)');

    return NextResponse.json({ message: 'Usuario registrado' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error en registro' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const nombre = searchParams.get('nombre');
    const password_hash = searchParams.get('password_hash');
    const db = await connectDB();

    const result = await db.request().input('nombre', nombre).query('SELECT * FROM Usuarios WHERE nombre=@nombre');
    const user = result.recordset[0];

    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    const valid = await bcrypt.compare(password_hash || '', user.password_hash);
    if (!valid) return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });

    const token = jwt.sign({ id: user.id, nombre: user.nombre, role: user.rol }, process.env.JWT_SECRET as string, {
      expiresIn: '8h',
    });

    return NextResponse.json({ token });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error en login' }, { status: 500 });
  }
}
