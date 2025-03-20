import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';
import Rutina from './Rutina.js';
import Ejercicio from './Ejercicio.js';

class RutinaTieneEjercicios extends Model {}

RutinaTieneEjercicios.init({
    idRutina: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Rutina,
            key: 'id',
        },
    },
    idEjercicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Ejercicio,
            key: 'id',
        },
    },
}, {
    sequelize,  
    modelName: 'RutinaTieneEjercicios',
    tableName: 'RutinasTieneEjercicios',
});

Rutina.hasMany(RutinaTieneEjercicios, { foreignKey: 'idRutina' });
Ejercicio.hasMany(RutinaTieneEjercicios, { foreignKey: 'idEjercicio' });

export default RutinaTieneEjercicios;