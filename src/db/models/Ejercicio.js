import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';

class Ejercicio extends Model {}

Ejercicio.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
    },
    cantidadRepeticionesRecomendadas: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    duracion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cantidadSeriesRecomendadas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    musculoAfectado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    divisionRutina: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    sequelize,
    modelName: 'Ejercicio',
    tableName: 'Ejercicios',
});

export default Ejercicio;