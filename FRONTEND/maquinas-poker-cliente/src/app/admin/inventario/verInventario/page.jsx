'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerInventario() {
  const [inventario, setInventario] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    try {
      setError(null);
      const datosEjemplo = [
        {
          id: 1,
          repuesto_id: 'SN-1001', // This seems like a serial number for a machine, not a 'repuesto_id'. Assuming it represents a unique ID for the item.
          nombre_repuesto: "Lucky Spin 2000", // This seems like a machine name, not a 'repuesto_name'. Renamed for clarity.
          cantidad: 1, // Assuming this is the quantity of the *machine* itself, typically 1 for unique machines.
          ubicacion_almacen: 'Sala A1',
          ultima_entrada_fecha: '2023-04-10T00:00:00', // Changed to represent "última fecha de registro/adquisición"
          ultima_entrada_cantidad: 0, // This field seems redundant for machines (quantity is usually 1). Keeping for now but consider its purpose.
          ultima_salida_fecha: '2023-05-15T00:00:00', // Changed to represent "última fecha de movimiento/reubicación"
          ultima_salida_cantidad: 0, // Redundant for machines. Keeping for now.
          stock_minimo: 1, // Redundant for machines (usually 1). Keeping for now.
          notas: 'Sin observaciones. Máquina instalada correctamente.',
          creado_en: '2023-04-05T10:00:00',
          actualizado_en: '2024-06-01T12:00:00',
        },
        {
          id: 2,
          repuesto_id: 'SN-1002',
          nombre_repuesto: "Poker King Deluxe",
          cantidad: 1,
          ubicacion_almacen: 'Sala B3',
          ultima_entrada_fecha: '2022-11-20T00:00:00',
          ultima_entrada_cantidad: 0,
          ultima_salida_fecha: '2022-12-01T00:00:00',
          ultima_salida_cantidad: 0,
          stock_minimo: 1,
          notas: 'Requiere revisión eléctrica. Programar mantenimiento.',
          creado_en: '2022-11-15T09:30:00',
          actualizado_en: '2024-05-10T14:45:00',
        },
        {
          id: 3,
          repuesto_id: 'SN-1003',
          nombre_repuesto: "Mega Jackpot 5",
          cantidad: 1,
          ubicacion_almacen: 'Sala C2',
          ultima_entrada_fecha: '2024-01-10T00:00:00',
          ultima_entrada_cantidad: 0,
          ultima_salida_fecha: '2024-01-15T00:00:00',
          ultima_salida_cantidad: 0,
          stock_minimo: 1,
          notas: 'Último mantenimiento programado para el 2024-07-20.',
          creado_en: '2023-12-30T11:00:00',
          actualizado_en: '2024-06-25T16:00:00',
        }
      ];

      setInventario(datosEjemplo);
    } catch (err) {
      console.error("Error al cargar inventario:", err);
      setError("Error al cargar el inventario. Inténtalo de nuevo más tarde.");
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 text-red-600 text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 sm:p-10">

      {/* Back button */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Regresar
        </button>
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 text-center mb-10 tracking-wide drop-shadow-sm">
        Detalle de Inventario 📊
      </h1>

      {inventario.length === 0 ? (
        <div className="text-center text-gray-500 text-xl py-20">
          No hay ítems en el inventario para mostrar. 😔
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {inventario.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm flex flex-col gap-3
                         border border-gray-200 hover:shadow-xl hover:border-blue-500
                         transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <h2 className="text-2xl font-bold text-blue-600 mb-2">
                {item.nombre_repuesto}
              </h2>

              <p className="text-gray-700"><span className="font-semibold text-gray-600">ID Artículo:</span> {item.id}</p>
              <p className="text-gray-700"><span className="font-semibold text-gray-600">Cantidad:</span> {item.cantidad}</p>
              <p className="text-gray-700"><span className="font-semibold text-gray-600">Ubicación:</span> {item.ubicacion_almacen}</p>
              <p className="text-gray-700"><span className="font-semibold text-gray-600">Stock Mínimo:</span> {item.stock_minimo}</p>

              <div className="mt-4 border-t border-gray-200 pt-3 text-sm text-gray-600">
                <p><span className="font-semibold">Última Entrada:</span> {new Date(item.ultima_entrada_fecha).toLocaleDateString('es-HN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                <p><span className="font-semibold">Última Salida:</span> {new Date(item.ultima_salida_fecha).toLocaleDateString('es-HN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
              </div>

              <p className="text-sm text-gray-600 mt-2">
                <span className="font-semibold text-gray-600">Notas:</span> {item.notas}
              </p>

              <div className="text-xs text-gray-500 mt-auto pt-3 border-t border-gray-200">
                <p><span className="font-semibold">Creado en:</span> {new Date(item.creado_en).toLocaleDateString('es-HN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                <p><span className="font-semibold">Actualizado en:</span> {new Date(item.actualizado_en).toLocaleDateString('es-HN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}