import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'admin') {
    redirect('/auth/login?error=Acceso no autorizado&callbackUrl=/admin/DashboardAdmin');
  }

  redirect('/admin/DashboardAdmin');
}