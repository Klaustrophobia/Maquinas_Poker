import { NextRequest, NextResponse } from 'next/server';
import { authenticateRole } from '@/middleware/auth';
import { ProveedorController } from '@/controllers/proveedores.controller';
import { corsHeaders, handlePreflight } from '@/lib/cors';

export async function OPTIONS() {
  return handlePreflight();
}

export async function GET(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'tecnico'])(req);
  if (auth) return auth;
  const result = await ProveedorController.get(req);
  return new NextResponse(JSON.stringify(result), {
    status: 200,
    headers: corsHeaders
  });
}