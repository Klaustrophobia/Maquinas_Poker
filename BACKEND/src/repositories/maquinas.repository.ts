import { getDataSource } from '@/lib/data-source';
import { Maquina } from '@/entity/Maquina';

export const MaquinaRepository = {
  async findAll() {
    const db = await getDataSource();
    return db.getRepository(Maquina).find({ relations: ['proveedor', 'ubicacion'] });
  },

  async findById(id: number) {
    const db = await getDataSource();
    return db.getRepository(Maquina).findOne({ where: { id }, relations: ['proveedor', 'ubicacion'] });
  },

  async create(maquina: Maquina) {
    const db = await getDataSource();
    return db.getRepository(Maquina).save(maquina);
  },

  async update(maquina: Maquina) {
    const db = await getDataSource();
    return db.getRepository(Maquina).save(maquina);
  },

  async remove(maquina: Maquina) {
    const db = await getDataSource();
    return db.getRepository(Maquina).remove(maquina);
  },

  async findProveedorById(id: number) {
    const db = await getDataSource();
    return db.getRepository('Proveedor').findOneBy({ id });
  },

  async findUbicacionById(id: number) {
    const db = await getDataSource();
    return db.getRepository('Ubicacion').findOneBy({ id });
  },

  async findUsuarioById(id: number){
    const db = await getDataSource();
    return db.getRepository('User').findOneBy({ id });
  }
};
