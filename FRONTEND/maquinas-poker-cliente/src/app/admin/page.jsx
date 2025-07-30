'use client';
import { useState } from "react"

const machineData = [
  {
    id: "PKR-001",
    location: "Sala Principal",
    status: "operational",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-02-15",
    uptime: 98.5,
  },
  {
    id: "PKR-002",
    location: "Sala VIP",
    status: "maintenance",
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-01-25",
    uptime: 95.2,
  },
  {
    id: "PKR-003",
    location: "Entrada",
    status: "warning",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-02-10",
    uptime: 89.1,
  },
  {
    id: "PKR-004",
    location: "Bar",
    status: "operational",
    lastMaintenance: "2024-01-18",
    nextMaintenance: "2024-02-18",
    uptime: 99.1,
  },
  {
    id: "PKR-005",
    location: "Terraza",
    status: "error",
    lastMaintenance: "2024-01-05",
    nextMaintenance: "2024-01-28",
    uptime: 76.3,
  },
]

const alerts = [
  { id: 1, machine: "PKR-005", type: "error", message: "Fallo en sistema de pago", time: "Hace 2 horas" },
  { id: 2, machine: "PKR-003", type: "warning", message: "Mantenimiento programado mañana", time: "Hace 4 horas" },
  { id: 3, machine: "PKR-002", type: "maintenance", message: "Mantenimiento en progreso", time: "Hace 6 horas" },
]

const maintenanceSchedule = [
  { id: 1, machine: "PKR-003", type: "Preventivo", date: "2024-01-29", technician: "Juan Pérez" },
  { id: 2, machine: "PKR-001", type: "Limpieza", date: "2024-01-30", technician: "María García" },
  { id: 3, machine: "PKR-004", type: "Preventivo", date: "2024-02-01", technician: "Carlos López" },
]

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const getStatusColor = (status) => {
    switch (status) {
      case "operational":
        return "success"
      case "warning":
        return "warning"
      case "maintenance":
        return "info"
      case "error":
        return "danger"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "operational":
        return "bi-check-circle-fill"
      case "warning":
        return "bi-exclamation-triangle-fill"
      case "maintenance":
        return "bi-tools"
      case "error":
        return "bi-x-circle-fill"
      default:
        return "bi-question-circle"
    }
  }

  const operationalMachines = machineData.filter((m) => m.status === "operational").length
  const totalMachines = machineData.length
  const averageUptime = machineData.reduce((acc, m) => acc + m.uptime, 0) / totalMachines

  return (

        <div className="container-fluid p-4">
          {/* Métricas principales */}
          <div className="row g-4 mb-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="card-title text-muted mb-0">Máquinas Operativas</h6>
                    <i className="bi bi-check-circle text-success fs-4"></i>
                  </div>
                  <h2 className="mb-1">
                    {operationalMachines}/{totalMachines}
                  </h2>
                  <small className="text-muted">
                    {((operationalMachines / totalMachines) * 100).toFixed(1)}% del total
                  </small>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="card-title text-muted mb-0">Tiempo Promedio Activo</h6>
                    <i className="bi bi-activity text-primary fs-4"></i>
                  </div>
                  <h2 className="mb-1">{averageUptime.toFixed(1)}%</h2>
                  <small className="text-muted">Últimos 30 días</small>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="card-title text-muted mb-0">Alertas Activas</h6>
                    <i className="bi bi-exclamation-triangle text-warning fs-4"></i>
                  </div>
                  <h2 className="mb-1">{alerts.length}</h2>
                  <small className="text-muted">Requieren atención</small>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="card-title text-muted mb-0">Mantenimientos Programados</h6>
                    <i className="bi bi-calendar text-info fs-4"></i>
                  </div>
                  <h2 className="mb-1">{maintenanceSchedule.length}</h2>
                  <small className="text-muted">Próximos 7 días</small>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs de navegación */}
          <div className="card">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs" id="dashboardTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${selectedTab === "overview" ? "active" : ""}`}
                    onClick={() => setSelectedTab("overview")}
                    type="button"
                  >
                    Resumen
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${selectedTab === "machines" ? "active" : ""}`}
                    onClick={() => setSelectedTab("machines")}
                    type="button"
                  >
                    Máquinas
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${selectedTab === "maintenance" ? "active" : ""}`}
                    onClick={() => setSelectedTab("maintenance")}
                    type="button"
                  >
                    Mantenimiento
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${selectedTab === "alerts" ? "active" : ""}`}
                    onClick={() => setSelectedTab("alerts")}
                    type="button"
                  >
                    Alertas
                  </button>
                </li>
              </ul>
            </div>

            <div className="card-body">
              <div className="tab-content">
                {/* Tab Resumen */}
                {selectedTab === "overview" && (
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="card-title mb-0">Estado General de Máquinas</h5>
                          <small className="text-muted">Distribución por estado operativo</small>
                        </div>
                        <div className="card-body">
                          {["operational", "warning", "maintenance", "error"].map((status) => {
                            const count = machineData.filter((m) => m.status === status).length
                            const percentage = (count / totalMachines) * 100
                            const labels = {
                              operational: "Operativas",
                              warning: "Con advertencias",
                              maintenance: "En mantenimiento",
                              error: "Con errores",
                            }
                            return (
                              <div key={status} className="mb-3">
                                <div className="d-flex justify-content-between mb-1">
                                  <small>{labels[status]}</small>
                                  <small>{count} máquinas</small>
                                </div>
                                <div className="progress" style={{ height: "8px" }}>
                                  <div
                                    className={`progress-bar bg-${getStatusColor(status)}`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="card-title mb-0">Rendimiento Semanal</h5>
                          <small className="text-muted">Tiempo de actividad promedio</small>
                        </div>
                        <div className="card-body">
                          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => {
                            const uptime = 95 + Math.random() * 5
                            return (
                              <div key={day} className="d-flex align-items-center mb-3">
                                <div style={{ width: "40px" }} className="text-sm fw-medium">
                                  {day}
                                </div>
                                <div className="progress flex-grow-1 mx-3" style={{ height: "8px" }}>
                                  <div className="progress-bar bg-success" style={{ width: `${uptime}%` }}></div>
                                </div>
                                <div style={{ width: "50px" }} className="text-end small">
                                  {uptime.toFixed(1)}%
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Máquinas */}
                {selectedTab === "machines" && (
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Estado de Máquinas</h5>
                      <small className="text-muted">Monitoreo en tiempo real de todas las máquinas</small>
                    </div>
                    <div className="card-body">
                      {machineData.map((machine) => (
                        <div
                          key={machine.id}
                          className="d-flex align-items-center justify-content-between p-3 border rounded mb-3"
                        >
                          <div className="d-flex align-items-center">
                            <i
                              className={`bi ${getStatusIcon(machine.status)} text-${getStatusColor(machine.status)} me-3`}
                            ></i>
                            <div>
                              <div className="fw-medium">{machine.id}</div>
                              <small className="text-muted">{machine.location}</small>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <span className={`badge bg-${getStatusColor(machine.status)} me-3`}>
                              {machine.status === "operational" && "Operativa"}
                              {machine.status === "warning" && "Advertencia"}
                              {machine.status === "maintenance" && "Mantenimiento"}
                              {machine.status === "error" && "Error"}
                            </span>
                            <div className="text-end me-3">
                              <div className="small fw-medium">{machine.uptime}% uptime</div>
                              <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                                Último: {machine.lastMaintenance}
                              </div>
                            </div>
                            <button className="btn btn-outline-secondary btn-sm">
                              <i className="bi bi-tools"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Mantenimiento */}
                {selectedTab === "maintenance" && (
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Programación de Mantenimiento</h5>
                      <small className="text-muted">Próximos mantenimientos programados</small>
                    </div>
                    <div className="card-body">
                      {maintenanceSchedule.map((maintenance) => (
                        <div
                          key={maintenance.id}
                          className="d-flex align-items-center justify-content-between p-3 border rounded mb-3"
                        >
                          <div className="d-flex align-items-center">
                            <i className="bi bi-calendar text-primary me-3 fs-5"></i>
                            <div>
                              <div className="fw-medium">{maintenance.machine}</div>
                              <small className="text-muted">{maintenance.type}</small>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="text-end me-3">
                              <div className="small fw-medium">{maintenance.date}</div>
                              <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                                {maintenance.technician}
                              </div>
                            </div>
                            <button className="btn btn-outline-primary btn-sm">Editar</button>
                          </div>
                        </div>
                      ))}
                      <button className="btn btn-primary w-100 mt-3">
                        <i className="bi bi-calendar-plus me-2"></i>
                        Programar Nuevo Mantenimiento
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab Alertas */}
                {selectedTab === "alerts" && (
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Alertas del Sistema</h5>
                      <small className="text-muted">Notificaciones y alertas activas</small>
                    </div>
                    <div className="card-body">
                      {alerts.map((alert) => (
                        <div key={alert.id} className="d-flex align-items-start p-3 border rounded mb-3">
                          <div className="me-3 mt-1">
                            {alert.type === "error" && <i className="bi bi-exclamation-circle text-danger fs-5"></i>}
                            {alert.type === "warning" && (
                              <i className="bi bi-exclamation-triangle text-warning fs-5"></i>
                            )}
                            {alert.type === "maintenance" && <i className="bi bi-clock text-info fs-5"></i>}
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="fw-medium">{alert.machine}</div>
                              <small className="text-muted">{alert.time}</small>
                            </div>
                            <div className="text-muted small mt-1">{alert.message}</div>
                          </div>
                          <button className="btn btn-outline-success btn-sm ms-3">Resolver</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
  );
}
