import { MaquinaService } from '@/services/maquinas.service';
import { NextRequest, NextResponse } from 'next/server';

export const MaquinaController = {
  async get(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const data = await MaquinaService.getMaquinas(id ? Number(id) : undefined);
    if (!data) return NextResponse.json({ error: 'Máquina no encontrada' }, { status: 404 });

    return NextResponse.json(data);
  },

  async post(req: NextRequest) {
    const body = await req.json();
    try {
      const data = await MaquinaService.createMaquina(body);
      return data;
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 404 });
    }
  },

  async put(req: NextRequest) {
    const body = await req.json();
    try {
      await MaquinaService.updateMaquina(body);
      return NextResponse.json({ message: 'Máquina actualizada correctamente' });
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 404 });
    }
  },

  async del(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    try {
      await MaquinaService.deleteMaquina(Number(id));
      return NextResponse.json({ message: 'Máquina eliminada correctamente' });
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 404 });
    }
  }
};
