import { getItemUbicacionService } from '@/services/ubicaciones.service';

export async function getItemUbicacionController(id: number ) {

    if (!id) {
        return { error: 'Falta el ID de la ubicación' };
    }

    const ubicacion = await getItemUbicacionService(id);
    if (!ubicacion) {
        return { error: 'Ubicación no encontrada' };
    }
    return ubicacion;
}