import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../lib/db';

class RutinaPdf extends Model {}

RutinaPdf.init({
    pdf: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'RutinaPdf',
    tableName: 'RutinasPdfs',
});

export default RutinaPdf;
