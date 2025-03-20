import { NextResponse } from 'next/server';
import {
    obtenerPorId as obtenerPorIdService,
    obtenerPorNombre as obtenerPorNombreService,
    obtenerTodos as obtenerTodosService,
    obtenerTodosPorNombreConPalabra as obtenerTodosPorNombreConPalabraService,
    crear as crearService,
    actualizar as actualizarService,
    eliminar as eliminarService
} from '../services/rutinaService';

// Obtener una rutina por su ID
export async function obtenerRutinaPorId(id) {
    try {
        const rutina = await obtenerPorIdService(id);
        if (!rutina) {
            throw new Error('No se ha podido encontrar la rutina.');
        }
        return NextResponse.json(rutina, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: `Se ha producido un error al obtener la rutina: ${error.message}` },
            { status: 500 }
        );
    }
}

// Obtener una rutina por su nombre
export async function obtenerRutinaPorNombre(nombre) {
    try {
        const rutina = await obtenerPorNombreService(nombre);
        if (!rutina) {
            throw new Error('No se ha podido encontrar la rutina.');
        }
        return NextResponse.json(rutina, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: `Se ha producido un error al obtener la rutina: ${error.message}` },
            { status: 500 }
        );
    }
}

// Obtener todas las rutinas
export async function obtenerTodasLasRutinas() {
    try {
        const rutinas = await obtenerTodosService();
        if (!rutinas || rutinas.length === 0) {
            throw new Error('No se han encontrado rutinas.');
        }
        return NextResponse.json(rutinas, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: `Se ha producido un error al obtener las rutinas: ${error.message}` },
            { status: 500 }
        );
    }
}

// Obtener todas las rutinas por nombre con una palabra determinada
export async function obtenerTodasPorNombreConPalabra(palabra) {
    try {
        const rutinas = await obtenerTodosPorNombreConPalabraService(palabra);
        if (!rutinas || rutinas.length === 0) {
            throw new Error('No se han encontrado rutinas.');
        }
        return NextResponse.json(rutinas, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: `Se ha producido un error al obtener las rutinas: ${error.message}` },
            { status: 500 }
        );
    }
}

// Crear una rutina
export async function crearRutina(data) {
    try {
        const rutina = await crearService(data);
        return NextResponse.json(
            { message: 'Rutina creada exitosamente', rutina },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: `Error al crear la rutina: ${error.message}` },
            { status: 400 }
        );
    }
}

// Actualizar datos de una rutina
export async function actualizarRutina(id, data) {
    try {
        const resultado = await actualizarService(id, data);
        if (resultado === 0) {
            throw new Error('No se ha podido actualizar los datos de la rutina.');
        }
        return NextResponse.json(
            { message: 'Rutina actualizada con éxito.' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: `Se ha producido un error al actualizar los datos de la rutina: ${error.message}` },
            { status: 500 }
        );
    }
}

// Eliminar una rutina
export async function eliminarRutina(id) {
    try {
        const resultado = await eliminarService(id);
        if (resultado === 0) {
            throw new Error('No se ha podido encontrar la rutina.');
        }
        return NextResponse.json(
            { message: 'Rutina eliminada con éxito.' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: `Se ha producido un error al eliminar la rutina: ${error.message}` },
            { status: 500 }
        );
    }
}