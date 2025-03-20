import Ejercicio from '@/db/models/Ejercicio';
import { Op } from 'sequelize';

// Obtiene un ejercicio por su ID
export async function obtenerPorId(id) {
    return await Ejercicio.findByPk(id); 
}

// Busca ejercicios que contengan la palabra en su nombre
export async function obtenerTodosPorNombreConPalabra(palabra) {
    return await Ejercicio.findAll({
        where: { 
            nombre: { 
                [Op.iLike]: `%${palabra}%` 
            } 
        }
    });
}

// Obtiene todos los ejercicios
export async function obtenerTodos() {
    return await Ejercicio.findAll();
}

// Crea un nuevo ejercicio 
export async function crear(ejercicioParam) { 
    try {
        return await Ejercicio.create(ejercicioParam);
    } catch (error) {
        throw new Error(`Error al crear el ejercicio: ${error.message}`);
    }
}

// Actualiza un ejercicio existente
export async function actualizar(id, data) {
    
    const datosActualizados = {
        ...(data.nombre && { nombre: data.nombre }),
        ...(data.descripcion && { descripcion: data.descripcion }),
        ...(data.link && { link: data.link }),
        ...(data.cantidadSeriesRecomendadas && { cantidadSeriesRecomendadas: data.cantidadSeriesRecomendadas }),
        ...(data.musculoAfectado && { musculoAfectado: data.musculoAfectado }),
        ...(data.divisionRutina && { divisionRutina: data.divisionRutina }),
    };

    // Lógica específica para repeticiones/duración
    if (data.cantidadRepeticionesRecomendadas) {
        datosActualizados.cantidadRepeticionesRecomendadas = data.cantidadRepeticionesRecomendadas;
        datosActualizados.duracion = null;
    } else if (data.duracion) {
        datosActualizados.duracion = data.duracion;
        datosActualizados.cantidadRepeticionesRecomendadas = null;
    }

    try {
        const ejercicio = await Ejercicio.findByPk(id);
        if (!ejercicio) return null;

        const [actualizado] = await Ejercicio.update(
            datosActualizados,
            { where: { id } }
        );

        return [actualizado];
    } catch (error) {
        throw new Error(`Error al actualizar el ejercicio: ${error.message}`);
    }
}

// Elimina un ejercicio
export async function eliminar(id) {
    try {
        return await Ejercicio.destroy({
            where: { id }
        });
    } catch (error) {
        throw new Error(`Error al eliminar el ejercicio: ${error.message}`);
    }
}