'use client';

import { useEffect, useState } from 'react';

export default function DashboardCliente() {
  const [ordenes, setOrdenes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setError(null);

      // Datos de ejemplo para el cliente (filtrados por un cliente_id)
      const datosEjemplo = [
        {
          codigo: 'OT-101',
          nombre_maquina_id: 1,
          maquina: 'Máquina Serie X #007',
          tipo: 'Mantenimiento',
          prioridad: 'Alta',
          estado: 'en_proceso',
          descripcion: 'Reemplazo del motor del ventilador.',
          tecnico_id: 5,
          fecha_creacion: '2025-07-09T10:30:00Z',
          fecha_inicio: '2025-07-09T09:00:00Z',
          fecha_finalizacion: null,
          tiempo_real: null,
          cliente_notificado: false,
          firma_cliente: null,
          calificacion_servicio: null,
          comentarios_cliente: null
        },
        {
          codigo: 'OT-103',
          nombre_maquina_id: 3,
          maquina: 'Máquina Serie Z #022',
          tipo: 'Soporte',
          prioridad: 'Urgente',
          estado: 'finalizada',
          descripcion: 'Sistema de fichas atascado.',
          tecnico_id: 7,
          fecha_creacion: '2025-07-10T09:00:00Z',
          fecha_inicio: '2025-07-10T10:00:00Z',
          fecha_finalizacion: '2025-07-10T12:30:00Z',
          tiempo_real: 150,
          cliente_notificado: true,
          firma_cliente: 'Juan Pérez',
          calificacion_servicio: 5,
          comentarios_cliente: 'Servicio rápido y efectivo.'
        },
        {
          codigo: 'OT-105',
          nombre_maquina_id: 4,
          maquina: 'Máquina Serie W #050',
          tipo: 'Instalación',
          prioridad: 'Baja',
          estado: 'pendiente',
          descripcion: 'Instalación de nuevo sistema de enfriamiento.',
          tecnico_id: null,
          fecha_creacion: '2025-07-11T11:00:00Z',
          fecha_inicio: null,
          fecha_finalizacion: null,
          tiempo_real: null,
          cliente_notificado: false,
          firma_cliente: null,
          calificacion_servicio: null,
          comentarios_cliente: null
        }
      ];

      setOrdenes(datosEjemplo);
    } catch (err) {
      console.error("Error al cargar órdenes:", err);
      setError("Error al cargar las órdenes. Inténtalo de nuevo más tarde.");
    }
  }, []);

  const getPriorityColor = (prioridad) => {
    switch (prioridad?.toLowerCase()) {
      case 'urgente': return 'text-red-400';
      case 'alta': return 'text-yellow-400';
      case 'media': return 'text-blue-400';
      case 'baja': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-zinc-900 text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-gray-100 p-6 sm:p-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-400 text-center mb-12 tracking-wide">
        Mis Órdenes de Trabajo
      </h1>

      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-gray-400 mb-6">Todas mis Órdenes</h2>
        {ordenes.length === 0 ? (
          <div className="bg-gray-800 text-gray-400 border-2 border-green-600 rounded-xl p-8 text-center">
            No tienes órdenes de trabajo activas.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {ordenes.map((orden) => (
              <div
                key={orden.codigo}
                className="bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-sm flex flex-col gap-3 border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-blue-300">{orden.maquina}</h3>
                
                <p><span className="font-semibold text-gray-400">Estado:</span> <span className="capitalize text-green-400">{orden.estado.replace('_', ' ')}</span></p>
                <p><span className="font-semibold text-gray-400">Código:</span> {orden.codigo}</p>
                <p><span className="font-semibold text-gray-400">Tipo:</span> {orden.tipo}</p>
                <p><span className="font-semibold text-gray-400">Prioridad:</span>{' '}
                  <span className={getPriorityColor(orden.prioridad)}>{orden.prioridad}</span>
                </p>
                <p className="text-gray-300"><span className="font-semibold text-gray-400">Descripción:</span> {orden.descripcion}</p>

                {orden.tiempo_real && (
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-gray-400">Tiempo real:</span> {orden.tiempo_real} min
                  </p>
                )}

                {orden.comentarios_cliente && (
                  <p className="text-sm italic text-gray-400">"{orden.comentarios_cliente}"</p>
                )}
                
                {orden.calificacion_servicio && (
                  <p className="text-sm text-yellow-300">
                    Calificación: {orden.calificacion_servicio}/5
                  </p>
                )}

                <div className="text-sm text-gray-400 mt-auto pt-3 border-t border-gray-700">
                  <p><span className="font-semibold">Fecha creación:</span> {new Date(orden.fecha_creacion).toLocaleDateString()}</p>
                  {orden.fecha_inicio && <p><span className="font-semibold">Inicio:</span> {new Date(orden.fecha_inicio).toLocaleTimeString()}</p>}
                  {orden.fecha_finalizacion && <p><span className="font-semibold">Finalización:</span> {new Date(orden.fecha_finalizacion).toLocaleTimeString()}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
