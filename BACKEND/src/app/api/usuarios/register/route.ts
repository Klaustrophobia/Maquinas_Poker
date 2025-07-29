// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { registerController } from '@/controllers/auth.controller';
import { authenticateRole } from '@/middleware/auth';

export async function POST(req: NextRequest) {
  // Autenticación de rol para permitir solo a 'admin' registrar usuarios
  const auth = await authenticateRole(['admin'])(req);
  if (auth) {
    return auth;
  }

  const body = await req.json();
  const result = await registerController(body);

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ message: 'Usuario registrado exitosamente', 
    user: result.newUser,
    token: result.token }, { status: 201 });
}