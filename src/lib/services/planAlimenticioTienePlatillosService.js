import PlanAlimenticioTienePlatillos from '@/db/models/PlanAlimenticioTienePlatillos';
import Platillo from '@/db/models/Platillo';

// Obtiene una relación por su ID
export async function obtenerPorId(id) {
    return await PlanAlimenticioTienePlatillos.findByPk(id);
}

// Obtiene todas las relaciones
export async function obtenerTodos() {
    return await PlanAlimenticioTienePlatillos.findAll();
}

// Obtiene todas las relaciones por ID de plan alimenticio
export async function obtenerTodosPorIdPlanAlimenticio(id) {
    return await PlanAlimenticioTienePlatillos.findAll({
        where: { idPlanAlimenticio: id },
    });
}

// Obtiene todos los platillos de un plan alimenticio
export async function obtenerTodosPlatillosPorIdPlanAlimenticio(id) {
    try {
        const planesAlimenticiosTienePlatillos = await PlanAlimenticioTienePlatillos.findAll({
            where: { idPlanAlimenticio: id },
            attributes: ['idPlatillo']
        });
    
        if (planesAlimenticiosTienePlatillos.length === 0) {
            throw new Error('No se han encontrado platillos para el plan alimenticio proporcionado.');
        }

        const idPlatillos = planesAlimenticiosTienePlatillos.map(plan => plan.idPlatillo);
        return await Platillo.findAll({ where: { id: idPlatillos }});
    } catch (error) {
        throw new Error(`Error al obtener platillos del plan alimenticio: ${error.message}`);
    }
}

// Crea una nueva relación entre plan alimenticio y platillo
export async function crear(idPlanAlimenticio, idPlatillo) {
    try {
        const planAlimenticioTienePlatillos = await PlanAlimenticioTienePlatillos.create({
            idPlanAlimenticio,
            idPlatillo
        });
        
        await planAlimenticioTienePlatillos.save();
        return planAlimenticioTienePlatillos;
    } catch (error) {
        throw new Error(`Error al crear la relación: ${error.message}`);
    }
}

// Actualiza una relación existente
export async function actualizar(id, relacion) {
    const datosActualizados = {
        ...(relacion.idPlanAlimenticio && { idPlanAlimenticio: relacion.idPlanAlimenticio }),
        ...(relacion.idComida && { idComida: relacion.idComida })
    };

    try {
        const planAlimenticioTienePlatillos = await PlanAlimenticioTienePlatillos.findByPk(id);
        if (!planAlimenticioTienePlatillos) {
            throw new Error('Plan alimenticio tiene comidas no encontrado.');
        }

        const [actualizado] = await PlanAlimenticioTienePlatillos.update(
            datosActualizados,
            { where: { id } }
        );

        return actualizado;
    } catch (error) {
        throw new Error(`Error al actualizar la relación: ${error.message}`);
    }
}

// Elimina una relación
export async function eliminar(id) {
    try {
        return await PlanAlimenticioTienePlatillos.destroy({ 
            where: { id } 
        });
    } catch (error) {
        throw new Error(`Error al eliminar la relación: ${error.message}`);
    }
}
