import { getDataSource } from "@/lib/data-source";
import { Ubicacion } from "@/entity/Ubicacion";

export async function findUbicacionByIdRepository(id: number) {
    const db = await getDataSource();
    const ubicacionRepository = db.getRepository(Ubicacion);
    return ubicacionRepository.findOne( {where: { id }} );
}