import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';

class PlanAlimenticio extends Model {}

PlanAlimenticio.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'PlanAlimenticio',
    tableName: 'PlanesAlimenticios',
});

export default PlanAlimenticio;
