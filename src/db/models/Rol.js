import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';

class Rol extends Model {}

Rol.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Rol',
    tableName: 'Roles',
});

export default Rol;