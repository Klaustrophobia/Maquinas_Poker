'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Inventario() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // State variables for the form fields in the modal
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
    // Main container: light background, dark text
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6 sm:p-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-12 drop-shadow-sm">
        Gestión de Inventario 

      </h1>

      {/* Grid of action buttons/cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {/* Card: Ver Inventario */}
        <button
          className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 border border-gray-200 hover:border-blue-500 transition-all duration-300 group"
          onClick={() => router.push('/inventario/verInventario')}
        >
          <img src="/inventario.jpg" alt="Inventario" className="w-40 h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300" />
          <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Ver Inventario</span>
        </button>

        {/* Card: Registrar Inventario */}
        <button
          className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 border border-gray-200 hover:border-green-500 transition-all duration-300 group"
          onClick={() => setShowModal(true)}
        >
          <img src="/maquinascrear.jpg" alt="Crear Registro" className="w-40 h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300" />
          <span className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">Registrar Inventario</span>
        </button>

        {/* Card: Ver Dashboard */}
        <button
          className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 border border-gray-200 hover:border-purple-500 transition-all duration-300 group"
          onClick={() => router.push('/inventario/dashAdmin')}
        >
          <img src="/dashboard.jpg" alt="Dashboard" className="w-40 h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300" />
          <span className="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">Ver Dashboard</span>
        </button>

        {/* Card: Ver Repuestos */}
        <button
          className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 border border-gray-200 hover:border-orange-500 transition-all duration-300 group"
          onClick={() => router.push('/inventario/verRepuestos')}
        >
          <img src="/repuesto.jpg" alt="Repuestos" className="w-40 h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300" />
          <span className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">Ver Repuestos</span>
        </button>
      </div>

      {/* Modal for Registering Machine */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto text-gray-900 border border-gray-200 animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-blue-700 text-center flex-grow">
                Registrar Máquina
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                aria-label="Cerrar modal"
              >
                <span className="text-2xl font-bold">&times;</span>
              </button>
            </div>

            <form className="flex flex-col gap-4">
              {/* Número de Serie */}
              <div>
                <label htmlFor="numeroSerie" className="block text-gray-700 text-sm font-semibold mb-1">Número de Serie</label>
                <input
                  type="text"
                  id="numeroSerie"
                  value={numeroSerie}
                  onChange={e => setNumeroSerie(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* Modelo */}
              <div>
                <label htmlFor="modelo" className="block text-gray-700 text-sm font-semibold mb-1">Modelo</label>
                <input
                  type="text"
                  id="modelo"
                  value={modelo}
                  onChange={e => setModelo(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* Fecha de Adquisición */}
              <div>
                <label htmlFor="fechaAdquisicion" className="block text-gray-700 text-sm font-semibold mb-1">Fecha de Adquisición</label>
                <input
                  type="date"
                  id="fechaAdquisicion"
                  value={fechaAdquisicion}
                  onChange={e => setFechaAdquisicion(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* Fecha de Instalación */}
              <div>
                <label htmlFor="fechaInstalacion" className="block text-gray-700 text-sm font-semibold mb-1">Fecha de Instalación</label>
                <input
                  type="date"
                  id="fechaInstalacion"
                  value={fechaInstalacion}
                  onChange={e => setFechaInstalacion(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* Estado */}
              <div>
                <label htmlFor="estado" className="block text-gray-700 text-sm font-semibold mb-1">Estado</label>
                <select
                  id="estado"
                  value={estado}
                  onChange={e => setEstado(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
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
                <label htmlFor="ubicacionId" className="block text-gray-700 text-sm font-semibold mb-1">ID Ubicación</label>
                <input
                  type="number"
                  id="ubicacionId"
                  value={ubicacionId}
                  onChange={e => setUbicacionId(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* Proveedor ID */}
              <div>
                <label htmlFor="proveedorId" className="block text-gray-700 text-sm font-semibold mb-1">ID Proveedor</label>
                <input
                  type="number"
                  id="proveedorId"
                  value={proveedorId}
                  onChange={e => setProveedorId(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* Último Mantenimiento */}
              <div>
                <label htmlFor="ultimoMantenimiento" className="block text-gray-700 text-sm font-semibold mb-1">Último Mantenimiento</label>
                <input
                  type="date"
                  id="ultimoMantenimiento"
                  value={ultimoMantenimiento}
                  onChange={e => setUltimoMantenimiento(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* Próximo Mantenimiento */}
              <div>
                <label htmlFor="proximoMantenimiento" className="block text-gray-700 text-sm font-semibold mb-1">Próximo Mantenimiento</label>
                <input
                  type="date"
                  id="proximoMantenimiento"
                  value={proximoMantenimiento}
                  onChange={e => setProximoMantenimiento(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* Notas */}
              <div>
                <label htmlFor="notas" className="block text-gray-700 text-sm font-semibold mb-1">Notas</label>
                <textarea
                  id="notas"
                  value={notas}
                  onChange={e => setNotas(e.target.value)}
                  rows={3}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200 resize-y"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
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