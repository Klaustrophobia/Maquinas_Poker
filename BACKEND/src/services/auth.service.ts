import bcrypt from 'bcryptjs';
import { findUserByNombreRepository, createUserRepository, findUserByEmailRepository } from '@/repositories/user.repository';

export async function validateUserService(nombre: string, password: string) {
  const user = await findUserByNombreRepository(nombre);
  if (!user) return null;
    console.log("UsuarioService", nombre, password, user);
  const match = await bcrypt.compare(password, user.password_hash);
  return match ? user : null;
}

export async function validateRegisterUserService(
    nombre: string,
    email: string, 
    password: string, 
    rol: string,
    telefono: string
) {
    const existingUser = await findUserByEmailRepository(email);
    if (existingUser) {
        return { error: 'El correo electrónico ya está en uso' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const fechaActual = new Date();

    const newUser = await createUserRepository({ 
        nombre, 
        email, 
        password_hash: hashedPassword, 
        rol,
        telefono,
        activo: true,
        fecha_creacion: fechaActual,
        fecha_actualizacion: fechaActual
    });

    return { newUser };
}