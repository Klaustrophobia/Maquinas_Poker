import { NextRequest, NextResponse } from 'next/server';
import { ProveedorService } from '@/services/proveedor.service';

export const ProveedorController = {
  async get(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
      const data = await ProveedorService.getProveedores(id ? Number(id) : undefined);
      if (!data && id) return NextResponse.json({ error: 'Proveedor no encontrado' }, { status: 404 });
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  },

  async post(req: NextRequest) {
    try {
      const body = await req.json();
      await ProveedorService.createProveedor(body);
      return NextResponse.json({ message: 'Proveedor creado correctamente' });
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  },

  async put(req: NextRequest) {
    try {
      const body = await req.json();
      await ProveedorService.updateProveedor(body);
      return NextResponse.json({ message: 'Proveedor actualizado correctamente' });
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  },

  async del(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    try {
      await ProveedorService.deleteProveedor(Number(id));
      return NextResponse.json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  },
};