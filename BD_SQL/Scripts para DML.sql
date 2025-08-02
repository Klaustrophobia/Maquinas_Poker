-- Script de Inserci�n de Datos para SQL Server
-- Aseg�rate de que las tablas est�n vac�as o trunca las antes de insertar si no es la primera vez.
-- SET IDENTITY_INSERT ON/OFF es necesario para insertar IDs espec�ficos si no usas los generados autom�ticamente.

-- Deshabilitar la comprobaci�n de restricciones de clave externa temporalmente para facilitar la inserci�n masiva
-- EXEC sp_MSforeachtable "ALTER TABLE ? NOCHECK CONSTRAINT ALL";

<<<<<<< HEAD:Scripts para DML.sql
USE gestion_maquinas_poker;
GO

=======
>>>>>>> master:BD_SQL/Scripts para DML.sql
-- Inserci�n en tipos_transaccion
SET IDENTITY_INSERT tipos_transaccion ON;
INSERT INTO tipos_transaccion (id, nombre, descripcion, activa) VALUES
(1, 'Compra', 'Registro de una compra', 1),
(2, 'Venta', 'Registro de una venta', 1),
(3, 'Ajuste Entrada', 'Ajuste de inventario (+)', 1),
(4, 'Ajuste Salida', 'Ajuste de inventario (-)', 1),
(5, 'Mantenimiento', 'Costo de mantenimiento', 1);
SET IDENTITY_INSERT tipos_transaccion OFF;

-- Inserci�n en ubicaciones
SET IDENTITY_INSERT ubicaciones ON;
INSERT INTO ubicaciones (id, nombre, direccion, ciudad, codigo_postal, telefono, latitud, longitud, activa, creado_en) VALUES
(1, 'Almac�n Central', 'Calle Principal 123', 'Tegucigalpa', '11101', '+50422221111', 14.0818, -87.2068, 1, '2025-01-15 10:00:00'),
(2, 'Oficina #1', 'Av. La Paz 456', 'San Pedro Sula', '21102', '+50425553333', 15.5048, -88.0251, 1, '2025-02-01 11:30:00'),
(3, 'Sucursal Sur', 'Blvd. Moraz�n 789', 'Tegucigalpa', '11101', '+50422334444', 14.0750, -87.1950, 1, '2025-03-10 09:00:00');
SET IDENTITY_INSERT ubicaciones OFF;

-- Inserci�n en proveedores
SET IDENTITY_INSERT proveedores ON;
INSERT INTO proveedores (id, nombre, contacto, telefono, email, rtn, tipo_servicio, calificacion, activo) VALUES
(1, 'Suministros Industriales', 'Juan P�rez', '+50499887766', 'juan.perez@sumiind.com', '080119800012345', 'Repuestos y Equipo', 5, 1),
(2, 'Tech Solutions', 'Mar�a L�pez', '+50488776655', 'maria.lopez@techsol.com', '080119750098765', 'Soporte T�cnico', 4, 1),
(3, 'Herramientas del Norte', 'Pedro Garc�a', '+50477665544', 'pedro.garcia@hernort.com', '080119900054321', 'Herramientas', 5, 1);
SET IDENTITY_INSERT proveedores OFF;

-- Inserci�n en usuarios
SET IDENTITY_INSERT usuarios ON;
INSERT INTO usuarios (id, nombre, email, password_hash, rol, activo, ultimo_login, fecha_creacion, fecha_actualizacion) VALUES
(1, 'Admin General', 'admin@empresa.com', 'admin123', 'admin', 1, '2025-07-11 14:00:00', '2024-12-01 08:00:00', '2025-07-11 14:00:00'),
(2, 'Carlos M.', 'carlos.m@empresa.com', 'tecnico123', 'tecnico', 1, '2025-07-11 10:30:00', '2025-01-10 09:00:00', '2025-07-11 10:30:00'),
(3, 'Laura G.', 'laura.g@empresa.com', 'cliente123', 'cliente', 1, '2025-07-10 16:00:00', '2025-02-15 11:00:00', '2025-07-10 16:00:00');
SET IDENTITY_INSERT usuarios OFF;

-- Inserci�n en maquinas
SET IDENTITY_INSERT maquinas ON;
INSERT INTO maquinas (id, numero_serie, nombre, modelo, fecha_adquisicion, fecha_instalacion, proveedor_id, estado, ultima_ubicacion_id, ultimo_mantenimiento, proximo_mantenimiento, notas, creado_en, actualizado_en) VALUES
(1, 'SN-1001', 'Compresor A', 'XZ-200', '2023-05-20', '2023-06-01', 1, 'Operativo', 1, '2025-06-15', '2025-09-15', 'En excelente estado', '2023-06-01 09:00:00', '2025-07-11 10:00:00'),
(2, 'SN-1002', 'Bomba de Agua', 'PB-50', '2024-01-10', '2024-01-20', 1, 'Operativo', 2, '2025-05-20', '2025-08-20', 'Requiere monitoreo', '2024-01-20 10:30:00', '2025-07-11 11:00:00'),
(3, 'SN-1003', 'Generador El�ctrico', 'GEN-300', '2023-11-01', '2023-11-15', 2, 'En Mantenimiento', 1, '2025-07-10', '2025-10-10', 'Fallo en encendido', '2023-11-15 14:00:00', '2025-07-11 12:00:00');
SET IDENTITY_INSERT maquinas OFF;

-- Inserci�n en repuestos
SET IDENTITY_INSERT repuestos ON;
INSERT INTO repuestos (id, nombre, codigo, descripcion, proveedor_id, precio_unitario, ubicacion_id, compatible_con, fecha_ultimo_reabastecimiento) VALUES
(1, 'Filtro de Aire', 'FA-001', 'Filtro para compresor', 1, 25.50, 1, 'Compresor A', '2025-06-01'),
(2, 'Sello de Bomba', 'SB-002', 'Sello de alta presi�n', 1, 15.00, 1, 'Bomba de Agua', '2025-05-15'),
(3, 'Buj�a de Encendido', 'BE-003', 'Buj�a para generador', 2, 10.75, 1, 'Generador El�ctrico', '2025-06-20');
SET IDENTITY_INSERT repuestos OFF;

-- Inserci�n en ordenes_trabajo
SET IDENTITY_INSERT ordenes_trabajo ON;
INSERT INTO ordenes_trabajo (id, tipo, codigo, maquina_id, prioridad, tiempo_estimado, fecha_creacion, fecha_asignacion, fecha_inicio, fecha_finalizacion, cliente_notificado, firma_cliente, calificacion_servicio, comentarios_cliente) VALUES
(1, 'Mantenimiento Preventivo', 'OT-202507-001', 1, 'Alta', 4, '2025-07-10 09:00:00', '2025-07-10 10:00:00', '2025-07-12 08:00:00', '2025-07-12 12:00:00', 1, NULL, 5, 'Cliente satisfecho'),
(2, 'Reparaci�n', 'OT-202507-002', 3, 'Urgente', 8, '2025-07-11 14:00:00', '2025-07-11 15:00:00', '2025-07-12 10:00:00', NULL, 0, NULL, NULL, 'Esperando repuesto'),
(3, 'Instalaci�n', 'OT-202507-003', 2, 'Media', 6, '2025-07-09 11:00:00', '2025-07-09 13:00:00', '2025-07-10 09:00:00', '2025-07-10 16:00:00', 1, NULL, 4, 'Operaci�n normal');
SET IDENTITY_INSERT ordenes_trabajo OFF;

-- Inserci�n en tecnicos
SET IDENTITY_INSERT tecnicos ON;
INSERT INTO tecnicos (id, usuario_id, tipo_login, mnte_secret, especialidad, disponibilidad, vehiculo_asignado, herramienta_asignada, calificacion_promedio, ubicacion_actual, ultima_ubicacion_lat, ultima_ubicacion_lon, ultima_actualizacion_ubicacion) VALUES
(1, 2, 'Empleado', 0, 'Mec�nica Industrial', 'Disponible', 'Camioneta Pick-up', 'Kit de Herramientas', 4.8, 1, 14.0818, -87.2068, '2025-07-12 14:30:00'),
(2, NULL, 'Contratista', 0, 'Electricidad', 'Ocupado', NULL, NULL, 4.5, 3, 14.0750, -87.1950, '2025-07-12 10:00:00');
SET IDENTITY_INSERT tecnicos OFF;

-- Inserci�n en mantenimientos
SET IDENTITY_INSERT mantenimientos ON;
INSERT INTO mantenimientos (id, orden_trabajo_id, tipo, acciones_realizadas, repuestos_utilizados, costo_estimado, costo_real, fecha_programada, fecha_realizacion, tecnico_id, resultado, observaciones) VALUES
(1, 1, 'Preventivo', 'Limpieza, lubricaci�n, revisi�n', 'Filtro de Aire (1)', 150.00, 150.00, '2025-07-12 08:00:00', '2025-07-12 12:00:00', 1, 'Completado', 'Sin novedades'),
(2, 2, 'Correctivo', 'Diagn�stico, cambio de buj�a', 'Buj�a de Encendido (1)', 50.00, NULL, '2025-07-12 10:00:00', NULL, 1, 'Pendiente', 'Esperando confirmaci�n de repuesto');
SET IDENTITY_INSERT mantenimientos OFF;

-- Inserci�n en evidencia_mantenimiento
SET IDENTITY_INSERT evidencia_mantenimiento ON;
INSERT INTO evidencia_mantenimiento (id, mantenimiento_id, url_foto) VALUES
(1, 1, 'http://ejemplo.com/foto_compresor_1.jpg'),
(2, 1, 'http://ejemplo.com/foto_filtro_2.jpg'),
(3, 2, 'http://ejemplo.com/foto_generador_3.jpg');
SET IDENTITY_INSERT evidencia_mantenimiento OFF;

-- Inserci�n en transacciones (Necesita IDs de m�quina, tipo_transaccion y usuario)
SET IDENTITY_INSERT transacciones ON;
INSERT INTO transacciones (id, maquina_id, tipo_id, monto, moneda, fecha_transaccion, usuario_id, descripcion, metodo_pago, referencia, sincronizado_quickbooks) VALUES
(1, 1, 5, 150.00, 'HNL', '2025-07-12 13:05:00', 2, 'Pago por mantenimiento OT-1', 'Efectivo', 'OT-202507-001', 0),
(2, 3, 1, 10.75, 'HNL', '2025-07-11 16:05:00', 2, 'Compra de repuesto BE-003', 'Tarjeta', 'REP-BE003', 0),
(3, 2, 2, 500.00, 'HNL', '2025-07-10 10:05:00', 1, 'Cobro por instalaci�n', 'Transferencia', 'INST-MAQ-002', 0);
SET IDENTITY_INSERT transacciones OFF;

-- Inserci�n en finanzas (Necesita IDs de m�quina, usuario, transacci�n y orden de trabajo)
SET IDENTITY_INSERT finanzas ON;
INSERT INTO finanzas (id, tipo_movimiento, monto, moneda, fecha_movimiento, maquina_id, usuario_id, transaccion_id, orden_trabajo_id, referencia_externa, notas) VALUES
(1, 'Egreso', 150.00, 'HNL', '2025-07-12 13:00:00', 1, 2, 1, 1, NULL, 'Pago a t�cnico por mantenimiento'),
(2, 'Ingreso', 500.00, 'HNL', '2025-07-10 10:00:00', NULL, 1, 3, 3, 'INV-2025-001', 'Cobro por instalaci�n de m�quina'),
(3, 'Egreso', 25.50, 'HNL', '2025-07-11 16:00:00', 3, 2, 2, 2, 'OC-2025-050', 'Compra de buj�a para reparaci�n');
SET IDENTITY_INSERT finanzas OFF;

-- Inserci�n en inventarios (Necesita IDs de repuesto y ubicaci�n)
SET IDENTITY_INSERT inventarios ON;
INSERT INTO inventarios (id, repuesto_id, ubicacion_id, cantidad, ultima_entrada_fecha, ultima_salida_fecha, ultima_salida_cantidad, stock, notas, creado_en, actualizado_en) VALUES
(1, 1, 1, 10, '2025-06-01', '2025-07-05', 2, 8, 'Stock normal', '2025-05-01 08:00:00', '2025-07-05 10:00:00'),
(2, 2, 1, 5, '2025-05-15', '2025-07-01', 1, 4, 'Bajo stock, pedir m�s', '2025-05-01 08:00:00', '2025-07-01 09:00:00'),
(3, 3, 1, 12, '2025-06-20', '2025-07-11', 1, 11, 'Repuesto para Generador El�ctrico', '2025-06-15 14:00:00', '2025-07-11 16:00:00');
SET IDENTITY_INSERT inventarios OFF;

<<<<<<< HEAD:Scripts para DML.sql
=======
--insercion de proveedores 
INSERT INTO dbo.proveedores (nombre, contacto, telefono, email, direccion, rtn, tipo_servicio, calificacion) VALUES
('Repuestos del Centro S.A.', 'Manuel Solis', '2223-2027', 'ventas@repuestoscentro.com', 'Col. Centro America, Tegucigalpa', '08019999123456', 'Repuestos', 4),
('Servicios Industriales Hn', 'Sofia Castro', '2223-2028', 'info@serviciosind.com', 'Blvd. Suyapa, Tegucigalpa', '08019999654321', 'Mantenimiento', 5),
('Tecnología Global', 'Luis Ramirez', '2223-2029', 'contacto@tecnologiaglobal.com', 'Barrio Guamilito, San Pedro Sula', '08019999789012', 'Software', 3);
GO


>>>>>>> master:BD_SQL/Scripts para DML.sql
-- Volver a habilitar la comprobaci�n de restricciones de clave externa
-- EXEC sp_MSforeachtable "ALTER TABLE ? CHECK CONSTRAINT ALL";