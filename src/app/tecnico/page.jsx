import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export default async function TecnicoPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'tecnico') {
    redirect('/auth/login?error=Acceso no autorizado&callbackUrl=/tecnico/DashboardTecnico');
  }

  redirect('/tecnico/DashboardTecnico');
}