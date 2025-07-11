'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Inventario() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();



  const [numeroSerie, setNumeroSerie] = useState('');
  const [modelo, setModelo] = useState('');
  const [fechaAdquisicion, setFechaAdquisicion] = useState('');
  const [fechaInstalacion, setFechaInstalacion] = useState('');
  const [estado, setEstado] = useState('');
  const [ubicacionId, setUbicacionId] = useState('');
  const [proveedorId, setProveedorId] = useState('');
  const [ultimoMantenimiento, setUltimoMantenimiento] = useState('');
  const [proximoMantenimiento, setProximoMantenimiento] = useState('');
  const [notas, setNotas] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white p-6 sm:p-10">


      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-12">
        Gestión de Inventario
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        <button
          className="flex flex-col items-center justify-center p-8 bg-zinc-950 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 border border-zinc-700 hover:border-blue-500 transition-all duration-300 group"
          onClick={() => router.push('/inventario/verInventario')}
        >
          <img src="/inventario.jpg" alt="Inventario" className="w-40 h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" />
          <span className="text-xl font-semibold group-hover:text-blue-300">Ver Inventario</span>
        </button>

        <button
          className="flex flex-col items-center justify-center p-8 bg-zinc-950 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 border border-zinc-700 hover:border-green-500 transition-all duration-300 group"
          onClick={() => setShowModal(true)}
        >
          <img src="/maquinascrear.jpg" alt="Crear Registro" className="w-40 h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" />
          <span className="text-xl font-semibold group-hover:text-green-300">Registrar Inventario</span>
        </button>

        <button
          className="flex flex-col items-center justify-center p-8 bg-zinc-950 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 border border-zinc-700 hover:border-purple-500 transition-all duration-300 group"
          onClick={() => router.push('/inventario/dashAdmin')}
        >
          <img src="/dashboard.jpg" alt="Dashboard" className="w-40 h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" />
          <span className="text-xl font-semibold group-hover:text-purple-300">Ver Dashboard</span>
        </button>

        <button
          className="flex flex-col items-center justify-center p-8 bg-zinc-950 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 border border-zinc-700 hover:border-yellow-500 transition-all duration-300 group"
          onClick={() => router.push('/inventario/verRepuestos')}
        >
          <img src="/repuesto.jpg" alt="Repuestos" className="w-40 h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" />
          <span className="text-xl font-semibold group-hover:text-yellow-300">Ver Repuestos</span>
        </button>
      </div>

      {/* Modal visual sin funcionalidad */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in"
        >

          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto text-gray-100 border border-gray-700 animate-scale-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-blue-400 text-center flex-grow">
                    Registrar Máquina
                </h2>
                <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-100 transition-colors p-2 rounded-full hover:bg-gray-700 focus:outline-none"
                    aria-label="Cerrar modal"
                >
                    {/* <FaTimes className="text-xl" /> */} {/* Opcional: usar un icono de cerrar */}
                    <span className="text-2xl font-bold">&times;</span>
                </button>
            </div>

            <form className="flex flex-col gap-4">

              {/* Número de Serie */}
              <div>
                <label htmlFor="numeroSerie" className="block text-gray-300 text-sm font-medium mb-1">Número de Serie</label>
                <input
                  type="text"
                  id="numeroSerie"
                  value={numeroSerie}
                  onChange={e => setNumeroSerie(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Modelo */}
              <div>
                <label htmlFor="modelo" className="block text-gray-300 text-sm font-medium mb-1">Modelo</label>
                <input
                  type="text"
                  id="modelo"
                  value={modelo}
                  onChange={e => setModelo(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Fecha de Adquisición */}
              <div>
                <label htmlFor="fechaAdquisicion" className="block text-gray-300 text-sm font-medium mb-1">Fecha de Adquisición</label>
                <input
                  type="date"
                  id="fechaAdquisicion"
                  value={fechaAdquisicion}
                  onChange={e => setFechaAdquisicion(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Fecha de Instalación */}
              <div>
                <label htmlFor="fechaInstalacion" className="block text-gray-300 text-sm font-medium mb-1">Fecha de Instalación</label>
                <input
                  type="date"
                  id="fechaInstalacion"
                  value={fechaInstalacion}
                  onChange={e => setFechaInstalacion(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Estado */}
              <div>
                <label htmlFor="estado" className="block text-gray-300 text-sm font-medium mb-1">Estado</label>
                <select
                  id="estado"
                  value={estado}
                  onChange={e => setEstado(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona un estado</option>
                  <option value="Operativa">Operativa</option>
                  <option value="En Mantenimiento">En Mantenimiento</option>
                  <option value="Fuera de Servicio">Fuera de Servicio</option>
                  <option value="En Almacén">En Almacén</option>
                </select>
              </div>

              {/* Ubicación ID */}
              <div>
                <label htmlFor="ubicacionId" className="block text-gray-300 text-sm font-medium mb-1">ID Ubicación</label>
                <input
                  type="number"
                  id="ubicacionId"
                  value={ubicacionId}
                  onChange={e => setUbicacionId(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Proveedor ID */}
              <div>
                <label htmlFor="proveedorId" className="block text-gray-300 text-sm font-medium mb-1">ID Proveedor</label>
                <input
                  type="number"
                  id="proveedorId"
                  value={proveedorId}
                  onChange={e => setProveedorId(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Último Mantenimiento */}
              <div>
                <label htmlFor="ultimoMantenimiento" className="block text-gray-300 text-sm font-medium mb-1">Último Mantenimiento</label>
                <input
                  type="date"
                  id="ultimoMantenimiento"
                  value={ultimoMantenimiento}
                  onChange={e => setUltimoMantenimiento(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Próximo Mantenimiento */}
              <div>
                <label htmlFor="proximoMantenimiento" className="block text-gray-300 text-sm font-medium mb-1">Próximo Mantenimiento</label>
                <input
                  type="date"
                  id="proximoMantenimiento"
                  value={proximoMantenimiento}
                  onChange={e => setProximoMantenimiento(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Notas */}
              <div>
                <label htmlFor="notas" className="block text-gray-300 text-sm font-medium mb-1">Notas</label>
                <textarea
                  id="notas"
                  value={notas}
                  onChange={e => setNotas(e.target.value)}
                  rows={3}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
