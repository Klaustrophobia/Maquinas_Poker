import { getAllUsersService } from '@/services/user.service';

export async function getAllUsersController() {
    const users = await getAllUsersService();
    if (!users || users.length === 0) {
        return { error: 'No se encontraron usuarios' };
    }
    return users;
}