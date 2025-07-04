USE [master]
GO
/****** Object:  Database [gestion_maquinas_poker]    Script Date: 29/6/2025 23:06:11 ******/
CREATE DATABASE [gestion_maquinas_poker]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'gestion_maquinas_poker', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLUNAH\MSSQL\DATA\gestion_maquinas_poker.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'gestion_maquinas_poker_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLUNAH\MSSQL\DATA\gestion_maquinas_poker_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [gestion_maquinas_poker] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [gestion_maquinas_poker].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [gestion_maquinas_poker] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET ARITHABORT OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [gestion_maquinas_poker] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [gestion_maquinas_poker] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [gestion_maquinas_poker] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET  ENABLE_BROKER 
GO
ALTER DATABASE [gestion_maquinas_poker] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [gestion_maquinas_poker] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [gestion_maquinas_poker] SET  MULTI_USER 
GO
ALTER DATABASE [gestion_maquinas_poker] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [gestion_maquinas_poker] SET DB_CHAINING OFF 
GO
ALTER DATABASE [gestion_maquinas_poker] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [gestion_maquinas_poker] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [gestion_maquinas_poker] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [gestion_maquinas_poker] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [gestion_maquinas_poker] SET QUERY_STORE = ON
GO
ALTER DATABASE [gestion_maquinas_poker] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [gestion_maquinas_poker]
GO
/****** Object:  Table [dbo].[evidencia_mantenimiento]    Script Date: 29/6/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[evidencia_mantenimiento](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[mantenimiento_id] [int] NULL,
	[url_foto] [nvarchar](300) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[finanzas]    Script Date: 29/6/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[finanzas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tipo_movimiento] [nvarchar](50) NOT NULL,
	[descripcion] [nvarchar](255) NULL,
	[monto] [decimal](18, 2) NOT NULL,
	[moneda] [nvarchar](10) NOT NULL,
	[fecha_movimiento] [datetime] NOT NULL,
	[maquina_id] [int] NULL,
	[usuario_id] [int] NULL,
	[transaccion_id] [int] NULL,
	[proveedor_id] [int] NULL,
	[orden_trabajo_id] [int] NULL,
	[referencia_externa] [nvarchar](100) NULL,
	[notas] [nvarchar](max) NULL,
	[creado_en] [datetime] NOT NULL,
	[actualizado_en] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[inventario]    Script Date: 29/6/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inventario](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[repuesto_id] [int] NOT NULL,
	[cantidad] [int] NOT NULL,
	[ubicacion_almacen] [nvarchar](100) NULL,
	[ultima_entrada_fecha] [datetime] NULL,
	[ultima_entrada_cantidad] [int] NULL,
	[ultima_salida_fecha] [datetime] NULL,
	[ultima_salida_cantidad] [int] NULL,
	[stock_minimo] [int] NULL,
	[notas] [nvarchar](max) NULL,
	[creado_en] [datetime] NOT NULL,
	[actualizado_en] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[repuesto_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mantenimientos]    Script Date: 29/6/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mantenimientos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[orden_trabajo_id] [int] NULL,
	[tipo] [varchar](50) NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
	[acciones_realizadas] [nvarchar](max) NULL,
	[repuestos_utilizados] [nvarchar](max) NULL,
	[costo_estimado] [decimal](10, 2) NULL,
	[costo_real] [decimal](10, 2) NULL,
	[fecha_programada] [date] NULL,
	[fecha_realizacion] [datetime2](7) NULL,
	[tecnico_id] [int] NULL,
	[resultado] [varchar](20) NULL,
	[observaciones] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[maquinas]    Script Date: 29/6/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[maquinas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[numero_serie] [nvarchar](50) NOT NULL,
	[modelo] [nvarchar](100) NOT NULL,
	[fecha_adquisicion] [date] NOT NULL,
	[fecha_instalacion] [date] NULL,
	[estado] [nvarchar](20) NULL,
	[ubicacion_id] [int] NULL,
	[proveedor_id] [int] NULL,
	[ultimo_mantenimiento] [date] NULL,
	[proximo_mantenimiento] [date] NULL,
	[notas] [nvarchar](max) NULL,
	[creado_en] [datetime] NULL,
	[actualizado_en] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[numero_serie] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ordenes_trabajo]    Script Date: 29/6/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ordenes_trabajo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[codigo] [nvarchar](20) NOT NULL,
	[maquina_id] [int] NULL,
	[tipo] [nvarchar](20) NULL,
	[prioridad] [nvarchar](10) NULL,
	[estado] [nvarchar](20) NULL,
	[descripcion] [nvarchar](max) NOT NULL,
	[tecnico_id] [int] NULL,
	[fecha_creacion] [datetime] NULL,
	[fecha_asignacion] [datetime] NULL,
	[fecha_inicio] [datetime] NULL,
	[fecha_finalizacion] [datetime] NULL,
	[tiempo_estimado] [int] NULL,
	[tiempo_real] [int] NULL,
	[cliente_notificado] [bit] NULL,
	[firma_cliente] [nvarchar](max) NULL,
	[foto_finalizacion] [nvarchar](max) NULL,
	[calificacion_servicio] [int] NULL,
	[comentarios_cliente] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[proveedores]    Script Date: 29/6/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[proveedores](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NOT NULL,
	[contacto] [nvarchar](100) NULL,
	[telefono] [nvarchar](20) NULL,
	[email] [nvarchar](100) NULL,
	[direccion] [nvarchar](max) NULL,
	[rtn] [nvarchar](50) NULL,
	[tipo_servicio] [nvarchar](100) NULL,
	[calificacion] [nvarchar](max) NULL,
	[activo] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[repuestos]    Script Date: 29/6/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[repuestos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NOT NULL,
	[codigo] [nvarchar](50) NULL,
	[descripcion] [nvarchar](max) NULL,
	[proveedor_id] [int] NULL,
	[precio_unitario] [decimal](10, 2) NULL,
	[stock_actual] [int] NULL,
	[stock_minimo] [int] NULL,
	[ubicacion_almacen] [nvarchar](50) NULL,
	[compatible_con] [nvarchar](max) NULL,
	[fecha_ultimo_reabastecimiento] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tecnicos]    Script Date: 29/6/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tecnicos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[usuario_id] [int] NULL,
	[especialidad] [nvarchar](100) NULL,
	[disponibilidad] [nvarchar](20) NULL,
	[vehiculo_asignado] [nvarchar](50) NULL,
	[herramienta_asignada] [nvarchar](max) NULL,
	[calificacion_promedio] [decimal](3, 2) NULL,
	[ubicacion_actual] [nvarchar](100) NULL,
	[ultima_ubicacion_lat] [decimal](10, 8) NULL,
	[ultima_ubicacion_lon] [decimal](11, 8) NULL,
	[ultima_actualizacion_ubicacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipo_transaccion]    Script Date: 29/6/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipo_transaccion](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](50) NOT NULL,
	[tipo] [nvarchar](10) NULL,
	[descripcion] [nvarchar](max) NULL,
	[padre_id] [int] NULL,
	[activa] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[transacciones]    Script Date: 29/6/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[transacciones](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[maquina_id] [int] NULL,
	[tipo] [nvarchar](20) NULL,
	[monto] [decimal](12, 2) NOT NULL,
	[moneda] [nvarchar](3) NULL,
	[fecha_transaccion] [date] NOT NULL,
	[fecha_registro] [datetime] NULL,
	[descripcion] [nvarchar](max) NULL,
	[categoria_id] [int] NULL,
	[metodo_pago] [nvarchar](50) NULL,
	[referencia] [nvarchar](100) NULL,
	[usuario_id] [int] NULL,
	[sincronizado_quickbooks] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ubicaciones]    Script Date: 29/6/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ubicaciones](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NOT NULL,
	[direccion] [nvarchar](max) NOT NULL,
	[ciudad] [nvarchar](50) NOT NULL,
	[codigo_postal] [nvarchar](20) NULL,
	[telefono] [nvarchar](20) NULL,
	[responsable] [nvarchar](100) NULL,
	[latitud] [decimal](10, 8) NULL,
	[longitud] [decimal](11, 8) NULL,
	[activa] [bit] NULL,
	[creado_en] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuarios]    Script Date: 29/6/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NOT NULL,
	[email] [nvarchar](100) NOT NULL,
	[password_hash] [nvarchar](max) NOT NULL,
	[rol] [nvarchar](20) NULL,
	[telefono] [nvarchar](20) NULL,
	[activo] [bit] NULL,
	[ultimo_login] [datetime] NULL,
	[mfa_secret] [nvarchar](max) NULL,
	[fecha_creacion] [datetime] NULL,
	[fecha_actualizacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[finanzas] ADD  DEFAULT (getdate()) FOR [creado_en]
GO
ALTER TABLE [dbo].[finanzas] ADD  DEFAULT (getdate()) FOR [actualizado_en]
GO
ALTER TABLE [dbo].[inventario] ADD  DEFAULT ((0)) FOR [cantidad]
GO
ALTER TABLE [dbo].[inventario] ADD  DEFAULT ((0)) FOR [stock_minimo]
GO
ALTER TABLE [dbo].[inventario] ADD  DEFAULT (getdate()) FOR [creado_en]
GO
ALTER TABLE [dbo].[inventario] ADD  DEFAULT (getdate()) FOR [actualizado_en]
GO
ALTER TABLE [dbo].[maquinas] ADD  DEFAULT (getdate()) FOR [creado_en]
GO
ALTER TABLE [dbo].[maquinas] ADD  DEFAULT (getdate()) FOR [actualizado_en]
GO
ALTER TABLE [dbo].[ordenes_trabajo] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[ordenes_trabajo] ADD  DEFAULT ((0)) FOR [cliente_notificado]
GO
ALTER TABLE [dbo].[proveedores] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[repuestos] ADD  DEFAULT ((0)) FOR [stock_actual]
GO
ALTER TABLE [dbo].[repuestos] ADD  DEFAULT ((5)) FOR [stock_minimo]
GO
ALTER TABLE [dbo].[tecnicos] ADD  DEFAULT ('disponible') FOR [disponibilidad]
GO
ALTER TABLE [dbo].[tipo_transaccion] ADD  DEFAULT ((1)) FOR [activa]
GO
ALTER TABLE [dbo].[transacciones] ADD  DEFAULT ('HNL') FOR [moneda]
GO
ALTER TABLE [dbo].[transacciones] ADD  DEFAULT (getdate()) FOR [fecha_registro]
GO
ALTER TABLE [dbo].[transacciones] ADD  DEFAULT ((0)) FOR [sincronizado_quickbooks]
GO
ALTER TABLE [dbo].[ubicaciones] ADD  DEFAULT ((1)) FOR [activa]
GO
ALTER TABLE [dbo].[ubicaciones] ADD  DEFAULT (getdate()) FOR [creado_en]
GO
ALTER TABLE [dbo].[usuarios] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[usuarios] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[usuarios] ADD  DEFAULT (getdate()) FOR [fecha_actualizacion]
GO
ALTER TABLE [dbo].[evidencia_mantenimiento]  WITH CHECK ADD FOREIGN KEY([mantenimiento_id])
REFERENCES [dbo].[mantenimientos] ([id])
GO
ALTER TABLE [dbo].[finanzas]  WITH CHECK ADD  CONSTRAINT [FK_Finanzas_Maquinas] FOREIGN KEY([maquina_id])
REFERENCES [dbo].[maquinas] ([id])
GO
ALTER TABLE [dbo].[finanzas] CHECK CONSTRAINT [FK_Finanzas_Maquinas]
GO
ALTER TABLE [dbo].[finanzas]  WITH CHECK ADD  CONSTRAINT [FK_Finanzas_OrdenesTrabajo] FOREIGN KEY([orden_trabajo_id])
REFERENCES [dbo].[ordenes_trabajo] ([id])
GO
ALTER TABLE [dbo].[finanzas] CHECK CONSTRAINT [FK_Finanzas_OrdenesTrabajo]
GO
ALTER TABLE [dbo].[finanzas]  WITH CHECK ADD  CONSTRAINT [FK_Finanzas_Proveedores] FOREIGN KEY([proveedor_id])
REFERENCES [dbo].[proveedores] ([id])
GO
ALTER TABLE [dbo].[finanzas] CHECK CONSTRAINT [FK_Finanzas_Proveedores]
GO
ALTER TABLE [dbo].[finanzas]  WITH CHECK ADD  CONSTRAINT [FK_Finanzas_Transacciones] FOREIGN KEY([transaccion_id])
REFERENCES [dbo].[transacciones] ([id])
GO
ALTER TABLE [dbo].[finanzas] CHECK CONSTRAINT [FK_Finanzas_Transacciones]
GO
ALTER TABLE [dbo].[finanzas]  WITH CHECK ADD  CONSTRAINT [FK_Finanzas_Usuarios] FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[finanzas] CHECK CONSTRAINT [FK_Finanzas_Usuarios]
GO
ALTER TABLE [dbo].[inventario]  WITH CHECK ADD  CONSTRAINT [FK_Inventario_Repuestos] FOREIGN KEY([repuesto_id])
REFERENCES [dbo].[repuestos] ([id])
GO
ALTER TABLE [dbo].[inventario] CHECK CONSTRAINT [FK_Inventario_Repuestos]
GO
ALTER TABLE [dbo].[mantenimientos]  WITH CHECK ADD FOREIGN KEY([orden_trabajo_id])
REFERENCES [dbo].[ordenes_trabajo] ([id])
GO
ALTER TABLE [dbo].[mantenimientos]  WITH CHECK ADD FOREIGN KEY([tecnico_id])
REFERENCES [dbo].[tecnicos] ([id])
GO
ALTER TABLE [dbo].[maquinas]  WITH CHECK ADD FOREIGN KEY([proveedor_id])
REFERENCES [dbo].[proveedores] ([id])
GO
ALTER TABLE [dbo].[maquinas]  WITH CHECK ADD FOREIGN KEY([ubicacion_id])
REFERENCES [dbo].[ubicaciones] ([id])
GO
ALTER TABLE [dbo].[ordenes_trabajo]  WITH CHECK ADD FOREIGN KEY([maquina_id])
REFERENCES [dbo].[maquinas] ([id])
GO
ALTER TABLE [dbo].[ordenes_trabajo]  WITH CHECK ADD FOREIGN KEY([tecnico_id])
REFERENCES [dbo].[tecnicos] ([id])
GO
ALTER TABLE [dbo].[repuestos]  WITH CHECK ADD FOREIGN KEY([proveedor_id])
REFERENCES [dbo].[proveedores] ([id])
GO
ALTER TABLE [dbo].[tecnicos]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[tipo_transaccion]  WITH CHECK ADD  CONSTRAINT [FK_CategoriasPadre] FOREIGN KEY([padre_id])
REFERENCES [dbo].[tipo_transaccion] ([id])
GO
ALTER TABLE [dbo].[tipo_transaccion] CHECK CONSTRAINT [FK_CategoriasPadre]
GO
ALTER TABLE [dbo].[transacciones]  WITH CHECK ADD FOREIGN KEY([categoria_id])
REFERENCES [dbo].[tipo_transaccion] ([id])
GO
ALTER TABLE [dbo].[transacciones]  WITH CHECK ADD FOREIGN KEY([maquina_id])
REFERENCES [dbo].[maquinas] ([id])
GO
ALTER TABLE [dbo].[transacciones]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[mantenimientos]  WITH CHECK ADD CHECK  (([resultado]='parcial' OR [resultado]='fallido' OR [resultado]='exitoso'))
GO
ALTER TABLE [dbo].[maquinas]  WITH CHECK ADD CHECK  (([estado]='retirada' OR [estado]='en_reparacion' OR [estado]='en_mantenimiento' OR [estado]='inactiva' OR [estado]='activa'))
GO
ALTER TABLE [dbo].[ordenes_trabajo]  WITH CHECK ADD CHECK  (([calificacion_servicio]>=(1) AND [calificacion_servicio]<=(5)))
GO
ALTER TABLE [dbo].[ordenes_trabajo]  WITH CHECK ADD CHECK  (([estado]='cancelada' OR [estado]='completada' OR [estado]='en_proceso' OR [estado]='asignada' OR [estado]='pendiente'))
GO
ALTER TABLE [dbo].[ordenes_trabajo]  WITH CHECK ADD CHECK  (([prioridad]='urgente' OR [prioridad]='alta' OR [prioridad]='media' OR [prioridad]='baja'))
GO
ALTER TABLE [dbo].[ordenes_trabajo]  WITH CHECK ADD CHECK  (([tipo]='retiro' OR [tipo]='instalacion' OR [tipo]='correctivo' OR [tipo]='preventivo'))
GO
ALTER TABLE [dbo].[tipo_transaccion]  WITH CHECK ADD CHECK  (([tipo]='egreso' OR [tipo]='ingreso'))
GO
ALTER TABLE [dbo].[transacciones]  WITH CHECK ADD CHECK  (([tipo]='ajuste' OR [tipo]='egreso' OR [tipo]='ingreso'))
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD CHECK  (([rol]='supervisor' OR [rol]='cliente' OR [rol]='tecnico' OR [rol]='finanzas' OR [rol]='admin'))
GO
USE [master]
GO
ALTER DATABASE [gestion_maquinas_poker] SET  READ_WRITE 
GO
