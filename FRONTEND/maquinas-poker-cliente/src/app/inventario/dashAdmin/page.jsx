"use client";

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {

  const router = useRouter(); 

  const cardData = [
    { label: "Total Ingresos", value: "L. 0.00", bg: "from-green-500 to-emerald-600" },
    { label: "Total Egresos", value: "L. 0.00", bg: "from-red-500 to-pink-600" },
    { label: "Balance Neto", value: "L. 0.00", bg: "from-blue-500 to-indigo-600" },
    { label: "Costo Mantenimientos", value: "L. 0.00", bg: "from-purple-500 to-fuchsia-600" },
    { label: "Total Máquinas", value: 0, bg: "from-teal-500 to-cyan-600" },
    { label: "Máquinas Activas", value: 0, bg: "from-sky-500 to-blue-700" },
    { label: "Total Usuarios", value: 0, bg: "from-yellow-500 to-amber-600" },
    { label: "Usuarios Activos", value: 0, bg: "from-lime-500 to-green-600" },
  ];

  return (
    <div className="bg-zinc-900 min-h-screen text-white p-6 sm:p-10">

      {/* Botón Regresar */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-all"
        >
          ← Regresar
        </button>
      </div>



      <h1 className="text-4xl font-extrabold mb-8">Dashboard de Administrador</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {cardData.map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r ${card.bg} rounded-xl p-5 shadow-md`}
          >
            <h2 className="text-lg font-semibold text-white">{card.label}</h2>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      <section className="bg-zinc-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-white mb-4">
          Inventario con Stock Bajo (0 Items)
        </h2>
        <p className="text-gray-400">No hay ítems con stock bajo en este momento.</p>
      </section>
    </div>
  );
}
