import { NextResponse } from 'next/server';
import {
    obtenerPorId as obtenerPorIdService,
    obtenerTodos as obtenerTodosService,
    crear as crearService,
    actualizar as actualizarService,
    eliminar as eliminarService,
    obtenerTodosPorNombreConPalabra as obtenerTodosPorNombreConPalabraService
} from '../services/ejercicioService';

// Obtener todos los ejercicios
export async function obtenerTodos() {
    try {
        const ejercicios = await obtenerTodosService();
        if (!ejercicios || ejercicios.length === 0) {
            throw new Error('No se han encontrado ejercicios.');
        }
        return NextResponse.json(ejercicios, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Obtener ejercicio por ID
export async function obtenerPorId(id) {
    try {
        const ejercicio = await obtenerPorIdService(id);
        if (!ejercicio) {
            throw new Error('No se ha podido encontrar el ejercicio.');
        }
        return NextResponse.json(ejercicio, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Buscar ejercicios por palabra
export async function obtenerTodosPorNombreConPalabra(palabra) {
    try {
        if (!palabra) {
            throw new Error('La palabra de búsqueda es requerida.');
        }
        const ejercicios = await obtenerTodosPorNombreConPalabraService(palabra);
        return NextResponse.json(ejercicios, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Crear ejercicio
export async function crear(data) {
    try {
        const ejercicio = await crearService(data);
        return NextResponse.json(
            { message: 'Ejercicio creado exitosamente', ejercicio },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        );
    }
}

// Actualizar ejercicio
export async function actualizar(id, data) {
    try {
        const resultado = await actualizarService(id, data);
        if (resultado === 0) {
            throw new Error('No se ha podido actualizar el ejercicio.');
        }
        return NextResponse.json(
            { message: 'Ejercicio actualizado exitosamente', resultado },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Eliminar ejercicio
export async function eliminar(id) {
    try {
        const resultado = await eliminarService(id);
        if (resultado === 0) {
            throw new Error('No se ha podido encontrar el ejercicio.');
        }
        return NextResponse.json(
            { message: 'Ejercicio eliminado exitosamente' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}