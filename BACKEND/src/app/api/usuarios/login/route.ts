import { NextRequest, NextResponse } from 'next/server';
import { loginController } from '@/controllers/auth.controller';
import { User } from '@/entity/User';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const result = await loginController(body);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json({
    user: (result as { user: User }).user,
    token: (result as { token: string }).token
  }, { status: 200 });
}