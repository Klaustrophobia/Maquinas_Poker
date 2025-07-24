import { NextResponse } from 'next/server';
//import { findUserByCredentials } from '@/lib/users';
import { findUserByCredentials } from '../../../../lib/users';
import { generateToken } from '../../../../lib/jwt';

export async function POST(request) {
  const { email, password } = await request.json();

  const user = findUserByCredentials(email, password);
  console.log(email, password);
  if (!user) {
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 }
    );
  }

  const token = generateToken(user.id, user.role);
  
  // Creamos la respuesta y seteamos la cookie HTTP-only
  const response = NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });

  response.cookies.set({
    name: "authToken",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 2, // 2 horas
    path: "/",
  });

  return response;
}
