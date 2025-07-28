import { NextRequest, NextResponse } from 'next/server';
import { authenticateRole } from '@/middleware/auth';
import { getAllUsersController } from '@/controllers/user.controller';

export async function GET(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;

  const result = await getAllUsersController();
  console.log('Usuarios obtenidos:', result);
  if ('error' in result) {
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 });
  }
  return NextResponse.json(result, { status: 200 });
}