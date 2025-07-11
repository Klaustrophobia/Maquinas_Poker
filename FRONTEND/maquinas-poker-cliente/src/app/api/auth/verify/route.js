import { NextResponse } from 'next/server';
//import { findUserById } from '@/lib/users';
import { findUserById } from '../../../../lib/users';

export async function GET(request) {
  const token = request.cookies.get('authToken')?.value;

  if (!token) {
    return NextResponse.json(
      { error: "No autenticado" },
      { status: 401 }
    );
  }

  const user = findUserById(token.userId);
  
  if (!user) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });
}