import { useAuth } from '@/app/context/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Bienvenido, {user?.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Gestión de Usuarios</h2>
          {/* Contenido específico para admin */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Reportes</h2>
          {/* Contenido específico para admin */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Configuración</h2>
          {/* Contenido específico para admin */}
        </div>
      </div>
      
      <button 
        onClick={logout}
        className="mt-8 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
