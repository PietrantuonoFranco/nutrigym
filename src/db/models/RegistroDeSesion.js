import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';
import Usuario from './Usuario.js';

class RegistroDeSesion extends Model {}

RegistroDeSesion.init({
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
}, {
    sequelize,  
    modelName: 'RegistroDeSesion',
    tableName: 'RegistrosDeSesiones',
});

Usuario.hasMany(RegistroDeSesion, {
    foreignKey: 'idUsuario',
});

RegistroDeSesion.belongsTo(Usuario, { foreignKey: 'idUsuario' });

export default RegistroDeSesion;