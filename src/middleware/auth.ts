import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export interface AuthPayload {
  id: number;
  username: string;
  role: 'admin' | 'cliente' | 'tecnico';
}

export function authenticateRole(roles: AuthPayload['role'][]): any {
  return async (req: Request): Promise<NextResponse | null> => {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) return NextResponse.json({ message: 'Token faltante' }, { status: 401 });

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
      if (!roles.includes(user.role)) {
        return NextResponse.json({ message: 'Acceso denegado' }, { status: 403 });
      }
      // Si todo bien, dejar que continúe
      return null;
    } catch (error) {
      return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
    }
  };
}