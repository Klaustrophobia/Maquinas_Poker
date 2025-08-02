import { getDataSource } from '@/lib/data-source';
import { Proveedor } from '@/entity/Proveedor';

export const ProveedorRepository = {
  async findAll() {
    const db = await getDataSource();
    return db.getRepository(Proveedor).find();
  },

  async findById(id: number) {
    const db = await getDataSource();
    return db.getRepository(Proveedor).findOne({ where: { id } });
  },
};