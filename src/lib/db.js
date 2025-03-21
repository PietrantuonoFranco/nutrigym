import { Sequelize } from 'sequelize';
import * as pg from 'pg';

const config = {
    dialect: 'postgres',
    dialectModule: pg,
    logging: console.log,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const sequelize = new Sequelize(process.env.POSTGRES_URL, config); //Cliente de sequelize

// Función para probar la conexión
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión establecida con la base de datos');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
    }
};

// Ejecutar el test de conexión
testConnection();

export { sequelize };
export default sequelize;