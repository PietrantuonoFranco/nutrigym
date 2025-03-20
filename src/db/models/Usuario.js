import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';
import Rol from './Rol';
import RutinaPdf from './RutinaPdf';

class Usuario extends Model {}

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "El email debe tener un formato válido"
            }
        }
    },
    contrasenia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Rol,
            key: 'id'
        }
    },
    idRutinaPdf: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: RutinaPdf,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios',
    timestamps: true
});

// Definimos las relaciones
Usuario.belongsTo(Rol, { 
    foreignKey: 'idRol',
    as: 'rol'
});

Usuario.belongsTo(RutinaPdf, { 
    foreignKey: 'idRutinaPdf',
    as: 'rutinaPdf',
    constraints: false
});

export default Usuario;
