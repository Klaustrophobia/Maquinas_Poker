"use client"
import { useState } from "react"

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan@casino.com",
      password_hash: "hashed_password_1",
      rol: "administrador",
      activo: true,
      ultimo_login: "2024-01-28 10:30:00",
      fecha_creacion: "2024-01-15 09:00:00",
      fecha_actualizacion: "2024-01-28 10:30:00",
      mfa_secret: "JBSWY3DPEHPK3PXP",
      telefono: "+1234567890",
    },
    {
      id: 2,
      nombre: "María García",
      email: "maria@casino.com",
      password_hash: "hashed_password_2",
      rol: "tecnico",
      activo: true,
      ultimo_login: "2024-01-27 14:15:00",
      fecha_creacion: "2024-01-10 11:30:00",
      fecha_actualizacion: "2024-01-27 14:15:00",
      mfa_secret: null,
      telefono: "+1234567891",
    },
    {
      id: 3,
      nombre: "Carlos López",
      email: "carlos@casino.com",
      password_hash: "hashed_password_3",
      rol: "operador",
      activo: false,
      ultimo_login: "2024-01-20 16:45:00",
      fecha_creacion: "2024-01-05 08:15:00",
      fecha_actualizacion: "2024-01-25 12:00:00",
      mfa_secret: null,
      telefono: "+1234567892",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRol, setFilterRol] = useState("")
  const [filterActivo, setFilterActivo] = useState("")

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "operador",
    activo: true,
    telefono: "",
    mfa_secret: "",
  })

  const roles = ["administrador", "tecnico", "operador", "supervisor"]

  const filteredUsuarios = usuarios.filter((usuario) => {
    const matchesSearch =
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRol = filterRol === "" || usuario.rol === filterRol
    const matchesActivo = filterActivo === "" || usuario.activo.toString() === filterActivo

    return matchesSearch && matchesRol && matchesActivo
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingUser) {
      // Actualizar usuario existente
      setUsuarios(
        usuarios.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                nombre: formData.nombre,
                email: formData.email,
                rol: formData.rol,
                activo: formData.activo,
                telefono: formData.telefono,
                mfa_secret: formData.mfa_secret || null,
                fecha_actualizacion: new Date().toISOString().slice(0, 19).replace("T", " "),
              }
            : user,
        ),
      )
    } else {
      // Crear nuevo usuario
      const newUser = {
        id: Math.max(...usuarios.map((u) => u.id)) + 1,
        nombre: formData.nombre,
        email: formData.email,
        password_hash: `hashed_${formData.password}`,
        rol: formData.rol,
        activo: formData.activo,
        ultimo_login: null,
        fecha_creacion: new Date().toISOString().slice(0, 19).replace("T", " "),
        fecha_actualizacion: new Date().toISOString().slice(0, 19).replace("T", " "),
        mfa_secret: formData.mfa_secret || null,
        telefono: formData.telefono,
      }
      setUsuarios([...usuarios, newUser])
    }

    resetForm()
    setShowModal(false)
  }

  const handleEdit = (usuario) => {
    setEditingUser(usuario)
    setFormData({
      nombre: usuario.nombre,
      email: usuario.email,
      password: "",
      rol: usuario.rol,
      activo: usuario.activo,
      telefono: usuario.telefono,
      mfa_secret: usuario.mfa_secret || "",
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      setUsuarios(usuarios.filter((user) => user.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      nombre: "",
      email: "",
      password: "",
      rol: "operador",
      activo: true,
      telefono: "",
      mfa_secret: "",
    })
    setEditingUser(null)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    resetForm()
  }

  return (
    <>
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Gestión de Usuarios</h4>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                      <i className="bi bi-plus-circle me-2"></i>
                      Nuevo Usuario
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  {/* Filtros y búsqueda */}
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <select className="form-select" value={filterRol} onChange={(e) => setFilterRol(e.target.value)}>
                        <option value="">Todos los roles</option>
                        {roles.map((rol) => (
                          <option key={rol} value={rol}>
                            {rol}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <select
                        className="form-select"
                        value={filterActivo}
                        onChange={(e) => setFilterActivo(e.target.value)}
                      >
                        <option value="">Todos los estados</option>
                        <option value="true">Activos</option>
                        <option value="false">Inactivos</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <button
                        className="btn btn-outline-secondary w-100"
                        onClick={() => {
                          setSearchTerm("")
                          setFilterRol("")
                          setFilterActivo("")
                        }}
                      >
                        Limpiar
                      </button>
                    </div>
                  </div>

                  {/* Tabla de usuarios */}
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Email</th>
                          <th>Rol</th>
                          <th>Estado</th>
                          <th>Teléfono</th>
                          <th>Último Login</th>
                          <th>MFA</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsuarios.map((usuario) => (
                          <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>
                              <span
                                className={`badge ${
                                  usuario.rol === "administrador"
                                    ? "bg-danger"
                                    : usuario.rol === "supervisor"
                                      ? "bg-warning"
                                      : usuario.rol === "tecnico"
                                        ? "bg-info"
                                        : "bg-secondary"
                                }`}
                              >
                                {usuario.rol}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${usuario.activo ? "bg-success" : "bg-danger"}`}>
                                {usuario.activo ? "Activo" : "Inactivo"}
                              </span>
                            </td>
                            <td>{usuario.telefono}</td>
                            <td>
                              {usuario.ultimo_login ? new Date(usuario.ultimo_login).toLocaleDateString() : "Nunca"}
                            </td>
                            <td>
                              {usuario.mfa_secret ? (
                                <i className="bi bi-shield-check text-success"></i>
                              ) : (
                                <i className="bi bi-shield-x text-muted"></i>
                              )}
                            </td>
                            <td>
                              <div className="btn-group" role="group">
                                <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(usuario)}>
                                  <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(usuario.id)}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredUsuarios.length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-muted">No se encontraron usuarios</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal para agregar/editar usuario */}
        {showModal && (
          <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nombre *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          {editingUser ? "Nueva Contraseña (opcional)" : "Contraseña *"}
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required={!editingUser}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Teléfono</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Rol *</label>
                        <select
                          className="form-select"
                          value={formData.rol}
                          onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                          required
                        >
                          {roles.map((rol) => (
                            <option key={rol} value={rol}>
                              {rol}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Estado</label>
                        <select
                          className="form-select"
                          value={formData.activo.toString()}
                          onChange={(e) => setFormData({ ...formData, activo: e.target.value === "true" })}
                        >
                          <option value="true">Activo</option>
                          <option value="false">Inactivo</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">MFA Secret (opcional)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.mfa_secret}
                        onChange={(e) => setFormData({ ...formData, mfa_secret: e.target.value })}
                        placeholder="Secreto para autenticación de dos factores"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingUser ? "Actualizar" : "Crear"} Usuario
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
    </>
  )
}