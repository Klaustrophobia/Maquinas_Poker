import { findAllMantenimientosRepository, createMantenimientoRepository,
    updateMantenimientoRepository, deleteMantenimientoRepository
 } from '@/repositories/mantenimiento.repository';

 export async function getAllMantenimientosService() {
    return await findAllMantenimientosRepository();
 }

 export async function createMantenimientoService(body: {
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
    return await createMantenimientoRepository(body);
}

export async function updateMantenimientoService(id: number, body: {
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
    return await updateMantenimientoRepository(id, body);
}

export async function deleteMantenimientoService(id: number) {
    return await deleteMantenimientoRepository(id);
}