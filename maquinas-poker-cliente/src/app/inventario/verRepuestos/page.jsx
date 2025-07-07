'use client';

import { useEffect, useState } from 'react';

const tableHeaderStyle = {
  backgroundColor: '#1c3faa',
  color: 'white',
  padding: '10px',
  fontWeight: 'bold',
};


const cellStyle = {
  padding: '10px',
  borderBottom: '1px solid #e5e7eb',
  textAlign: 'left',
  fontSize: '14px',
  color: '#000000' // ← letras negras
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: 'white',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
};

export default function VerRepuestos() {
  const [repuestos, setRepuestos] = useState([]);

  useEffect(() => {
    // Aquí deberías reemplazarlo por una llamada real a la API
    const fakeData = [
      {
        id: 1,
        nombre: 'Motor A123',
        codigo: 'A123',
        descripcion: 'Motor para modelo X',
        proveedor: {
          nombre: 'Proveedora Industrial S.A.',
        },
        precio_unitario: 250.75,
        stock_actual: 10,
        stock_minimo: 5,
        ubicacion_almacen: 'Estante B',
        compatible_con: 'Modelo X, Modelo Y',
        fecha_ultimo_reabastecimiento: '2025-07-01'
      },
      {
        id: 2,
        nombre: 'Filtro XYZ',
        codigo: 'F987',
        descripcion: 'Filtro para maquinaria pesada',
        proveedor: {
          nombre: 'Suministros del Norte',
        },
        precio_unitario: 95.00,
        stock_actual: 20,
        stock_minimo: 10,
        ubicacion_almacen: 'Estante D',
        compatible_con: 'Modelo Z',
        fecha_ultimo_reabastecimiento: '2025-06-15'
      }
    ];

    setRepuestos(fakeData);
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#1c3faa' }}>Lista de Repuestos</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Nombre</th>
            <th style={tableHeaderStyle}>Código</th>
            <th style={tableHeaderStyle}>Descripción</th>
            <th style={tableHeaderStyle}>Proveedor</th>
            <th style={tableHeaderStyle}>Precio Unitario</th>
            <th style={tableHeaderStyle}>Stock Actual</th>
            <th style={tableHeaderStyle}>Stock Mínimo</th>
            <th style={tableHeaderStyle}>Ubicación</th>
            <th style={tableHeaderStyle}>Compatible con</th>
            <th style={tableHeaderStyle}>Último Reabastecimiento</th>
          </tr>
        </thead>
        <tbody>
          {repuestos.map((r) => (
            <tr key={r.id}>
              <td style={cellStyle}>{r.id}</td>
              <td style={cellStyle}>{r.nombre}</td>
              <td style={cellStyle}>{r.codigo}</td>
              <td style={cellStyle}>{r.descripcion}</td>
              <td style={cellStyle}>{r.proveedor?.nombre ?? 'Sin proveedor'}</td>
              <td style={cellStyle}>${r.precio_unitario.toFixed(2)}</td>
              <td style={cellStyle}>{r.stock_actual}</td>
              <td style={cellStyle}>{r.stock_minimo}</td>
              <td style={cellStyle}>{r.ubicacion_almacen}</td>
              <td style={cellStyle}>{r.compatible_con}</td>
              <td style={cellStyle}>{r.fecha_ultimo_reabastecimiento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
