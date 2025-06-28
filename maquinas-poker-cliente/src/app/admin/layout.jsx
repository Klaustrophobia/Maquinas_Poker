'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("Usuario actual:", user);
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null; // O un mensaje de redirección
  }

  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <h1>Panel de Administración</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}