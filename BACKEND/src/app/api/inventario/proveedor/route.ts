import { NextRequest } from 'next/server';
import { authenticateRole } from '@/middleware/auth';
import { ProveedorController } from '@/controllers/proveedor.controller';

export async function GET(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;
  return ProveedorController.get(req);
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;
  return ProveedorController.post(req);
}

export async function PUT(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;
  return ProveedorController.put(req);
}

export async function DELETE(req: NextRequest) {
  const auth = await authenticateRole(['admin'])(req);
  if (auth) return auth;
  return ProveedorController.del(req);
}