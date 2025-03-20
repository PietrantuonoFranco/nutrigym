import Platillo from '@/db/models/Platillo';
import { Op } from 'sequelize';

// Obtiene un platillo por su ID
export async function obtenerPorId(id) {
    return await Platillo.findByPk(id);
}

// Obtiene todos los platillos
export async function obtenerTodos() {
    return await Platillo.findAll();
}

// Busca platillos que contengan la palabra en su nombre
export async function obtenerTodosPorNombreConPalabra(palabra) {
    try {
        return await Platillo.findAll({
            where: { 
                nombre: { 
                    [Op.iLike]: `%${palabra}%` 
                } 
            }
        });
    } catch (error) {
        throw new Error(`Error al obtener platillos: ${error.message}`);
    }
}

// Crea un nuevo platillo
export async function crear(platilloParam) {
    try {
        const platillo = await Platillo.create(platilloParam);
        await platillo.save();
        return platillo;
    } catch (error) {
        throw new Error(`Error al crear platillo: ${error.message}`);
    }
}

// Actualiza los datos de un platillo existente
export async function actualizar(id, platilloParam) {
    const datosActualizados = {
        ...(platilloParam.nombre && { nombre: platilloParam.nombre }),
        ...(platilloParam.turno && { turno: platilloParam.turno })
    };

    try {
        const platillo = await Platillo.findByPk(id);
        if (!platillo) {
            throw new Error('Platillo no encontrado');
        }

        const [actualizado] = await Platillo.update(
            datosActualizados,
            { where: { id } }
        );

        return actualizado;
    } catch (error) {
        throw new Error(`Error al actualizar platillo: ${error.message}`);
    }
}

// Elimina un platillo por su ID
export async function eliminar(id) {
    try {
        const resultado = await Platillo.destroy({
            where: { id }
        });
        return resultado;
    } catch (error) {
        throw new Error(`Error al eliminar platillo: ${error.message}`);
    }
}