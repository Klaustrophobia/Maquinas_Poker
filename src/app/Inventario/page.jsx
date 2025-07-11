"use client";
import { useState, useEffect } from 'react';

function Inventario() {
  // Estados
  const [machines, setMachines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [failureDescription, setFailureDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cargar máquinas al iniciar
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await fetch('/api/machines');
        if (!response.ok) throw new Error('Error al cargar máquinas');
        const data = await response.json();
        setMachines(data);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMachines();
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  // Reportar falla
  const handleSubmitReport = async () => {
    if (!selectedMachine || !failureDescription.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          machineId: selectedMachine.id,
          description: failureDescription
        }),
      });

      if (!response.ok) throw new Error('Error al reportar falla');

      // Actualizar el estado local con los nuevos datos
      const updatedResponse = await fetch('/api/machines');
      const updatedData = await updatedResponse.json();
      setMachines(updatedData);
      
      setShowModal(false);
      setFailureDescription('');
      alert(`Falla reportada para máquina ${selectedMachine.id}`);
    } catch (err) {
      console.error('Error:', err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando inventario...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Inventario de Máquinas</h1>
      
      <div className="row">
        {machines.map((machine) => (
          <div key={machine.id} className="col-md-6 col-lg-4 mb-4">
            <div className={`card h-100 border-${
              machine.status === 'Operativa' ? 'success' : 
              machine.status === 'En mantenimiento' ? 'warning' : 'danger'
            }`}>
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">{machine.name}</h5>
                <span className={`badge bg-${
                  machine.status === 'Operativa' ? 'success' : 
                  machine.status === 'En mantenimiento' ? 'warning' : 'danger'
                }`}>
                  {machine.status}
                </span>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">ID:</span>
                  <strong>{machine.id}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Modelo:</span>
                  <strong>{machine.model}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Ubicación:</span>
                  <strong>{machine.location}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Último mantenimiento:</span>
                  <strong>{machine.last_maintenance || 'N/A'}</strong>
                </div>
              </div>
              <div className="card-footer bg-white text-end">
                <button 
                  className={`btn btn-${
                    machine.status === 'Operativa' ? 'danger' : 'secondary'
                  }`}
                  onClick={() => {
                    setSelectedMachine(machine);
                    setShowModal(true);
                  }}
                  disabled={machine.status !== 'Operativa' || isLoading}
                >
                  {isLoading ? 'Procesando...' : 'Reportar Falla'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para reportar fallas */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Reportar Falla en Máquina</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => !isLoading && setShowModal(false)}
                  disabled={isLoading}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <h6>Detalles de la Máquina</h6>
                  <div className="mb-2">
                    <span className="text-muted">ID:</span>
                    <strong> {selectedMachine?.id}</strong>
                  </div>
                  <div className="mb-2">
                    <span className="text-muted">Nombre:</span>
                    <strong> {selectedMachine?.name}</strong>
                  </div>
                  <div className="mb-2">
                    <span className="text-muted">Estado actual:</span>
                    <strong> {selectedMachine?.status}</strong>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="failureDescription" className="form-label">
                    Descripción detallada de la falla:
                  </label>
                  <textarea 
                    className="form-control" 
                    id="failureDescription" 
                    rows={4}
                    placeholder="Describa la falla con todos los detalles relevantes..."
                    value={failureDescription}
                    onChange={(e) => setFailureDescription(e.target.value)}
                    required
                    disabled={isLoading}
                  ></textarea>
                  <div className="form-text">
                    Incluya síntomas, frecuencia del problema y cualquier mensaje de error.
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => !isLoading && setShowModal(false)}
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={handleSubmitReport}
                  disabled={!failureDescription.trim() || isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="ms-2">Enviando...</span>
                    </>
                  ) : 'Reportar Falla'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventario;