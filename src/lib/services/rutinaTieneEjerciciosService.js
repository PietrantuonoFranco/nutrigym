import RutinaTieneEjercicios from '@/db/models/RutinaTieneEjercicios';
import Ejercicio from '@/db/models/Ejercicio';

//_________Obtener una rutina tiene ejercicios por su ID_______________________________
export async function obtenerPorId(id) {
    return await RutinaTieneEjercicios.findByPk(id);
}

//_________Obtener todas las rutinas tienen ejercicios______________________________
export async function obtenerTodos() {
    return await RutinaTieneEjercicios.findAll();
}

//_________Obtener todos los ejercicios por el ID de rutina__________________________________
export async function obtenerTodosEjerciciosPorIdRutina(id) {
    try {
        const rutinasTienenEjercicios = await RutinaTieneEjercicios.findAll({
            where: { idRutina: id },
            attributes: ['idEjercicio']
        });
    
        if (rutinasTienenEjercicios.length === 0) {
            throw new Error('No se han encontrado ejercicios para la rutina proporcionada.');
        }

        const idEjercicios = rutinasTienenEjercicios.map(rutinaTieneEjercicio => 
            rutinaTieneEjercicio.idEjercicio
        );
        
        return await Ejercicio.findAll({ 
            where: { id: idEjercicios } 
        });
    } catch (error) {
        throw new Error(`Error al obtener ejercicios de la rutina: ${error.message}`);
    }
}

//_________Obtener todas rutinas tienen ejercicios__________________________________
export async function obtenerTodosPorIdRutina(id) {
    try {
        return await RutinaTieneEjercicios.findAll({
            where: { idRutina: id },
        });
    } catch (error) {
        throw new Error(`Error al obtener ejercicios de la rutina: ${error.message}`);
    }
}

//_________Crear una rutina tiene ejercicios_____________________________________
export async function crear(data) {
    try {
        return await RutinaTieneEjercicios.create(data);
    } catch (error) {
        throw new Error(`Error al crear rutina-ejercicio: ${error.message}`);
    }
}

//_________Actualizar datos de una rutina tiene ejercicios_____________________________
export async function actualizar(id, rutinaEjercicioData) {
    if (!rutinaEjercicioData || Object.keys(rutinaEjercicioData).length === 0) {
        throw new Error("No se proporcionaron datos para actualizar.");
    }

    try {
        const rutinaTieneEjercicios = await RutinaTieneEjercicios.findByPk(id);
        if (!rutinaTieneEjercicios) {
            throw new Error('Rutina-ejercicio no encontrada');
        }

        return await rutinaTieneEjercicios.update({
            idRutina: rutinaEjercicioData.idRutina,
            idEjercicio: rutinaEjercicioData.idEjercicio
        });
    } catch (error) {
        throw new Error(`Error al actualizar rutina-ejercicio: ${error.message}`);
    }
}

//_________Eliminar una rutina tiene ejercicios________________________________________
export async function eliminar(id) {
    try {
        const resultado = await RutinaTieneEjercicios.destroy({
            where: { id }
        });
        if (!resultado) {
            throw new Error('Rutina-ejercicio no encontrada');
        }
        return resultado;
    } catch (error) {
        throw new Error(`Error al eliminar rutina-ejercicio: ${error.message}`);
    }
}