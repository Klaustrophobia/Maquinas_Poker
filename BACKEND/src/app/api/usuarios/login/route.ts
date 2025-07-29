import { NextRequest, NextResponse } from 'next/server';
import { loginController } from '@/controllers/auth.controller';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const result = await loginController(body);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json({ 
      user: result.user,
      token: result.token }, { status: 200 });
}