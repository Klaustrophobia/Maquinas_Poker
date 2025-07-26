'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TecnicoLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/tecnico/DashboardTecnico');
    } else if (status === 'authenticated' && session?.user?.role !== 'tecnico') {
      router.push('/no-autorizado');
    }
  }, [status, session, router]);

  if (status !== 'authenticated' || session?.user?.role !== 'tecnico') {
    return <div className="p-4">Verificando credenciales...</div>;
  }

  return <div className="tecnico-layout">{children}</div>;
}