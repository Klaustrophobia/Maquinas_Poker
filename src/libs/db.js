import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

let db;

if (typeof window === 'undefined') {
  const dbDir = path.join(process.cwd(), 'database');
  const dbPath = path.join(dbDir, 'poker.db');

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  db = new Database(dbPath, { 
    verbose: process.env.NODE_ENV === 'development' ? console.log : null 
  });

  const initializeDatabase = () => {
    try {
      db.pragma('journal_mode = WAL');
      
      db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL CHECK(role IN ('admin', 'tecnico', 'cliente')),
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS poker_machines (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          model TEXT NOT NULL,
          serial_number TEXT UNIQUE NOT NULL,
          location TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'Operativa' CHECK(status IN ('Operativa', 'En mantenimiento', 'Fuera de servicio')),
          last_maintenance TEXT,
          client_id INTEGER NOT NULL,
          hourly_rate REAL DEFAULT 0,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS machine_reports (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          machine_id TEXT NOT NULL,
          client_id INTEGER NOT NULL,
          description TEXT NOT NULL,
          status TEXT DEFAULT 'Reportada' CHECK(status IN ('Reportada', 'En revisión', 'Reparada', 'Rechazada')),
          severity TEXT DEFAULT 'Media' CHECK(severity IN ('Baja', 'Media', 'Alta', 'Crítica')),
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (machine_id) REFERENCES poker_machines(id) ON DELETE CASCADE,
          FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS machine_requests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          client_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          model TEXT NOT NULL,
          location TEXT NOT NULL,
          reason TEXT NOT NULL,
          status TEXT DEFAULT 'Pendiente' CHECK(status IN ('Pendiente', 'Aprobada', 'Rechazada', 'Completada')),
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS financial_records (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          machine_id TEXT NOT NULL,
          client_id INTEGER NOT NULL,
          session_start TEXT NOT NULL,
          session_end TEXT NOT NULL,
          hours_worked REAL NOT NULL,
          earnings REAL NOT NULL,
          notes TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (machine_id) REFERENCES poker_machines(id) ON DELETE CASCADE,
          FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TRIGGER IF NOT EXISTS update_machine_timestamp
        AFTER UPDATE ON poker_machines
        FOR EACH ROW
        BEGIN
          UPDATE poker_machines SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END;

        CREATE INDEX IF NOT EXISTS idx_machines_client ON poker_machines(client_id);
        CREATE INDEX IF NOT EXISTS idx_machines_status ON poker_machines(status);
        CREATE INDEX IF NOT EXISTS idx_reports_machine ON machine_reports(machine_id);
        CREATE INDEX IF NOT EXISTS idx_reports_client ON machine_reports(client_id);
        CREATE INDEX IF NOT EXISTS idx_financial_machine ON financial_records(machine_id);
        CREATE INDEX IF NOT EXISTS idx_financial_client ON financial_records(client_id);
      `);

      // Insertar datos iniciales
      const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
      
      if (userCount === 0) {
        const users = [
          { name: 'Administrador Casino', email: 'admin@casino.com', password: 'admin123', role: 'admin' },
          { name: 'Técnico Maquinas', email: 'tecnico@casino.com', password: 'tecnico123', role: 'tecnico' },
          { name: 'Casino Las Vegas', email: 'casino@vegas.com', password: 'casino123', role: 'cliente' },
          { name: 'Casino Bellagio', email: 'casino@bellagio.com', password: 'casino456', role: 'cliente' }
        ];

        const insertUser = db.prepare(`
          INSERT INTO users (name, email, password, role)
          VALUES (@name, @email, @password, @role)
        `);

        const transaction = db.transaction(() => {
          for (const user of users) {
            insertUser.run(user);
          }
        });
        transaction();
      }

      const machineCount = db.prepare("SELECT COUNT(*) as count FROM poker_machines").get().count;
      
      if (machineCount === 0) {
        const machines = [
          { 
            id: 'POKER-001', 
            name: 'Máquina de Poker Texas Holdem', 
            model: 'IGT Game King', 
            serial_number: 'GK-2023-001',
            location: 'Sala Principal', 
            status: 'Operativa', 
            last_maintenance: '2023-11-15', 
            client_id: 3, 
            hourly_rate: 150.00 
          },
          { 
            id: 'POKER-002', 
            name: 'Máquina de Poker Omaha', 
            model: 'Bally Pro Wave', 
            serial_number: 'PW-2023-002',
            location: 'Sala VIP', 
            status: 'Operativa', 
            last_maintenance: '2023-11-10', 
            client_id: 3, 
            hourly_rate: 180.00 
          },
          { 
            id: 'POKER-003', 
            name: 'Máquina de Poker 7-Card Stud', 
            model: 'Aristocrat MK6', 
            serial_number: 'MK6-2023-003',
            location: 'Sala Secundaria', 
            status: 'En mantenimiento', 
            last_maintenance: '2023-10-28', 
            client_id: 3, 
            hourly_rate: 120.00 
          },
          { 
            id: 'POKER-004', 
            name: 'Máquina de Poker Caribbean Stud', 
            model: 'IGT S2000', 
            serial_number: 'S2K-2023-004',
            location: 'Sala Principal', 
            status: 'Operativa', 
            last_maintenance: '2023-11-05', 
            client_id: 4, 
            hourly_rate: 200.00 
          },
          { 
            id: 'POKER-005', 
            name: 'Máquina de Video Poker', 
            model: 'Konami Concerto', 
            serial_number: 'KC-2023-005',
            location: 'Bar', 
            status: 'Fuera de servicio', 
            last_maintenance: '2023-09-20', 
            client_id: 4, 
            hourly_rate: 100.00 
          }
        ];

        const insertMachine = db.prepare(`
          INSERT INTO poker_machines 
          (id, name, model, serial_number, location, status, last_maintenance, client_id, hourly_rate)
          VALUES (@id, @name, @model, @serial_number, @location, @status, @last_maintenance, @client_id, @hourly_rate)
        `);

        const transaction = db.transaction(() => {
          for (const machine of machines) {
            insertMachine.run(machine);
          }
        });
        transaction();
      }
    } catch (error) {
      console.error('Error inicializando la base de datos:', error);
      throw error;
    }
  };

  try {
    initializeDatabase();
  } catch (error) {
    console.error('Error crítico al iniciar la base de datos:', error);
    process.exit(1);
  }
} else {
  db = {
    prepare: () => {
      throw new Error('Database operations are not available on the client side');
    }
  };
}

// Funciones para gestión de máquinas de poker
export const getClientMachines = (clientId) => {
  return db.prepare(`
    SELECT id, name, model, status, location, hourly_rate 
    FROM poker_machines 
    WHERE client_id = ?
    ORDER BY status, name
  `).all(clientId);
};

export const getMachineById = (machineId, clientId = null) => {
  if (clientId) {
    return db.prepare(`
      SELECT * FROM poker_machines 
      WHERE id = ? AND client_id = ?
    `).get(machineId, clientId);
  }
  return db.prepare('SELECT * FROM poker_machines WHERE id = ?').get(machineId);
};

export const updateMachineStatus = (machineId, status) => {
  return db.prepare(`
    UPDATE poker_machines 
    SET status = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `).run(status, machineId);
};

export const createMachineReport = (machineId, clientId, description, severity = 'Media') => {
  return db.prepare(`
    INSERT INTO machine_reports 
    (machine_id, client_id, description, severity)
    VALUES (?, ?, ?, ?)
  `).run(machineId, clientId, description, severity);
};

export const getMachineReports = (clientId) => {
  return db.prepare(`
    SELECT r.*, m.name as machine_name 
    FROM machine_reports r
    JOIN poker_machines m ON r.machine_id = m.id
    WHERE r.client_id = ?
    ORDER BY r.created_at DESC
  `).all(clientId);
};

// Funciones para solicitudes de máquinas
export const createMachineRequest = (clientId, name, model, location, reason) => {
  return db.prepare(`
    INSERT INTO machine_requests 
    (client_id, name, model, location, reason)
    VALUES (?, ?, ?, ?, ?)
  `).run(clientId, name, model, location, reason);
};

export const getClientRequests = (clientId) => {
  return db.prepare(`
    SELECT * FROM machine_requests 
    WHERE client_id = ?
    ORDER BY created_at DESC
  `).all(clientId);
};

// Funciones para administradores
export const getAllMachines = () => {
  return db.prepare(`
    SELECT m.*, u.name as client_name, u.email as client_email
    FROM poker_machines m
    JOIN users u ON m.client_id = u.id
    ORDER BY m.client_id, m.status
  `).all();
};

export const getAllReports = () => {
  return db.prepare(`
    SELECT r.*, m.name as machine_name, u.name as client_name
    FROM machine_reports r
    JOIN poker_machines m ON r.machine_id = m.id
    JOIN users u ON r.client_id = u.id
    ORDER BY r.created_at DESC
  `).all();
};

// Funciones de usuarios
export const getUserById = (id) => {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
};

export const getUserByEmail = (email) => {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
};

export const createUser = (userData) => {
  return db.prepare(`
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `).run(userData.name, userData.email, userData.password, userData.role || 'cliente');
};

export default db;