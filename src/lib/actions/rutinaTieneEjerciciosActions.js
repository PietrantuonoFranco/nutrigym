import { NextResponse } from 'next/server';
import {
    obtenerPorId as obtenerPorIdService,
    obtenerTodos as obtenerTodosService,
    obtenerTodosEjerciciosPorIdRutina as obtenerTodosEjerciciosPorIdRutinaService,
    obtenerTodosPorIdRutina as obtenerTodosPorIdRutinaService,
    crear as crearService,
    actualizar as actualizarService,
    eliminar as eliminarService
} from '../services/rutinaTieneEjerciciosService';

// Obtener relación por ID
export async function getRelacionById(id) {
    try {
        const relacion = await obtenerPorIdService(id);
        if (!relacion) {
            throw new Error('No se ha podido encontrar la relación rutina-ejercicio.');
        }
        return NextResponse.json(relacion, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: `Error al obtener relación: ${error.message}` },
            { status: 500 }
        );
    }
}

// Obtener todas las relaciones
export async function getAllRelaciones() {
    try {
        const relaciones = await obtenerTodosService();
        if (!relaciones || relaciones.length === 0) {
            throw new Error('No se han encontrado relaciones rutina-ejercicio.');
        }
        return NextResponse.json(relaciones, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: `Error al obtener relaciones: ${error.message}` },
            { status: 500 }
        );
    }
}

// Obtener ejercicios por ID de rutina
export async function getEjerciciosByRutinaId(idRutina) {
    try {
        const ejercicios = await obtenerTodosEjerciciosPorIdRutinaService(idRutina);
        if (!ejercicios || ejercicios.length === 0) {
            throw new Error('No se han encontrado ejercicios para la rutina proporcionada.');
        }
        return NextResponse.json(ejercicios, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: `Error al obtener ejercicios de la rutina: ${error.message}` },
            { status: 500 }
        );
    }
}

// Obtener relaciones por ID de rutina
export async function getRelacionesByRutinaId(idRutina) {
    try {
        const relaciones = await obtenerTodosPorIdRutinaService(idRutina);
        if (!relaciones || relaciones.length === 0) {
            throw new Error('No se han encontrado ejercicios para la rutina proporcionada.');
        }
        return NextResponse.json(relaciones, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: `Error al obtener relaciones de la rutina: ${error.message}` },
            { status: 500 }
        );
    }
}

// Crear nueva relación
export async function createRelacion(data) {
    try {
        const relacion = await crearService(data);
        if (!relacion) {
            throw new Error('Error al crear la relación rutina-ejercicio.');
        }
        return NextResponse.json(
            { message: 'Relación creada exitosamente', relacion },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: `Error al crear relación: ${error.message}` },
            { status: 400 }
        );
    }
}

// Actualizar relación
export async function updateRelacion(id, data) {
    try {
        const resultado = await actualizarService(id, data);
        if (resultado === 0) {
            throw new Error('No se ha podido actualizar la relación rutina-ejercicio.');
        }
        return NextResponse.json(
            { message: 'Relación actualizada exitosamente', resultado },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: `Error al actualizar relación: ${error.message}` },
            { status: 500 }
        );
    }
}

// Eliminar relación
export async function deleteRelacion(id) {
    try {
        const resultado = await eliminarService(id);
        if (resultado === 0) {
            throw new Error('No se ha podido encontrar la relación rutina-ejercicio.');
        }
        return NextResponse.json(
            { message: 'Relación eliminada exitosamente' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: `Error al eliminar relación: ${error.message}` },
            { status: 500 }
        );
    }
}