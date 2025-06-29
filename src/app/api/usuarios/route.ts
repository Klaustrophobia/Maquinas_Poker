// import { connectDB } from '@/lib/db';
import { authenticateRole } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// importamos la conexion de TypeORM y la entidad
import { getDataSource } from '@/data-source';
import { User } from '@/entity/User';

//POST para registrar usuarios
export async function POST(req: NextRequest) {
  // Autenticación de rol para permitir solo a 'admin' registrar usuarios
  const auth = await authenticateRole(['admin'])(req);
  if (auth) {
    // Si authenticateRole devuelve una respuesta (ej. un error de autenticación), la devolvemos.
    return auth;
  }

  try {
    const body = await req.json();
    const { nombre, password_hash, rol } = body;
    if (!nombre || !password_hash || !rol) {
      return NextResponse.json({ error: 'Faltan campos requeridos (nombre, password, rol)' }, { status: 400 });
    }

    // Conexión a la base de datos
    const db = await getDataSource();
    const userRepository = db.getRepository(User);

    // Verificar si el usuario ya existe
    const existingUser = await userRepository.findOne({ where: { nombre: nombre } });
    if (existingUser) {
      return NextResponse.json({ error: 'El nombre de usuario ya existe' }, { status: 409 });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password_hash, 10);

    // Insertar el nuevo usuario en la base de datos
    const newUser = userRepository.create({
      nombre: nombre,
      password_hash: hashedPassword,
      rol,
    });
    await userRepository.save(newUser);

    // Respuesta exitosa
    return NextResponse.json({ message: 'Usuario registrado exitosamente' }, { status: 201 });
  } catch (error) { // Captura el error y lo tipa como 'unknown' para seguridad
    if (error instanceof Error) {
      console.error('Error al registrar usuario (POST):', error.message);
      return NextResponse.json({ error: `Error en registro: ${error.message}` }, { status: 500 });
    }
    console.error('Error desconocido al registrar usuario (POST):', error);
    return NextResponse.json({ error: 'Error desconocido al registrar usuario' }, { status: 500 });
  }
}

//GET para el login de usuarios
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const nombre = searchParams.get('nombre');
    const password_hash = searchParams.get('password_hash');

    // Validar que se proporcionen nombre y password_hash
    if (!nombre || !password_hash) {
      return NextResponse.json({ error: 'Se requiere nombre y contraseña' }, { status: 400 }); // 400 Bad Request
    }

    // Conexión a la base de datos
    const db = await getDataSource();
    const userRepository = db.getRepository(User);

    // Buscar el usuario por nombre de usuario
    const user = await userRepository.findOne({ where: { nombre: nombre } });

    // Si el usuario no se encuentra
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Comparar la contraseña proporcionada con la contraseña hasheada en la BD
    const valid = await bcrypt.compare(password_hash, user.password_hash as string);
    if (!valid) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Generar un token JWT para el usuario autenticado
    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, rol: user.rol },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' } 
    );

    // Respuesta exitosa con el token
    return NextResponse.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error en login (GET):', error.message);
      return NextResponse.json({ error: `Error en login: ${error.message}` }, { status: 500 });
    }
    console.error('Error desconocido en login (GET):', error);
    return NextResponse.json({ error: 'Error desconocido en login' }, { status: 500 });
  }
}