'use client';

import { useEffect, useState } from 'react';

export default function DashboardTecnico() {
  const [ordenes, setOrdenes] = useState([]);
  const [error, setError] = useState(null);
  const [pausadas, setPausadas] = useState([]);

  useEffect(() => {
    try {
      setError(null);

      const datosEjemplo = [
        {
          codigo: 'OT-101',
          nombre_maquina_id: 1,
          maquina: 'Máquina Serie X #007',
          tipo: 'Mantenimiento',
          prioridad: 'Alta',
          estado: 'pendiente',
          descripcion: 'Reemplazo del motor del ventilador.',
          tecnico_id: 5,
          fecha_creacion: '2025-07-09T10:30:00Z',
          fecha_inicio: null,
          fecha_finalizacion: null,
          tiempo_real: null,
          cliente_notificado: false,
          firma_cliente: null,
          calificacion_servicio: null,
          comentarios_cliente: null
        },
        {
          codigo: 'OT-102',
          nombre_maquina_id: 2,
          maquina: 'Máquina Serie Y #015',
          tipo: 'Reparación',
          prioridad: 'Media',
          estado: 'en_proceso',
          descripcion: 'Inspección de sensores de presión.',
          tecnico_id: 5,
          fecha_creacion: '2025-07-08T15:45:00Z',
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

  const actualizarEstadoOrden = (codigo, nuevoEstado) => {
    const actualizadas = ordenes.map((orden) =>
      orden.codigo === codigo ? { ...orden, estado: nuevoEstado } : orden
    );
    setOrdenes(actualizadas);
    setPausadas(pausadas.filter((p) => p !== codigo));
  };

  const handleComentarioChange = (codigo, nuevoComentario) => {
    const actualizadas = ordenes.map((orden) =>
      orden.codigo === codigo ? { ...orden, comentario_temp: nuevoComentario } : orden
    );
    setOrdenes(actualizadas);
  };

  const guardarComentario = (codigo) => {
    const actualizadas = ordenes.map((orden) =>
      orden.codigo === codigo
        ? { ...orden, comentario: orden.comentario_temp || '', comentario_temp: '' }
        : orden
    );
    setOrdenes(actualizadas);
  };

  const togglePausa = (codigo) => {
    setPausadas(
      pausadas.includes(codigo)
        ? pausadas.filter((p) => p !== codigo)
        : [...pausadas, codigo]
    );
  };

  const renderBotones = (orden) => {
    if (orden.estado === 'pendiente') {
      return (
        <button
          onClick={() => actualizarEstadoOrden(orden.codigo, 'en_proceso')}
          className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Despachar
        </button>
      );
    }

    if (orden.estado === 'en_proceso') {
      return (
        <div className="flex flex-col gap-2 mt-4">
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-1">
              Comentario del técnico:
            </label>
            <textarea
              value={orden.comentario_temp || ''}
              onChange={(e) => handleComentarioChange(orden.codigo, e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 border border-gray-600 text-white"
              rows={3}
              placeholder="Escribe un comentario..."
            />
            <button
              onClick={() => guardarComentario(orden.codigo)}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
            >
              Guardar Comentario
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => actualizarEstadoOrden(orden.codigo, 'finalizada')}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-2 rounded"
            >
              Finalizar
            </button>
            <button
              onClick={() => togglePausa(orden.codigo)}
              className={`${
                pausadas.includes(orden.codigo) ? 'bg-gray-500 hover:bg-gray-600' : 'bg-yellow-500 hover:bg-yellow-600'
              } text-white font-semibold px-3 py-2 rounded`}
            >
              {pausadas.includes(orden.codigo) ? 'Despausar' : 'Pausar'}
            </button>
          </div>

          {pausadas.includes(orden.codigo) && (
            <div className="text-yellow-400 font-medium text-sm mt-1">
              Esta tarea está actualmente en pausa.
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const renderOrdenes = (estado, titulo) => {
    const filtradas = ordenes.filter(o => o.estado === estado);

    return (
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-blue-400 mb-6">{titulo}</h2>
        {filtradas.length === 0 ? (
          <div className="bg-gray-800 text-gray-400 border-2 border-green-600 rounded-xl p-8 text-center">
            No hay órdenes en esta categoría.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtradas.map((orden) => (
              <div
                key={orden.codigo}
                className={`bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-sm flex flex-col gap-3 border-2 ${
                  pausadas.includes(orden.codigo) ? 'border-yellow-400' : 'border-gray-700'
                } hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1`}
              >
                <h3 className="text-xl font-bold text-blue-300">{orden.maquina}</h3>

                <p><span className="font-semibold text-gray-400">Código:</span> {orden.codigo}</p>
                <p><span className="font-semibold text-gray-400">Tipo:</span> {orden.tipo}</p>
                <p><span className="font-semibold text-gray-400">Prioridad:</span>{' '}
                  <span className={getPriorityColor(orden.prioridad)}>{orden.prioridad}</span>
                </p>
                <p className="text-gray-300"><span className="font-semibold text-gray-400">Descripción:</span> {orden.descripcion}</p>

                {orden.comentario && (
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-gray-400">Comentario Técnico:</span> {orden.comentario}
                  </p>
                )}

                {orden.tiempo_real && (
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-gray-400">Tiempo real:</span> {orden.tiempo_real} min
                  </p>
                )}

                {orden.cliente_notificado && (
                  <p className="text-sm text-green-400">Cliente fue notificado</p>
                )}

                {orden.firma_cliente && (
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-gray-400">Firma:</span> {orden.firma_cliente}
                  </p>
                )}

                {orden.calificacion_servicio && (
                  <p className="text-sm text-yellow-300">
                    Calificación: {orden.calificacion_servicio}/5
                  </p>
                )}

                {orden.comentarios_cliente && (
                  <p className="text-sm italic text-gray-400">{orden.comentarios_cliente}</p>
                )}

                <div className="text-sm text-gray-400 mt-auto pt-3 border-t border-gray-700">
                  <p><span className="font-semibold">Fecha creación:</span> {new Date(orden.fecha_creacion).toLocaleDateString()}</p>
                  {orden.fecha_inicio && <p><span className="font-semibold">Inicio:</span> {new Date(orden.fecha_inicio).toLocaleTimeString()}</p>}
                  {orden.fecha_finalizacion && <p><span className="font-semibold">Finalización:</span> {new Date(orden.fecha_finalizacion).toLocaleTimeString()}</p>}
                </div>

                {renderBotones(orden)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
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
        Órdenes de Trabajo del Técnico
      </h1>

      {renderOrdenes('pendiente', 'Órdenes Pendientes')}
      {renderOrdenes('en_proceso', 'Órdenes en Proceso')}
      {renderOrdenes('finalizada', 'Órdenes Finalizadas')}
    </div>
  );
}

