import { NextRequest, NextResponse } from 'next/server';
import { loginController } from '@/controllers/auth.controller';
import { User } from '@/entity/User';

//POST para el login de usuarios
export async function POST(req: NextRequest) {
    const body = await req.json();

    const result = await loginController(body);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    user.ultimo_login = new Date();
    await userRepository.save(user);

    return NextResponse.json({
    user: (result as { user: User }).user,
    token: (result as { token: string }).token
  }, { status: 200 });
}