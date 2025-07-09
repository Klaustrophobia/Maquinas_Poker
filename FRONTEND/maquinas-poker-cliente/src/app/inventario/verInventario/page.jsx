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
          repuesto_id: 'SN-1001',
          nombre_repuesto: "Lucky Spin 2000",
          cantidad: 1,
          ubicacion_almacen: 'Sala A1',
          ultima_entrada_fecha: '2023-04-10T00:00:00',
          ultima_entrada_cantidad: 0,
          ultima_salida_fecha: '2023-05-15T00:00:00',
          ultima_salida_cantidad: 0,
          stock_minimo: 1,
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
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-red-500 text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-gray-100 p-6 sm:p-10">
      
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow transition duration-300"
        >
          ← Regresar
        </button>
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-400 text-center mb-10 tracking-wide">
        Detalle de Inventario
      </h1>

      {inventario.length === 0 ? (
        <div className="text-center text-gray-400 text-xl py-20">
          No hay ítems en el inventario para mostrar.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {inventario.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-sm flex flex-col gap-3 border-2 border-gray-700 hover:shadow-2xl hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-2">
                {item.nombre_repuesto}
              </h2>

              <p><span className="font-semibold text-gray-400">ID Artículo:</span> {item.id}</p>
              <p><span className="font-semibold text-gray-400">Cantidad:</span> {item.cantidad}</p>
              <p><span className="font-semibold text-gray-400">Ubicación:</span> {item.ubicacion_almacen}</p>
              <p><span className="font-semibold text-gray-400">Stock Mínimo:</span> {item.stock_minimo}</p>

              <div className="mt-4 border-t border-gray-700 pt-3 text-sm text-gray-400">
                <p><span className="font-semibold">Última Entrada:</span> {new Date(item.ultima_entrada_fecha).toLocaleDateString('es-HN', { year: 'numeric', month: 'short', day: 'numeric' })} ({item.ultima_entrada_cantidad} unid.)</p>
                <p><span className="font-semibold">Última Salida:</span> {new Date(item.ultima_salida_fecha).toLocaleDateString('es-HN', { year: 'numeric', month: 'short', day: 'numeric' })} ({item.ultima_salida_cantidad} unid.)</p>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                <span className="font-semibold text-gray-400">Notas:</span> {item.notas}
              </p>

              <div className="text-xs text-gray-600 mt-auto pt-3 border-t border-gray-700">
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
