import RutinaPdf from '@/db/models/RutinaPdf';

// Obtener una rutina pdf por su ID
export async function obtenerPorId(id) {
    return await RutinaPdf.findByPk(id);
}

// Obtener todas las rutinas pdf
export async function obtenerTodos() {
    return await RutinaPdf.findAll();
}

// Crear una rutina pdf
export async function crear(rutinaPdfParam) {
    try {
        const rutinaPdf = await RutinaPdf.create(rutinaPdfParam);
        return rutinaPdf;
    } catch (error) {
        throw new Error('Se ha producido un error al crear la rutina PDF: ' + error.message);
    }
}

// Actualizar datos de una rutina pdf
export async function actualizar(id, rutinaPdfParam) {
    const datosActualizados = {};

    if (rutinaPdfParam.pdf) datosActualizados.pdf = rutinaPdfParam.pdf;
    if (rutinaPdfParam.nombre) datosActualizados.nombre = rutinaPdfParam.nombre;

    try {
        const rutinaPdf = await RutinaPdf.findByPk(id);

        if (!rutinaPdf) {
            throw new Error('Rutina pdf no encontrada.');
        }

        const [actualizado] = await RutinaPdf.update(
            datosActualizados,
            { where: { id } }
        );

        return actualizado;
    } catch (error) {
        throw new Error('Se ha producido un error al actualizar los datos de la rutina pdf: ' + error);
    }
}

// Eliminar una rutina pdf
export async function eliminar(id) {
    try {
        const resultado = await RutinaPdf.destroy({
            where: { id }
        });

        return resultado;
    } catch (error) {
        throw new Error('Se ha producido un error al eliminar la rutina pdf: ' + error);
    }
}