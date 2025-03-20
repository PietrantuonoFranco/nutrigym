import { NextResponse } from 'next/server';
import {
    obtenerPorId as obtenerPorIdService,
    obtenerTodos as obtenerTodosService,
    crear as crearService,
    actualizar as actualizarService,
    eliminar as eliminarService,
    obtenerTodosPorNombreConPalabra as obtenerTodosPorNombreConPalabraService
} from '../services/platilloService';

// Obtener todos los platillos
export async function obtenerTodos() {
    try {
        const platillos = await obtenerTodosService();
        if (!platillos || platillos.length === 0) {
            throw new Error('No se han encontrado platillos.');
        }
        return NextResponse.json(platillos, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Obtener platillo por ID
export async function obtenerPorId(id) {
    try {
        const platillo = await obtenerPorIdService(id);
        if (!platillo) {
            throw new Error('No se ha podido encontrar el platillo.');
        }
        return NextResponse.json(platillo, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Buscar platillos por palabra
export async function obtenerTodosPorNombreConPalabra(palabra) {
    try {
        if (!palabra) {
            throw new Error('La palabra de búsqueda es requerida.');
        }
        const platillos = await obtenerTodosPorNombreConPalabraService(palabra);
        return NextResponse.json(platillos, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Crear platillo
export async function crear(data) {
    try {
        const platillo = await crearService(data);
        return NextResponse.json(
            { message: 'Platillo creado exitosamente', platillo },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        );
    }
}

// Actualizar platillo
export async function actualizar(id, data) {
    try {
        const resultado = await actualizarService(id, data);
        if (resultado === 0) {
            throw new Error('No se ha podido actualizar el platillo.');
        }
        return NextResponse.json(
            { message: 'Platillo actualizado exitosamente', resultado },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Eliminar platillo
export async function eliminar(id) {
    try {
        const resultado = await eliminarService(id);
        if (resultado === 0) {
            throw new Error('No se ha podido encontrar el platillo.');
        }
        return NextResponse.json(
            { message: 'Platillo eliminado exitosamente' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}