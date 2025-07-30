// import { connectDB } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
// importamos la conexion de TypeORM y la entidad
import { getDataSource } from '@/data-source';
import { User } from '@/entity/User';

//POST para el login de usuarios
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body

    // Validar que se proporcionen nombre y password_hash
    if (!email || !password) {
      return NextResponse.json({ error: 'Se requiere nombre y contraseña' }, { status: 400 }); // 400 Bad Request
    }

    // Conexión a la base de datos
    const db = await getDataSource();
    const userRepository = db.getRepository(User);

    // Buscar el usuario por email de usuario
    const user = await userRepository.findOne({ where: { email } });

    // Si el usuario no se encuentra
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    if (user.password_hash !== password) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    user.ultimo_login = new Date();
    await userRepository.save(user);

    // Respuesta exitosa con el token
    return NextResponse.json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.email,
        rol: user.rol,
        telefono: user.telefono,
        activo: user.activo
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error en login (POST):', error.message);
      return NextResponse.json({ error: `Error en login: ${error.message}` }, { status: 500 });
    }
    console.error('Error desconocido en login (POST):', error);
    return NextResponse.json({ error: 'Error desconocido en login' }, { status: 500 });
  }
}
