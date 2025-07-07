'use client';

import { useEffect, useState } from 'react';

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  padding: '20px',
  width: '300px',
  margin: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  color: '#111827',
  fontSize: '14px',
};

const labelStyle = {
  fontWeight: 'bold',
  color: '#1c3faa'
};

const containerStyle = {
  padding: '40px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
};

export default function VerInventario() {
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    // Aquí simulas los datos, reemplázalo con tu API o consulta real después
    const datosEjemplo = [
      {
        id: 1,
        repuesto_id: 2,
        cantidad: 20,
        ubicacion_almacen: 'Estante A2',
        ultima_entrada_fecha: '2025-06-01T10:00:00',
        ultima_entrada_cantidad: 10,
        ultima_salida_fecha: '2025-06-20T12:00:00',
        ultima_salida_cantidad: 5,
        stock_minimo: 10,
        notas: 'Revisar cada mes.',
        creado_en: '2025-05-01T09:00:00',
        actualizado_en: '2025-06-21T14:00:00',
      },
      {
        id: 2,
        repuesto_id: 5,
        cantidad: 5,
        ubicacion_almacen: 'Estante C1',
        ultima_entrada_fecha: '2025-06-10T10:00:00',
        ultima_entrada_cantidad: 5,
        ultima_salida_fecha: '2025-06-30T12:00:00',
        ultima_salida_cantidad: 3,
        stock_minimo: 3,
        notas: 'Solo usar en emergencia.',
        creado_en: '2025-05-10T08:00:00',
        actualizado_en: '2025-07-01T10:00:00',
      },
    ];

    setInventario(datosEjemplo);
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '26px', color: '#1c3faa', textAlign: 'center', marginBottom: '30px' }}>
        Inventario - Tarjetas
      </h1>

      <div style={containerStyle}>
        {inventario.map((item) => (
          <div key={item.id} style={cardStyle}>
            <div><span style={labelStyle}>ID:</span> {item.id}</div>
            <div><span style={labelStyle}>Repuesto ID:</span> {item.repuesto_id}</div>
            <div><span style={labelStyle}>Cantidad:</span> {item.cantidad}</div>
            <div><span style={labelStyle}>Ubicación:</span> {item.ubicacion_almacen ?? 'N/A'}</div>
            <div><span style={labelStyle}>Última Entrada:</span> {item.ultima_entrada_fecha?.split('T')[0] ?? 'N/A'} ({item.ultima_entrada_cantidad ?? 0})</div>
            <div><span style={labelStyle}>Última Salida:</span> {item.ultima_salida_fecha?.split('T')[0] ?? 'N/A'} ({item.ultima_salida_cantidad ?? 0})</div>
            <div><span style={labelStyle}>Stock Mínimo:</span> {item.stock_minimo}</div>
            <div><span style={labelStyle}>Notas:</span> {item.notas ?? 'Ninguna'}</div>
            <div><span style={labelStyle}>Creado en:</span> {item.creado_en.split('T')[0]}</div>
            <div><span style={labelStyle}>Actualizado en:</span> {item.actualizado_en.split('T')[0]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
