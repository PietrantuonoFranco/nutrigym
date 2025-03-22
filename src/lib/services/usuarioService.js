import Usuario from '@/db/models/Usuario';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';

//_________Obtener un usuario por ID__________________________________
export async function obtenerPorId(id) {
    return await Usuario.findByPk(id);
}

//_________Obtener un usuario por Email__________________________________
export async function obtenerPorEmail(email) {
    return await Usuario.findOne({ where: { email } });
}

//_________Obtener todos los usuarios__________________________________
export async function obtenerTodos() {
    return await Usuario.findAll();
}

//_________Obtener todos los usuarios por nombre o apellido con una palabra determinada__________________________________
export async function obtenerTodosPorNombreConPalabra(palabra) {
    return await Usuario.findAll({
        where: {
            [Op.or]: [
                { nombre: { [Op.iLike]: `%${palabra}%` } },
                { apellido: { [Op.iLike]: `%${palabra}%` } }
            ]
        }
    });
}

//_________Verificar si existe un usuario con el email proporcionado__________________________________
export async function existeUsuarioConMail(email) {
    const usuarioExistente = await obtenerPorEmail(email);
    return !!usuarioExistente;
}

//_________Registrar un nuevo usuario_____________________________________
export async function crear(usuarioParam) {
    try {
        const existe = await existeUsuarioConMail(usuarioParam.email);

        if (existe) {
            throw new Error('El usuario ya existe.');
        }

        // Hasheamos la contraseña antes de crear el usuario
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(usuarioParam.contrasenia, saltRounds);
        
        console.log('Hash generado para nuevo usuario:', hashedPassword);

        // Creamos el usuario con la contraseña ya hasheada
        const usuario = await Usuario.create({
            ...usuarioParam,
            contrasenia: hashedPassword
        });

        console.log('Usuario creado con hash:', {
            email: usuario.email,
            hashAlmacenado: usuario.contrasenia
        });

        return usuario;
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error('El email ya está registrado');
        }
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
}

//_________Actualizar datos de un usuario________________________________
export async function actualizar(id, usuarioParam) {
    if (!usuarioParam || Object.keys(usuarioParam).length === 0) {
        throw new Error("No se proporcionaron datos para actualizar.");
    }

    const datosActualizados = { ...usuarioParam };

    if (usuarioParam.contrasenia) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(usuarioParam.contrasenia, saltRounds);

        datosActualizados.contrasenia = hashedPassword;
    }

    const [actualizado] = await Usuario.update(datosActualizados, { 
        where: { id } 
    });

    return actualizado;
}

//_________Eliminar un usuario________________________________________
export async function eliminar(id) {
    try {
        return await Usuario.destroy({
            where: { id }
        });
    } catch (error) {
        throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
}
