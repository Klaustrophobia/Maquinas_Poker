import { createMantenimientoService, deleteMantenimientoService,
    getAllMantenimientosService, updateMantenimientoService
 } from '@/services/mantenimiento.service';

 export async function getAllMantenimientosController() {
    const result = await getAllMantenimientosService();
    return result;
 }

 export async function createMantenimientoController(body: {
    orden_trabajo_id: number;
    tipo: string;
    descripcion: string;
    acciones_realizadas: string;
    repuestos_utilizados: string;
    costo_estimado: number;
    costo_real: number;
    fecha_programada: Date;
    fecha_realizacion: Date;
    tecnico_id: number;
    resultado: string;
    observaciones: string;
}) {
    const result = await createMantenimientoService(body);
    return result;
}

export async function updateMantenimientoController(id: number, body: {
    orden_trabajo_id?: number;
    tipo?: string;
    descripcion?: string;
    acciones_realizadas?: string;
    repuestos_utilizados?: string;
    costo_estimado?: number;
    costo_real?: number;
    fecha_programada?: Date;
    fecha_realizacion?: Date;
    tecnico_id?: number;
    resultado?: string;
    observaciones?: string;
}) {
    const result =await updateMantenimientoService(id, body);
    return result;
}

export async function deleteMantenimientoController(id: number) {
    const result = await deleteMantenimientoService(id);
    return result;
}