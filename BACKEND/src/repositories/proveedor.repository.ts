import { getDataSource } from '@/lib/data-source';
import { Proveedor } from '@/entity/Proveedor';

export const ProveedorRepository = {
  async findAll() {
    const db = await getDataSource();
    return db.getRepository(Proveedor).find();
  },

  async findById(id: number) {
    const db = await getDataSource();
    return db.getRepository(Proveedor).findOneBy({ id });
  },

  async create(proveedor: Proveedor) {
    const db = await getDataSource();
    return db.getRepository(Proveedor).save(proveedor);
  },

  async update(proveedor: Proveedor) {
    const db = await getDataSource();
    return db.getRepository(Proveedor).save(proveedor);
  },

  async remove(proveedor: Proveedor) {
    const db = await getDataSource();
    return db.getRepository(Proveedor).remove(proveedor);
  },
};