import { NextResponse } from 'next/server';
import {
    obtenerPorId as obtenerPorIdService,
    obtenerPorNombre as obtenerPorNombreService,
    obtenerTodos as obtenerTodosService,
    obtenerTodosPorNombreConPalabra as obtenerTodosPorNombreConPalabraService,
    crear as crearService,
    actualizar as actualizarService,
    eliminar as eliminarService
} from '../services/planAlimenticioService.js';

// Obtener un plan alimenticio por su ID
export async function obtenerPorId(id) {
    try {
        if (!id) throw new Error('Debe ingresar un id por parámetro.');

        const planAlimenticio = await obtenerPorIdService(id);
        if (!planAlimenticio) {
            throw new Error('No se ha podido encontrar el plan alimenticio.');
        }
        return NextResponse.json(planAlimenticio, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Obtener un plan alimenticio por su nombre
export async function obtenerPorNombre(nombre) {
    try {
        if (!nombre) throw new Error('Debe ingresar un nombre por parámetro.');

        const planAlimenticio = await obtenerPorNombreService(nombre);
        if (!planAlimenticio) {
            throw new Error('No se ha podido encontrar el plan alimenticio.');
        }
        return NextResponse.json(planAlimenticio, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Obtener todos los planes alimenticios
export async function obtenerTodos() {
    try {
        const planesAlimenticios = await obtenerTodosService();
        if (!planesAlimenticios || planesAlimenticios.length === 0) {
            throw new Error('No se han encontrado planes alimenticios.');
        }
        return NextResponse.json(planesAlimenticios, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Obtener todos por nombre con una palabra determinada
export async function obtenerTodosPorNombreConPalabra(palabra) {
    try {
        if (!palabra) {
            throw new Error('El parámetro palabra es requerido.');
        }

        const planesAlimenticios = await obtenerTodosPorNombreConPalabraService(palabra);
        if (!planesAlimenticios || planesAlimenticios.length === 0) {
            throw new Error('No se han encontrado planes alimenticios.');
        }
        return NextResponse.json(planesAlimenticios, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Crear un plan alimenticio
export async function crear(data) {
    try {
        const planAlimenticio = await crearService(data);
        return NextResponse.json(
            { message: 'Plan alimenticio creado exitosamente', plan: planAlimenticio },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        );
    }
}

// Actualizar datos de un plan alimenticio
export async function actualizar(id, data) {
    try {
        if (!id) throw new Error('Debe ingresar un id por parámetro.');

        const resultado = await actualizarService(id, data);
        if (resultado === 0) {
            throw new Error('No se ha podido actualizar los datos del plan alimenticio.');
        }
        return NextResponse.json(
            { message: 'Plan alimenticio actualizado con éxito.' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Eliminar un plan alimenticio
export async function eliminar(id) {
    try {
        if (!id) throw new Error('Debe ingresar un id por parámetro.');

        const resultado = await eliminarService(id);
        if (resultado === 0) {
            throw new Error('No se ha podido encontrar el plan alimenticio.');
        }
        return NextResponse.json(
            { message: 'Plan alimenticio eliminado con éxito.' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}