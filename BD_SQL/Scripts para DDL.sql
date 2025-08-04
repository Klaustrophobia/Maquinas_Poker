-- Script de Creaci�n de Tablas para SQL Server

USE gestion_maquinas_poker;
GO


-- Tabla tipos_transaccion
CREATE TABLE tipos_transaccion (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255),
    activa BIT NOT NULL DEFAULT 1
);

-- Tabla ubicaciones
CREATE TABLE ubicaciones (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    codigo_postal VARCHAR(20),
    telefono VARCHAR(20),
    latitud DECIMAL(10, 8),
    longitud DECIMAL(11, 8),
    activa BIT NOT NULL DEFAULT 1,
    creado_en DATETIME DEFAULT GETDATE()
);

-- Tabla proveedores
CREATE TABLE proveedores (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    rtn VARCHAR(50),
    tipo_servicio VARCHAR(100),
    calificacion INT,
    activo BIT NOT NULL DEFAULT 1
);

-- Tabla usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    activo BIT NOT NULL DEFAULT 1,
    ultimo_login DATETIME,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    fecha_actualizacion DATETIME DEFAULT GETDATE()
);

-- Tabla maquinas
CREATE TABLE maquinas (
    id INT PRIMARY KEY IDENTITY(1,1),
    numero_serie VARCHAR(100) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    modelo VARCHAR(100),
    fecha_adquisicion DATE,
    fecha_instalacion DATE,
    proveedor_id INT,
    estado VARCHAR(50),
    ultima_ubicacion_id INT,
    ultimo_mantenimiento DATE,
    proximo_mantenimiento DATE,
    notas TEXT,
    creado_en DATETIME DEFAULT GETDATE(),
    actualizado_en DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id),
    FOREIGN KEY (ultima_ubicacion_id) REFERENCES ubicaciones(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla repuestos
CREATE TABLE repuestos (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255) NOT NULL,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT,
    proveedor_id INT,
    precio_unitario DECIMAL(10, 2),
    ubicacion_id INT, -- Ubicaci�n por defecto o principal del repuesto
    compatible_con VARCHAR(255),
    fecha_ultimo_reabastecimiento DATE,
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id),
    FOREIGN KEY (ubicacion_id) REFERENCES ubicaciones(id)
);

-- Tabla ordenes_trabajo
CREATE TABLE ordenes_trabajo (
    id INT PRIMARY KEY IDENTITY(1,1),
    tipo VARCHAR(100) NOT NULL,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    maquina_id INT NOT NULL,
    prioridad VARCHAR(50),
    tiempo_estimado INT, -- En horas
    fecha_creacion DATETIME DEFAULT GETDATE(),
    fecha_asignacion DATETIME,
    fecha_inicio DATETIME,
    fecha_finalizacion DATETIME,
    cliente_notificado BIT DEFAULT 0,
    firma_cliente VARBINARY(MAX), -- Para almacenar una imagen de firma o hash
    calificacion_servicio INT,
    comentarios_cliente TEXT,
    FOREIGN KEY (maquina_id) REFERENCES maquinas(id)
);

-- Tabla finanzas
CREATE TABLE finanzas (
    id INT PRIMARY KEY IDENTITY(1,1),
    tipo_movimiento VARCHAR(50) NOT NULL, -- Ej. Ingreso, Egreso
    monto DECIMAL(18, 2) NOT NULL,
    moneda VARCHAR(10) NOT NULL DEFAULT 'HNL',
    fecha_movimiento DATETIME DEFAULT GETDATE(),
    maquina_id INT,
    usuario_id INT,
    transaccion_id INT, -- Posiblemente enlace a tabla de transacciones generales
    orden_trabajo_id INT,
    referencia_externa VARCHAR(255),
    notas TEXT,
    FOREIGN KEY (maquina_id) REFERENCES maquinas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    -- FOREIGN KEY (transaccion_id) REFERENCES transacciones(id), -- Se a�ade despu�s para evitar ciclo de dependencia
    FOREIGN KEY (orden_trabajo_id) REFERENCES ordenes_trabajo(id)
);

-- Tabla transacciones
CREATE TABLE transacciones (
    id INT PRIMARY KEY IDENTITY(1,1),
    maquina_id INT,
    tipo_id INT NOT NULL,
    monto DECIMAL(18, 2) NOT NULL,
    moneda VARCHAR(10) NOT NULL DEFAULT 'HNL',
    fecha_transaccion DATETIME DEFAULT GETDATE(),
    usuario_id INT,
    descripcion TEXT,
    metodo_pago VARCHAR(50),
    referencia VARCHAR(255),
    sincronizado_quickbooks BIT DEFAULT 0,
    FOREIGN KEY (maquina_id) REFERENCES maquinas(id),
    FOREIGN KEY (tipo_id) REFERENCES tipos_transaccion(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Ahora que transacciones existe, podemos a�adir la FK en finanzas
ALTER TABLE finanzas
ADD CONSTRAINT FK_finanzas_transacciones FOREIGN KEY (transaccion_id) REFERENCES transacciones(id);


-- Tabla inventarios
CREATE TABLE inventarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    repuesto_id INT NOT NULL,
    ubicacion_id INT NOT NULL,
    cantidad INT NOT NULL,
    ultima_entrada_fecha DATE,
    ultima_salida_fecha DATE,
    ultima_salida_cantidad INT,
    stock INT, -- Podr�a ser un valor calculado o almacenado
    notas TEXT,
    creado_en DATETIME DEFAULT GETDATE(),
    actualizado_en DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (repuesto_id) REFERENCES repuestos(id),
    FOREIGN KEY (ubicacion_id) REFERENCES ubicaciones(id),
    CONSTRAINT UQ_Inventario_Repuesto_Ubicacion UNIQUE (repuesto_id, ubicacion_id) -- Un repuesto solo puede tener una entrada por ubicaci�n
);

-- Tabla tecnicos
CREATE TABLE tecnicos (
    id INT PRIMARY KEY IDENTITY(1,1),
    usuario_id INT UNIQUE, -- Un t�cnico puede ser un usuario del sistema
    tipo_login VARCHAR(50), -- Ej. Empleado, Contratista
    mnte_secret BIT DEFAULT 0, -- Asumiendo que es una columna booleana para 'mantenimiento secreto' o similar
    especialidad VARCHAR(100),
    disponibilidad VARCHAR(50), -- Ej. Disponible, Ocupado
    vehiculo_asignado VARCHAR(100),
    herramienta_asignada VARCHAR(255),
    calificacion_promedio DECIMAL(3, 1),
    ubicacion_actual INT, -- �ltima ubicaci�n conocida del t�cnico
    ultima_ubicacion_lat DECIMAL(10, 8),
    ultima_ubicacion_lon DECIMAL(11, 8),
    ultima_actualizacion_ubicacion DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (ubicacion_actual) REFERENCES ubicaciones(id)
);

-- Tabla mantenimientos
CREATE TABLE mantenimientos (
    id INT PRIMARY KEY IDENTITY(1,1),
    orden_trabajo_id INT NOT NULL,
    tipo VARCHAR(100), -- Ej. Preventivo, Correctivo
    acciones_realizadas TEXT,
    repuestos_utilizados TEXT, -- Podr�a ser un JSON o lista de texto
    costo_estimado DECIMAL(18, 2),
    costo_real DECIMAL(18, 2),
    fecha_programada DATETIME,
    fecha_realizacion DATETIME,
    tecnico_id INT,
    resultado VARCHAR(100), -- Ej. Completado, Pendiente, Fallido
    observaciones TEXT,
    FOREIGN KEY (orden_trabajo_id) REFERENCES ordenes_trabajo(id),
    FOREIGN KEY (tecnico_id) REFERENCES tecnicos(id)
);

-- Tabla evidencia_mantenimiento
CREATE TABLE evidencia_mantenimiento (
    id INT PRIMARY KEY IDENTITY(1,1),
    mantenimiento_id INT NOT NULL,
    url_foto VARCHAR(255),
    FOREIGN KEY (mantenimiento_id) REFERENCES mantenimientos(id)
);