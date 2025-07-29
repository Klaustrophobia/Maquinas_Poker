import { getDataSource } from "@/lib/data-source";
import { User } from "@/entity/User";

export async function findUserByNombreRepository(nombre: string) {
    const db = await getDataSource();
    const userRepository = db.getRepository(User);
    return userRepository.findOne( {where: { nombre }} );
}

export async function updateUltimoLoginRepository(id: number) {
    const db = await getDataSource();
    const userRepository = db.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
        return null;
    }
    user.ultimo_login = new Date();
    return userRepository.save(user);
}

export async function getAllUsersRepository() {
    const db = await getDataSource();
    const userRepository = db.getRepository(User);
    return userRepository.find();
}

export async function createUserRepository(userData: Partial<User>) {
    const db = await getDataSource();
    const userRepository = db.getRepository(User);
    const newUser = userRepository.create(userData);
    return userRepository.save(newUser)
}

export async function findUserByEmailRepository(email: string) {
    const db = await getDataSource();
    return db.getRepository(User).findOne(
        { where: { email }}
    );
}

export async function updateUserRepository(id: number, userData: Partial<User>) {
    const db = await getDataSource();
    const userRepository = db.getRepository(User);
    await userRepository.update(id, userData);
    return userRepository.findOne({ where: { id } });
}

export async function deleteUserRepository(id: number) {
    const db = await getDataSource();
    const userRepository = db.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
        return null;
    }
    await userRepository.remove(user);
    return user;
}

export async function GET(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'tecnico'])(req);
  if (auth) return auth;

  try {
    // Conexión a la base de datos
    const db = await getDataSource();
    const mantenimientoRepository = db.getRepository(Mantenimiento);

    const result = await mantenimientoRepository.find();
    return NextResponse.json(result);
  } catch (error) {
    // Manejo de errores: imprime en consola para depuración
    if (error instanceof Error) {
      console.error('Error al obtener mantenimientos:', error.message);
      return NextResponse.json({ error: `Error en obtener mantenimientos: ${error.message}` }, { status: 500 });
    }
    // Si el error no es una instancia de Error, es un error desconocido
    console.error('Error desconocido al obtener mantenimientos:', error);
    return NextResponse.json({ error: 'Error desconocido al obtener mantenimientos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'cliente'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const { orden_trabajo_id, tipo, descripcion, acciones_realizadas, repuestos_utilizados, costo_estimado, costo_real, fecha_programada, fecha_realizacion, tecnico_id, resultado, observaciones } = body;
    // const db = await connectDB();
    if (!orden_trabajo_id || !tipo || !descripcion || !acciones_realizadas || !repuestos_utilizados || !costo_estimado || !costo_real || !fecha_programada || !fecha_realizacion || !tecnico_id || !resultado) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }
    // Conexión a la base de datos
    const db = await getDataSource();
    const mantenimientoRepository = db.getRepository(Mantenimiento);
    const nuevoMantenimiento = mantenimientoRepository.create({
      ordenTrabajo: { id: orden_trabajo_id }, // Asignamos la relación con la orden de trabajo
      tipo,
      descripcion,
      acciones_realizadas,
      repuestos_utilizados,
      costo_estimado,
      costo_real,
      fecha_programada,
      fecha_realizacion,
      tecnico: { id: tecnico_id },
      resultado,
      observaciones
    });
    await mantenimientoRepository.save(nuevoMantenimiento);
    // Respuesta exitosa
    return NextResponse.json({ message: 'Falla reportada exitosamente' });
  } 
  catch (error) {
    // Manejo de errores: imprime en consola para depuración
    if (error instanceof Error) {
      console.error('Error al reportar falla:', error.message);
      return NextResponse.json({ error: `Error al reportar falla: ${error.message}` }, { status: 500 });
    }
    // Si el error no es una instancia de Error, es un error desconocido
    console.error('Error desconocido al reportar falla:', error);
    return NextResponse.json({ error: 'Error desconocido al reportar falla' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await authenticateRole(['admin', 'tecnico'])(req);
  if (auth) return auth;

  try {
    const body = await req.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: 'Falta el ID del mantenimiento' }, { status: 400 });
    }
    // Conexión a la base de datos
    const db = await getDataSource();
    const mantenimientoRepository = db.getRepository(Mantenimiento);
    // Verificar si el mantenimiento existe
    const mantenimiento = await mantenimientoRepository.findOne({ where: { id } });
    if (!mantenimiento) {
      return NextResponse.json({ error: 'Mantenimiento no encontrado' }, { status: 404 });
    }
    mantenimiento.resultado = 'Realizado';
    await mantenimientoRepository.save(mantenimiento);
    return NextResponse.json({ message: 'Estado actualizado a realizado' });
  }
  catch (error) {
    // Manejo de errores: imprime en consola para depuración
    if (error instanceof Error) {
      console.error('Error al actualizar resultado:', error.message);
      return NextResponse.json({ error: `Error en actualizar resultado: ${error.message}` }, { status: 500 });
    }
    // Si el error no es una instancia de Error, es un error desconocido
    console.error('Error desconocido al actualizar resultado:', error);
    return NextResponse.json({ error: 'Error desconocido al actualizar resultado' }, { status: 500 });
  }
}