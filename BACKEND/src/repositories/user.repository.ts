import { getDataSource } from "@/lib/data-source";
import { User } from "@/entity/User";

export async function findUserByNombreRepository(nombre: string) {
    const db = await getDataSource();
    const userRepository = db.getRepository(User);
    return userRepository.findOne( {where: { nombre }} );
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