import RegistroDeSesion from '@/db/models/RegistroDeSesion';

/**
 * Obtiene un registro de sesión específico por su ID
 * @param {number} id - ID del registro a buscar
 * @returns {Promise<Object>} Registro de sesión encontrado
 */
export async function obtenerPorId(id) {
    try {
        const registro = await RegistroDeSesion.findByPk(id);
        if (!registro) {
            throw new Error('Registro de sesión no encontrado');
        }
        return registro;
    } catch (error) {
        throw new Error(`Error al obtener registro de sesión: ${error.message}`);
    }
}

/**
 * Obtiene todos los registros de sesión
 * @returns {Promise<Array>} Lista de todos los registros
 */
export async function obtenerTodos() {
    try {
        return await RegistroDeSesion.findAll();
    } catch (error) {
        throw new Error(`Error al obtener registros de sesión: ${error.message}`);
    }
}

/**
 * Crea un nuevo registro de sesión
 * @param {Object} regSessionParam - Datos del registro a crear
 * @returns {Promise<Object>} Registro creado
 */
export async function crear(regSessionParam) {
    try {
        const registroDeSesion = await RegistroDeSesion.create(regSessionParam);
        await registroDeSesion.save();
        return registroDeSesion;
    } catch (error) {
        throw new Error(`Error al crear registro de sesión: ${error.message}`);
    }
}

/**
 * Actualiza un registro de sesión existente
 * @param {number} id - ID del registro a actualizar
 * @param {Object} regSessionParam - Nuevos datos del registro
 * @returns {Promise<Object>} Resultado de la actualización
 */
export async function actualizar(id, regSessionParam) {
    // Solo actualizamos los campos que vienen en el request
    const datosActualizados = {
        ...(regSessionParam.fecha && { fecha: regSessionParam.fecha }),
        ...(regSessionParam.hora && { hora: regSessionParam.hora }),
        ...(regSessionParam.idUsuario && { idUsuario: regSessionParam.idUsuario })
    };

    try {
        const registroDeSesion = await RegistroDeSesion.findByPk(id);
        if (!registroDeSesion) {
            throw new Error('Registro de sesión no encontrado');
        }

        const [actualizado] = await RegistroDeSesion.update(
            datosActualizados,
            { where: { id } }
        );

        return actualizado;
    } catch (error) {
        throw new Error(`Error al actualizar registro de sesión: ${error.message}`);
    }
}

/**
 * Elimina un registro de sesión
 * @param {number} id - ID del registro a eliminar
 * @returns {Promise<boolean>} true si se eliminó correctamente
 */
export async function eliminar(id) {
    try {
        const resultado = await RegistroDeSesion.destroy({
            where: { id }
        });

        if (resultado === 0) {
            throw new Error('Registro de sesión no encontrado');
        }

        return true;
    } catch (error) {
        throw new Error(`Error al eliminar registro de sesión: ${error.message}`);
    }
}