import { NextRequest } from 'next/server';
import { MaquinaController } from '@/controllers/maquinas.controller';
import { authenticateRole } from '@/middleware/auth';

export async function GET(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'tecnico'])(req);
  if (auth) return auth;
  return MaquinaController.get(req);
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;
  return MaquinaController.post(req);
}

export async function PUT(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'tecnico'])(req);
  if (auth) return auth;
  return MaquinaController.put(req);
}

export async function DELETE(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;
  return MaquinaController.del(req);
}
