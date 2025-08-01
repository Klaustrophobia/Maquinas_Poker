import { findUbicacionByIdRepository } from '@/repositories/ubicaciones.repository';

export async function getItemUbicacionService(id: number) {
    const ubicacion = await findUbicacionByIdRepository(id);
    if (!ubicacion) {
        return { error: 'No se pudo encontrar la ubicación' };
    }

    return {
        id: ubicacion.id,
        nombre: ubicacion.nombre,
        direccion: ubicacion.direccion,
        ciudad: ubicacion.ciudad,
        codigo_postal: ubicacion.codigo_postal,
        telefono: ubicacion.telefono,
        responsable: ubicacion.responsable,
        latitud: ubicacion.latitud,
        longitud: ubicacion.longitud,
        activa: ubicacion.activa,
        creado_en: ubicacion.creado_en
    };
}