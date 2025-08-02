import { ProveedorRepository } from '@/repositories/proveedor.repository';

export const ProveedorService = {
  async getProveedores(id?: number) {
    return id ? ProveedorRepository.findById(id) : ProveedorRepository.findAll();
  },
};