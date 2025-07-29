import { createMantenimientoService, deleteMantenimientoService,
    getAllMantenimientosService, updateMantenimientoService
 } from '@/services/mantenimiento.service';

 export async function getAllMantenimientosController() {
    return await getAllMantenimientosService();
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
    return await createMantenimientoService(body);
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
    return await updateMantenimientoService(id, body);
}

export async function deleteMantenimientoController(id: number) {
    return await deleteMantenimientoService(id);
}