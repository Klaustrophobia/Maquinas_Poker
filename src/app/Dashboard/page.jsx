"use client";

import { useEffect } from 'react';
import Link from 'next/link';

function Dashboard() {
  // Cargar JavaScript de Bootstrap
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <div className="container-fluid p-0">      
      {/* Navbar simple sin scroll */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">Poker</Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarBasic" 
            aria-controls="navbarBasic" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarBasic">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" href="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/inventario">Inventario</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/finanzas">Finanzas</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  Reportes
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" href="#">Ventas</Link></li>
                  <li><Link className="dropdown-item" href="#">Usuarios</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" href="#">Estadísticas</Link></li>
                </ul>
              </li>
            </ul>

            <form className="d-flex" role="search">
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Buscar..." 
                aria-label="Buscar" 
              />
              <button className="btn btn-light" type="submit">Buscar</button>
            </form>
          </div>
        </div>
      </nav>

      {/* Contenido del dashboard */}
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">Resumen de Actividad</h5>
              </div>
              <div className="card-body">
                <p>Bienvenido al panel de administración de Poker. Utiliza el menú superior para navegar entre las secciones.</p>
                <div className="alert alert-success">
                  <strong>Navegación simple:</strong> Ahora puedes acceder directamente a Inventario y Finanzas desde el menú principal.
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Estadísticas Rápidas</h5>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Usuarios activos
                    <span className="badge bg-primary rounded-pill">142</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Tareas pendientes
                    <span className="badge bg-warning rounded-pill">8</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Mensajes nuevos
                    <span className="badge bg-danger rounded-pill">23</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;