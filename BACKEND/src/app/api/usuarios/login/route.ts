import { NextRequest, NextResponse } from 'next/server';
import { loginController } from '@/controllers/auth.controller';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { nombre, password } = body;

    if (!nombre || !password) {
      return NextResponse.json({ error: 'Faltan nombre o contraseña' }, { status: 400 });
    }

    const result = await loginController(nombre, password);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json({ token: result.token }, { status: 200 });
}