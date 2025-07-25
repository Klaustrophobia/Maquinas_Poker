// app/cliente/page.jsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export default async function ClientePage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'cliente') {
    redirect('/auth/login?error=Acceso no autorizado');
  }

  redirect('/cliente/DashboardCliente');
}