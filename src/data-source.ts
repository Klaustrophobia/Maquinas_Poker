import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_SERVER || 'localhost',
  port: 8605,
  username: process.env.DB_USERNAME || 'sa',
  password: process.env.DB_PASSWORD || 'Passjosue258456/*',
  database: process.env.DB_DATABASE || 'gestion_maquinas_poker',
  // Directorio donde TypeORM mapeará las entidades
  entities: [User],
  synchronize: process.env.NODE_ENV !== 'production', // Sincronizar entidades solo en desarrollo
  logging: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'], // Habilitar logging solo en desarrollo
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
});

export const getDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    try{
        await AppDataSource.initialize();
        console.log('AppDataSource inicializado exitosamente');
    } catch (error) {
        console.error('Error inicializando TypeORM DataSource:', error);
        throw error;
    }
  }
  return AppDataSource;
}