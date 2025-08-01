import { getDataSource } from '@/lib/data-source';
import { Repuesto } from '@/entity/Repuesto';

export const RepuestoRepository = {
  async findAll() {
    const db = await getDataSource();
    const result = await db.getRepository(Repuesto).find({ relations: ['proveedor'] });
    console.log('Repuestos found:', result);
    return result;
  },

  async findById(id: number) {
    const db = await getDataSource();
    return db.getRepository(Repuesto).findOne({ where: { id }, relations: ['proveedor'] });
  },

  async create(repuesto: Repuesto) {
    const db = await getDataSource();
    return db.getRepository(Repuesto).save(repuesto);
  },

  async update(repuesto: Repuesto) {
    const db = await getDataSource();
    return db.getRepository(Repuesto).save(repuesto);
  },

  async remove(repuesto: Repuesto) {
    const db = await getDataSource();
    return db.getRepository(Repuesto).remove(repuesto);
  },

  async findProveedorById(id: number) {
    const db = await getDataSource();
    return db.getRepository('Proveedor').findOneBy({ id });
  }
};
