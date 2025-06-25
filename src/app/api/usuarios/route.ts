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
    const { username, password, role } = body;
    const db = await connectDB();

    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .request()
      .input('username', username)
      .input('password', hashedPassword)
      .input('role', role)
      .query('INSERT INTO Usuarios (username, password, rol) VALUES (@username, @password, @role)');

    return NextResponse.json({ message: 'Usuario registrado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error en registro' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    const password = searchParams.get('password');
    const db = await connectDB();

    const result = await db.request().input('username', username).query('SELECT * FROM Usuarios WHERE username=@username');
    const user = result.recordset[0];

    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    const valid = await bcrypt.compare(password || '', user.password);
    if (!valid) return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.rol }, process.env.JWT_SECRET as string, {
      expiresIn: '8h',
    });

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: 'Error en login' }, { status: 500 });
  }
}
