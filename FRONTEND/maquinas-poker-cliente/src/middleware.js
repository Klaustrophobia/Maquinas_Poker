import { NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';
import { ClientRequest } from 'http';

const protectedRoutes = {
  admin: ['/admin'],
  client: ['/client'],
  technician: ['/technician']
};

export async function middleware(request) {
  const token = request.cookies.get('authToken')?.value;
  const { pathname } = request.nextUrl;

  // Verificar si la ruta requiere autenticación
  const requiresAuth = Object.values(protectedRoutes).some(
    routes => routes.some(route => pathname.startsWith(route))
  );

  if (!requiresAuth) {
    return NextResponse.next();
  }

  // Si no hay token, redirigir a login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Verificar token
  const decoded = verifyToken(token);
  if (!decoded) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Verificar permisos de ruta
  const userRole = decoded.role;
  const hasPermission = protectedRoutes[userRole]?.some(
    route => pathname.startsWith(route)
  );

  if (!hasPermission) {
    const dashboardUrl = new URL(`/${userRole}`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}
