import { NextResponse } from 'next/server';
import {
    obtenerPorId as obtenerPorIdService,
    actualizar as actualizarService,
    eliminar as eliminarService,
    obtenerTodos as obtenerTodosService,
    obtenerTodosPorIdPlanAlimenticio as obtenerTodosPorIdPlanAlimenticioService,
    obtenerTodosPlatillosPorIdPlanAlimenticio as obtenerTodosPlatillosPorIdPlanAlimenticioService,
    crear as crearService
} from '../services/planAlimenticioTienePlatillosService';

// Obtener una relación por su ID
export async function obtenerPorId(id) {
    try {
        const relacion = await obtenerPorIdService(id);
        if (!relacion) {
            throw new Error('Relación no encontrada');
        }
        return NextResponse.json(relacion, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Actualizar una relación
export async function actualizar(id, datos) {
    try {
        const resultado = await actualizarService(id, datos);
        return NextResponse.json({
            message: 'Relación actualizada exitosamente',
            relacion: resultado
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        );
    }
}

// Eliminar una relación
export async function eliminar(id) {
    try {
        await eliminarService(id);
        return NextResponse.json({
            message: 'Relación eliminada exitosamente'
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        );
    }
}

// Obtener todas las relaciones
export async function obtenerTodos() {
    try {
        const relaciones = await obtenerTodosService();
        if (!relaciones || relaciones.length === 0) {
            throw new Error('No se han encontrado relaciones.');
        }
        return NextResponse.json(relaciones, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Obtener todas las relaciones por ID de plan alimenticio
export async function obtenerTodosPorIdPlanAlimenticio(idPlanAlimenticio) {
    try {
        const relaciones = await obtenerTodosPorIdPlanAlimenticioService(idPlanAlimenticio);
        if (!relaciones || relaciones.length === 0) {
            throw new Error('No se han encontrado relaciones para el plan alimenticio proporcionado.');
        }
        return NextResponse.json(relaciones, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Obtener todos los platillos por ID de plan alimenticio
export async function obtenerTodosPlatillosPorIdPlanAlimenticio(idPlanAlimenticio) {
    try {
        const platillos = await obtenerTodosPlatillosPorIdPlanAlimenticioService(idPlanAlimenticio);
        if (!platillos || platillos.length === 0) {
            throw new Error('No se han encontrado platillos para el plan alimenticio proporcionado.');
        }
        return NextResponse.json(platillos, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Crear una nueva relación
export async function crear(idPlanAlimenticio, idPlatillo) {
    try {
        const relacion = await crearService(idPlanAlimenticio, idPlatillo);
        return NextResponse.json(
            { message: 'Relación creada exitosamente', relacion },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        );
    }
}