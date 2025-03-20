import PlanAlimenticio from '@/db/models/PlanAlimenticio';
import { Op } from 'sequelize';

// Obtiene un plan alimenticio por su ID
export async function obtenerPorId(id) {
    return await PlanAlimenticio.findByPk(id);
}

// Obtiene un plan alimenticio por su nombre
export async function obtenerPorNombre(nombre) {
    try {
        const planAlimenticio = await PlanAlimenticio.findOne({ where: { nombre } });
        if (!planAlimenticio) {
            throw new Error("No se ha podido encontrar el plan alimenticio");
        }
        return planAlimenticio;
    } catch (error) {
        throw new Error(`Error al buscar plan alimenticio: ${error.message}`);
    }
}

// Obtiene todos los planes alimenticios
export async function obtenerTodos() {
    return await PlanAlimenticio.findAll();
}

// Busca planes alimenticios por palabra en el nombre
export async function obtenerTodosPorNombreConPalabra(palabra) {
    try {
        return await PlanAlimenticio.findAll({
            where: {
                nombre: {
                    [Op.iLike]: `%${palabra}%`
                }
            }
        });
    } catch (error) {
        throw new Error(`Error al buscar planes alimenticios: ${error.message}`);
    }
}

// Crea un nuevo plan alimenticio
export async function crear(planAlimenticioData) {
    try {
        const planAlimenticio = await PlanAlimenticio.create(planAlimenticioData);
        await planAlimenticio.save();
        return planAlimenticio;
    } catch (error) {
        throw new Error(`Error al crear plan alimenticio: ${error.message}`);
    }
}

// Actualiza un plan alimenticio existente
export async function actualizar(id, planAlimenticioData) {
    const datosActualizados = {
        ...(planAlimenticioData.nombre && { nombre: planAlimenticioData.nombre }),
        ...(planAlimenticioData.descripcion && { descripcion: planAlimenticioData.descripcion })
    };

    try {
        const planAlimenticio = await PlanAlimenticio.findByPk(id);
        if (!planAlimenticio) {
            throw new Error('Plan alimenticio no encontrado');
        }

        const [actualizado] = await PlanAlimenticio.update(
            datosActualizados,
            { where: { id } }
        );

        return actualizado;
    } catch (error) {
        throw new Error(`Error al actualizar plan alimenticio: ${error.message}`);
    }
}

// Elimina un plan alimenticio
export async function eliminar(id) {
    try {
        const resultado = await PlanAlimenticio.destroy({
            where: { id }
        });
        if (!resultado) {
            throw new Error('Plan alimenticio no encontrado');
        }
        return resultado;
    } catch (error) {
        throw new Error(`Error al eliminar plan alimenticio: ${error.message}`);
    }
}