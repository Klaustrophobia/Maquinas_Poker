import { getDataSource } from "@/lib/data-source";
import { Mantenimiento } from "@/entity/Mantenimiento";

export async function findAllMantenimientosRepository() {
    const db = await getDataSource();
    const mantenimientoRepository = db.getRepository(Mantenimiento);
    return mantenimientoRepository.find({ relations: ['orden_trabajo',
        'tecnico_id'
    ] });
}

export async function createMantenimientoRepository(data: Partial<Mantenimiento>) {
    const db = await getDataSource();
    const mantenimientoRepository = db.getRepository(Mantenimiento);
    const newMantenimiento = mantenimientoRepository.create(data);
    return mantenimientoRepository.save(newMantenimiento);
}

export async function updateMantenimientoRepository(id: number, data: Partial<Mantenimiento>) {
    const db = await getDataSource();
    const mantenimientoRepository = db.getRepository(Mantenimiento);
    const mantenimiento = await mantenimientoRepository.findOne({ where: { id } });

    if (!mantenimiento) return { error: 'Mantenimiento no encontrado' };
    await mantenimientoRepository.update(id, data);
    return mantenimientoRepository.findOne({ where: { id } });
}

export async function deleteMantenimientoRepository(id: number) {
    const db = await getDataSource();
    const mantenimientoRepository = db.getRepository(Mantenimiento);
    const mantenimiento = await mantenimientoRepository.findOne({ where: { id } });
    if (!mantenimiento) return { error: 'Mantenimiento no encontrado' };

    return mantenimientoRepository.remove(mantenimiento);
}