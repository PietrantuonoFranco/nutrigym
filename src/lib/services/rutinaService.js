import Rutina from '@/db/models/Rutina';
import { Op } from 'sequelize';

//_________Obtener una rutina por su id________________________________
export async function obtenerPorId(id) {
    try {
        const rutina = await Rutina.findByPk(id);
        if (!rutina) throw new Error('Rutina no encontrada');
        return rutina;
    } catch (error) {
        throw new Error(`Error al obtener rutina: ${error.message}`);
    }
}

//_________Obtener una rutina por su nombre_______________________________ 
export async function obtenerPorNombre(nombre) { 
    try { 
        const rutina = await Rutina.findOne({ where: { nombre } });  
        if (!rutina) throw new Error('Rutina no encontrada');
        return rutina;
    } catch (error) {
        throw new Error(`Error al buscar rutina por nombre: ${error.message}`); 
    }
}

//_________Obtener todas rutinas__________________________________
export async function obtenerTodos() {
    try {
        return await Rutina.findAll(); 
    } catch (error) {
        throw new Error(`Error al obtener rutinas: ${error.message}`); 
    }
}

//_________Obtener todos por nombre con una palabra determinada__________________________________
export async function obtenerTodosPorNombreConPalabra(palabra) {
    try {
        return await Rutina.findAll({
            where: { 
                nombre: { 
                    [Op.iLike]: `%${palabra}%` 
                } 
            }
        });
    } catch (error) {
        throw new Error(`Error al buscar rutinas por palabra: ${error.message}`);
    }
}

//_________Crear una rutina_____________________________________
export async function crear(rutinaData) {
    try {
        return await Rutina.create(rutinaData);
    } catch (error) {
        throw new Error(`Error al crear rutina: ${error.message}`);
    }
}

//_________Actualizar datos de una rutina_____________________________
export async function actualizar(id, rutinaData) {
    try {
        const rutina = await Rutina.findByPk(id);
        if (!rutina) throw new Error('Rutina no encontrada');

        const datosActualizados = {
            ...(rutinaData.nombre && { nombre: rutinaData.nombre }),
            ...(rutinaData.descripcion && { descripcion: rutinaData.descripcion })
        };

        await rutina.update(datosActualizados);
        return rutina;
    } catch (error) {
        throw new Error(`Error al actualizar rutina: ${error.message}`);
    }
}

//_________Eliminar una rutina________________________________________
export async function eliminar(id) {
    try {
        const rutina = await Rutina.findByPk(id);
        if (!rutina) throw new Error('Rutina no encontrada');
        
        await rutina.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error al eliminar rutina: ${error.message}`);
    }
}
