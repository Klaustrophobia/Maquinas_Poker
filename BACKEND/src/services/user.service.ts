import { getAllUsersRepository } from '@/repositories/user.repository';

export async function getAllUsersService() {
  const users = await getAllUsersRepository();
  return users.map(({ id, nombre, email, rol }) => ({
    id,
    nombre,
    email,
    rol,
  })); // omitimos campos sensibles como password_hash
}