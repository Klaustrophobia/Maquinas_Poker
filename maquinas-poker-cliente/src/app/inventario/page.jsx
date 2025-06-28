'use client';

import { useState, useEffect } from "react";

export default function Inventario() {
  const [maquinas, setMaquinas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    // Vista del inventario mostrando tarjetas

    const datosEjemplo = [
      { id: 1, nombre: "Máquina 1", estado: "Operativa" },
      { id: 2, nombre: "Máquina 2", estado: "En reparación" },
      { id: 3, nombre: "Máquina 3", estado: "Fuera de servicio" },
    ];

    setTimeout(() => {
      setMaquinas(datosEjemplo);
      setLoading(false);
    }, 500); // Simula carga
  }, []);

  // Función  para agregar máquina 
  const agregarMaquina = () => {
    if (!nombre || !estado) return alert("Completa todos los campos");

    const nuevaMaquina = {
      id: Date.now(),
      nombre,
      estado,
    };

    setMaquinas((prev) => [nuevaMaquina, ...prev]);
    setNombre("");
    setEstado("");
  };

  if (loading) return <p className="p-8 text-white">Cargando...</p>;

  return (
    <div className="min-h-screen bg-black text-white p-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold mb-8">Inventario de Máquinas de Póker</h1>

      <div className="mb-8 space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Nombre de la máquina"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={e => setEstado(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <button
          onClick={agregarMaquina}
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition text-white"
        >
          Registrar Nueva Máquina
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {maquinas.map((maquina) => (
          <div key={maquina.id} className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{maquina.nombre}</h2>
            <p><strong>Estado:</strong> {maquina.estado}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
