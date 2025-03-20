import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';

class Platillo extends Model {}

Platillo.init({
   nombre: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    turno:{
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Platillo',
    tableName: 'Platillos',
});

export default Platillo;
