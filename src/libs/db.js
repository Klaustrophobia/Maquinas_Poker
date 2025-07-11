import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Configuración segura para Next.js (solo ejecuta en servidor)
let db;

if (typeof window === 'undefined') {
  // Configuración de rutas seguras
  const dbDir = path.join(process.cwd(), 'database');
  const dbPath = path.join(dbDir, 'poker.db');

  // Crear directorio si no existe
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Conexión a la base de datos
  db = new Database(dbPath, { 
    verbose: process.env.NODE_ENV === 'development' ? console.log : null 
  });

  // Función de inicialización mejorada
  const initializeDatabase = () => {
    try {
      // Creación de tablas con mejor manejo de errores
      db.pragma('journal_mode = WAL');
      
      db.exec(`
        CREATE TABLE IF NOT EXISTS machines (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          model TEXT NOT NULL,
          location TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'Operativa',
          last_maintenance TEXT,
          client_id TEXT NOT NULL DEFAULT 'CL001',
          hourly_rate REAL DEFAULT 0,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS failure_reports (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          machine_id TEXT NOT NULL,
          description TEXT NOT NULL,
          reported_by TEXT DEFAULT 'Anónimo',
          status TEXT DEFAULT 'Reportada',
          severity TEXT DEFAULT 'Media',
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (machine_id) REFERENCES machines(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS financial_records (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          machine_id TEXT NOT NULL,
          client_id TEXT NOT NULL,
          session_start TEXT NOT NULL,
          session_end TEXT NOT NULL,
          hours_worked REAL NOT NULL,
          earnings REAL NOT NULL,
          notes TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (machine_id) REFERENCES machines(id) ON DELETE CASCADE
        );

        CREATE TRIGGER IF NOT EXISTS update_machine_timestamp
        AFTER UPDATE ON machines
        FOR EACH ROW
        BEGIN
          UPDATE machines SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END;

        CREATE INDEX IF NOT EXISTS idx_financial_machine_id ON financial_records(machine_id);
        CREATE INDEX IF NOT EXISTS idx_financial_client_id ON financial_records(client_id);
        CREATE INDEX IF NOT EXISTS idx_financial_dates ON financial_records(session_start, session_end);
      `);

      // Insertar datos iniciales de forma más robusta
      const rowCount = db.prepare("SELECT COUNT(*) as count FROM machines").get().count;
      
      if (rowCount === 0) {
        const machines = [
          { id: 'M001', name: 'Fresadora CNC', model: 'HAAS VF-2', location: 'Taller A', 
            status: 'Operativa', lastMaintenance: '2023-10-15', clientId: 'CL001', hourlyRate: 85.50 },
          { id: 'M002', name: 'Torno Paralelo', model: 'GRAZIANO SAG 14', location: 'Taller B', 
            status: 'Operativa', lastMaintenance: '2023-09-22', clientId: 'CL001', hourlyRate: 75.00 },
          { id: 'M003', name: 'Cortadora Laser', model: 'TRUMPF 3030', location: 'Taller C', 
            status: 'En mantenimiento', lastMaintenance: '2023-11-05', clientId: 'CL002', hourlyRate: 120.00 },
          { id: 'M004', name: 'Impresora 3D Industrial', model: 'STRATASYS F900', location: 'Laboratorio', 
            status: 'Operativa', lastMaintenance: '2023-10-30', clientId: 'CL002', hourlyRate: 95.75 },
          { id: 'M005', name: 'Prensa Hidráulica', model: 'ACRA 150-Ton', location: 'Taller A', 
            status: 'Requiere revisión', lastMaintenance: '2023-08-12', clientId: 'CL003', hourlyRate: 65.25 },
          { id: 'M006', name: 'Rectificadora', model: 'JONES & SHIPMAN 540X', location: 'Taller B', 
            status: 'Operativa', lastMaintenance: '2023-11-10', clientId: 'CL003', hourlyRate: 80.00 }
        ];

        const financialData = [
          { machineId: 'M001', clientId: 'CL001', sessionStart: '2023-11-01 08:00:00', 
            sessionEnd: '2023-11-01 12:30:00', hoursWorked: 4.5, earnings: 384.75 },
          { machineId: 'M001', clientId: 'CL001', sessionStart: '2023-11-02 09:00:00', 
            sessionEnd: '2023-11-02 17:00:00', hoursWorked: 8.0, earnings: 684.00 },
          { machineId: 'M002', clientId: 'CL001', sessionStart: '2023-11-01 10:00:00', 
            sessionEnd: '2023-11-01 15:00:00', hoursWorked: 5.0, earnings: 375.00 },
          { machineId: 'M003', clientId: 'CL002', sessionStart: '2023-11-03 08:00:00', 
            sessionEnd: '2023-11-03 16:00:00', hoursWorked: 8.0, earnings: 960.00 },
          { machineId: 'M004', clientId: 'CL002', sessionStart: '2023-11-04 09:00:00', 
            sessionEnd: '2023-11-04 13:30:00', hoursWorked: 4.5, earnings: 430.88 },
          { machineId: 'M005', clientId: 'CL003', sessionStart: '2023-11-05 14:00:00', 
            sessionEnd: '2023-11-05 18:00:00', hoursWorked: 4.0, earnings: 261.00 },
          { machineId: 'M006', clientId: 'CL003', sessionStart: '2023-11-06 07:00:00', 
            sessionEnd: '2023-11-06 15:00:00', hoursWorked: 8.0, earnings: 640.00 }
        ];

        const insertMachine = db.prepare(`
          INSERT INTO machines (id, name, model, location, status, last_maintenance, client_id, hourly_rate)
          VALUES (@id, @name, @model, @location, @status, @lastMaintenance, @clientId, @hourlyRate)
        `);

        const insertFinancial = db.prepare(`
          INSERT INTO financial_records (machine_id, client_id, session_start, session_end, hours_worked, earnings)
          VALUES (@machineId, @clientId, @sessionStart, @sessionEnd, @hoursWorked, @earnings)
        `);

        const transaction = db.transaction(() => {
          for (const machine of machines) {
            insertMachine.run(machine);
          }
          for (const record of financialData) {
            insertFinancial.run(record);
          }
        });

        transaction();
      }
    } catch (error) {
      console.error('Error inicializando la base de datos:', error);
      throw error;
    }
  };

  // Inicialización con manejo de errores
  try {
    initializeDatabase();
  } catch (error) {
    console.error('Error crítico al iniciar la base de datos:', error);
    process.exit(1);
  }
} else {
  // En el cliente, proporciona un mock o lanza error claro
  db = {
    prepare: () => {
      throw new Error('Database operations are not available on the client side');
    }
  };
}

// Funciones para el módulo de finanzas
export const getFinancialDataByClient = (clientId = 'CL001') => {
  try {
    // Versión compatible con el esquema actualizado
    const machinesSummary = db.prepare(`
      SELECT m.id, m.name, m.model, 
             IFNULL(SUM(fr.earnings), 0) AS total_earnings,
             IFNULL(SUM(fr.hours_worked), 0) AS total_hours,
             COUNT(fr.id) AS sessions_count
      FROM machines m
      LEFT JOIN financial_records fr ON m.id = fr.machine_id
      WHERE m.client_id = ?
      GROUP BY m.id
      ORDER BY total_earnings DESC
    `).all(clientId);

    const historicalData = db.prepare(`
      SELECT 
        strftime('%Y-%m', fr.session_start) AS month,
        m.name AS machine_name,
        IFNULL(SUM(fr.earnings), 0) AS monthly_earnings,
        IFNULL(SUM(fr.hours_worked), 0) AS monthly_hours
      FROM financial_records fr
      JOIN machines m ON fr.machine_id = m.id
      WHERE m.client_id = ?
      GROUP BY month, m.name
      ORDER BY month ASC
    `).all(clientId);

    return {
      machines: machinesSummary,
      historical: historicalData
    };
  } catch (error) {
    console.error('Error obteniendo datos financieros:', error);
    throw error;
  }
};

export const getClientMachines = (clientId) => {
  return db.prepare(`
    SELECT id, name, model, hourly_rate 
    FROM machines 
    WHERE client_id = ?
    ORDER BY name
  `).all(clientId);
};

export const addFinancialRecord = (record) => {
  return db.prepare(`
    INSERT INTO financial_records 
    (machine_id, client_id, session_start, session_end, hours_worked, earnings, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    record.machineId,
    record.clientId,
    record.sessionStart,
    record.sessionEnd,
    record.hoursWorked,
    record.earnings,
    record.notes || null
  );
};

// Exportación por defecto
export default db;