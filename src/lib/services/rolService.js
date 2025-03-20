import Rol from '@/db/models/Rol';


//_________Obtener un rol por su ID_______________________________
export async function obtenerPorId(id) {
    return await Rol.findByPk(id);
}


//_________Obtener todos roles__________________________________
export async function obtenerTodos() {
    return await Rol.findAll();
}


//_________Crear un rol_____________________________________
export async function crear(rolParam) {
    try {
        const rol = await Rol.create(rolParam);
        
        await rol.save();
        
        return rol;
    } catch (error) {
        throw new Error(error.message);
    }
}


//_________Actualizar datos de un rol_____________________________
export async function actualizar(id, rolParam) {
    const datosActualizados = {};

    if (rolParam.nombre) datosActualizados.nombre = rolParam.nombre;

    try {
        const rol = await Rol.findByPk(id);

        if (!rol) {
            throw new Error('Rol no encontrado.');
        }

        const [actualizado] = await Rol.update(
            datosActualizados,
            { where: { id } }
        );

        return actualizado;
    } catch (error) {
        throw new Error('Se ha producido un error al actualizar los datos del rol:' + error);
    }
}


//_________Eliminar un rol________________________________________
export async function eliminar(id) {
    try {
        return await Rol.destroy({
            where: { id }
        });
    } catch (error) {
        throw new Error('Se ha producido un error al eliminar el rol: ' + error );
    }
}