import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';
import PlanAlimenticio from './PlanAlimenticio';
import Platillo from './Platillo';

class PlanAlimenticioTienePlatillos extends Model {}

PlanAlimenticioTienePlatillos.init({
    idPlanAlimenticio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PlanAlimenticio,
            key: 'id',
        },
    },
    idPlatillo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Platillo,
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'PlanAlimenticioTienePlatillos',
    tableName: 'PlanesAlimenticiosTienePlatillos',
});

PlanAlimenticio.hasMany(PlanAlimenticioTienePlatillos, { foreignKey: 'idPlanAlimenticio' });
Platillo.hasMany(PlanAlimenticioTienePlatillos, { foreignKey: 'idPlatillo' });

export default PlanAlimenticioTienePlatillos;