"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function VerRepuestos() {
  const router = useRouter();
  const [repuestos, setRepuestos] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setError(null);
    const fakeData = [
      {
        id: 1,
        nombre: "Motor A123",
        codigo: "A123",
        descripcion: "Motor para modelo X de alta potencia y eficiencia.",
        proveedor_id: 101,
        proveedor_nombre: "Proveedora Industrial S.A.",
        precio_unitario: 250.75,
        stock_actual: 10,
        stock_minimo: 5,
        ubicacion_almacen: "Estante B-12",
        compatible_con: "Modelo X, Modelo Y (Serie 2000)",
        fecha_ultimo_reabastecimiento: "2025-07-01",
      },
      {
        id: 2,
        nombre: "Filtro XYZ",
        codigo: "F987",
        descripcion: "Filtro de aire de alto flujo para maquinaria pesada.",
        proveedor_id: 102,
        proveedor_nombre: "Suministros del Norte",
        precio_unitario: 95.0,
        stock_actual: 3,
        stock_minimo: 10,
        ubicacion_almacen: "Zona Almacenaje Frío, Sec. D",
        compatible_con: "Modelo Z (todas las versiones)",
        fecha_ultimo_reabastecimiento: "2025-06-15",
      },
      {
        id: 3,
        nombre: "Kit de Embrague E-500",
        codigo: "KE-500",
        descripcion: "Kit completo de embrague con componentes reforzados.",
        proveedor_id: 101,
        proveedor_nombre: "Proveedora Industrial S.A.",
        precio_unitario: 320.5,
        stock_actual: 8,
        stock_minimo: 3,
        ubicacion_almacen: "Sección Motor, Estante 3",
        compatible_con: "Vehículos Comerciales (varios modelos)",
        fecha_ultimo_reabastecimiento: "2025-06-25",
      },
      {
        id: 4,
        nombre: "Batería Industrial 12V",
        codigo: "BAT-IND-12",
        descripcion: "Batería de ciclo profundo para equipos industriales.",
        proveedor_id: 103,
        proveedor_nombre: "Energía Total",
        precio_unitario: 180.0,
        stock_actual: 2,
        stock_minimo: 5,
        ubicacion_almacen: "Área de Baterías, Jaula 1",
        compatible_con: "Montacargas, Generadores pequeños",
        fecha_ultimo_reabastecimiento: "2025-07-05",
      },
      {
        id: 5,
        nombre: "Válvula de Presión V-01",
        codigo: "VALV-01",
        descripcion: "Válvula de alivio de presión ajustable.",
        proveedor_id: 104,
        proveedor_nombre: "HidroComponentes",
        precio_unitario: 75.2,
        stock_actual: 15,
        stock_minimo: 7,
        ubicacion_almacen: "Cajón Hidráulico 4",
        compatible_con: "Sistemas hidráulicos generales",
        fecha_ultimo_reabastecimiento: "2025-06-10",
      },
    ];
    setRepuestos(fakeData);
  }, []);

  const filteredRepuestos = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return repuestos.filter((r) => {
      return Object.values(r).some((val) =>
        String(val).toLowerCase().includes(term)
      );
    });
  }, [searchTerm, repuestos]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-700 text-xl">
        Error: {error}
      </div>
    );
  }

  const columnas = [
    { label: "ID", key: "id" },
    { label: "Nombre", key: "nombre" },
    { label: "Código", key: "codigo" },
    { label: "Descripción", key: "descripcion", truncate: true },
    { label: "Proveedor", key: "proveedor_nombre" },
    {
      label: "Precio Unitario",
      key: "precio_unitario",
      format: (val) => `$${val.toFixed(2)}`,
    },
    { label: "Stock Actual", key: "stock_actual" },
    { label: "Stock Mínimo", key: "stock_minimo" },
    { label: "Ubicación", key: "ubicacion_almacen" },
    { label: "Compatible con", key: "compatible_con", truncate: true },
    {
      label: "Últ. Reabastecimiento",
      key: "fecha_ultimo_reabastecimiento",
      format: (val) =>
        new Date(val).toLocaleDateString("es-HN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition"
          >
            ← Regresar
          </button>
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-800 text-center mb-12 tracking-tight drop-shadow-lg">
          Inventario de Repuestos
        </h1>

        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Buscar en todo el inventario..."
            className="w-full max-w-md p-3 pl-4 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredRepuestos.length === 0 ? (
          <div className="text-center text-gray-600 text-xl py-20">
            No se encontraron repuestos que coincidan con la búsqueda.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-blue-600 sticky top-0 z-10">
                  <tr>
                    {columnas.map((col, idx) => (
                      <th
                        key={idx}
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRepuestos.map((r) => (
                    <tr key={r.id} className="hover:bg-blue-50 transition">
                      {columnas.map((col, idx) => {
                        const valor = r[col.key] ?? "N/A";
                        const contenido = col.format ? col.format(valor) : valor;
                        return (
                          <td
                            key={idx}
                            className={`px-6 py-4 text-sm text-gray-700 ${
                              col.truncate ? "max-w-xs truncate" : ""
                            }`}
                            title={col.truncate ? valor : undefined}
                          >
                            {contenido}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
