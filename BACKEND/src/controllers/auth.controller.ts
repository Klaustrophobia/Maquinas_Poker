import { validateUserService, validateRegisterUserService } from '@/services/auth.service';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_maquinas_poker';

export async function loginController(nombre: string, password: string) {
  const user = await validateUserService(nombre, password);
  console.log("UsuarioController", nombre, password, user);
  if (!user) {
    return { error: 'Credenciales inválidas' };
  }

  const token = jwt.sign({ id: user.id, rol: user.rol }, JWT_SECRET, {
    expiresIn: '4h',
  });

  return { token };
}

export async function registerController(body: { 
    nombre: string;
    email: string; 
    password: string; 
    rol: string;
    telefono: string;
}) {
    const { nombre,
            email,
            password, 
            rol,
            telefono } = body;

    if (!nombre || !email || !password || !rol || !telefono) {
        return { error: 'Faltan campos requeridos (nombre, email, password, rol, telefono)' };
    }

    const result = await validateRegisterUserService(nombre, 
        email, password, rol, telefono);

    if (result.error) {
        return { error: result.error }
    }
    
    const token = jwt.sign(
        { id: result.newUser?.id,
            rol: result.newUser?.rol,
            email: result.newUser?.email
        },
        JWT_SECRET,
        { expiresIn: '4h' }
    );
    console.log("UsuarioController2", token);
    return { ...result, token };
}