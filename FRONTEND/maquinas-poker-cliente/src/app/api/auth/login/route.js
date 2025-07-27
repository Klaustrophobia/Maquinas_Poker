import { NextResponse } from 'next/server';
import { generateToken } from '../../../../libs/jwt';

export async function POST(request) {
  const { email, password } = await request.json();

  const res = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

  const { user } = await res.json();
  
  if (!user) {
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 }
    );
  }

  const token = generateToken(user.id, user.rol);
  
  // Creamos la respuesta y seteamos la cookie HTTP-only
  const response = NextResponse.json({
    id: user.id,
    name: user.nombre,
    email: user.correo,
    rol: user.rol,
    telefono: user.telefono,
    activo: user.activo
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