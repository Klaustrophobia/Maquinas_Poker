'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Inventario() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Campos del modal
  const [repuestoId, setRepuestoId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [ubicacionAlmacen, setUbicacionAlmacen] = useState('');
  const [ultimaEntradaFecha, setUltimaEntradaFecha] = useState('');
  const [ultimaEntradaCantidad, setUltimaEntradaCantidad] = useState('');
  const [ultimaSalidaFecha, setUltimaSalidaFecha] = useState('');
  const [ultimaSalidaCantidad, setUltimaSalidaCantidad] = useState('');
  const [stockMinimo, setStockMinimo] = useState('');
  const [notas, setNotas] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log({
      repuestoId,
      cantidad,
      ubicacionAlmacen,
      ultimaEntradaFecha,
      ultimaEntradaCantidad,
      ultimaSalidaFecha,
      ultimaSalidaCantidad,
      stockMinimo,
      notas,
    });
    alert('✅ Máquina registrada (revisa consola)');
    setShowModal(false);
  }

  return (
    <div style={{
      height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 40
    }}>
      <div style={{ display: 'flex', gap: 80, justifyContent: 'center' }}>
        <button
          style={btnStyle}
          onClick={() => router.push('/inventario/verInventario')}
        >
          <img src="/inventario.jpg" alt="Inventario" style={imgStyle} />
          Ver Inventario
        </button>

        <button
          style={btnStyle}
          onClick={() => setShowModal(true)}
        >
          <img src="/maquinascrear.jpg" alt="Crear Máquina" style={imgStyle} />
          Crear Máquina
        </button>

        <button
          style={btnStyle}
          onClick={() => router.push('/inventario/verRepuestos')}
        >
          <img src="/repuesto.jpg" alt="Repuestos" style={imgStyle} />
          Ver Repuestos
        </button>

      </div>

      {/* Modal */}
        {/* Modal */}
        {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#ffffff',
            padding: '30px',
            borderRadius: '16px',
            width: '450px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            color: '#111827'
          }}>
            <h2 style={{ marginBottom: 20, color: '#111827', fontSize: '22px' }}>
              Crear Máquina - Inventario
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            
              <label style={labelStyle}>Cantidad</label>
              <input type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} required style={inputStyle} />

              <label style={labelStyle}>Ubicación Almacén</label>
              <input type="text" value={ubicacionAlmacen} onChange={e => setUbicacionAlmacen(e.target.value)} style={inputStyle} />

              <label style={labelStyle}>Última Entrada Fecha</label>
              <input type="date" value={ultimaEntradaFecha} onChange={e => setUltimaEntradaFecha(e.target.value)} style={inputStyle} />

              <label style={labelStyle}>Última Entrada Cantidad</label>
              <input type="number" value={ultimaEntradaCantidad} onChange={e => setUltimaEntradaCantidad(e.target.value)} style={inputStyle} />

              <label style={labelStyle}>Última Salida Fecha</label>
              <input type="date" value={ultimaSalidaFecha} onChange={e => setUltimaSalidaFecha(e.target.value)} style={inputStyle} />

              <label style={labelStyle}>Última Salida Cantidad</label>
              <input type="number" value={ultimaSalidaCantidad} onChange={e => setUltimaSalidaCantidad(e.target.value)} style={inputStyle} />

              <label style={labelStyle}>Stock Mínimo</label>
              <input type="number" value={stockMinimo} onChange={e => setStockMinimo(e.target.value)} style={inputStyle} />

              <label style={labelStyle}>Notas</label>
              <textarea value={notas} onChange={e => setNotas(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />

              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" style={greenBtn}>Guardar</button>
                <button type="button" onClick={() => setShowModal(false)} style={blueBtn}>Cerrar</button>
              </div>
            </form>
          </div>
        </div>
        )}





    </div>
  );
}

// Estilos
const imgStyle = {
  width: 200,
  height: 200,
  marginBottom: 20,
  borderRadius: 20
};

const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalStyle = {
  background: 'linear-gradient(to right, #f8fafc, #e0f2fe)',
  padding: 30,
  borderRadius: 15,
  width: '420px',
  maxHeight: '90vh',
  overflowY: 'auto',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
};

const redBtn = {
  backgroundColor: '#ef4444',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: 8
};

const labelStyle = {
  fontWeight: '500',
  fontSize: '14px',
  color: '#111827', // letras negras
};

const greenBtn = {
  backgroundColor: '#16a34a',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '500'
};

const inputStyle = {
  padding: '12px 16px', // más grande
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  fontSize: '16px',     // más grande
};

const blueBtn = {
  backgroundColor: '#1c3faa', // un azul más oscuro
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '500'
};

const btnStyle = {
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: '#1c3faa', // también aquí
  color: 'white',
  border: 'none',
  borderRadius: 10,
  padding: '20px 30px',
  fontSize: 18,
  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
};
