import { NextResponse } from 'next/server';
import { 
    obtenerPorId as obtenerPorIdService, 
    obtenerTodos as obtenerTodosService, 
    crear as crearService, 
    actualizar as actualizarService, 
    eliminar as eliminarService 
} from '../services/registroDeSesionService';

// Obtener registro por ID
export async function obtenerPorId(id) {
    try {
        const registro = await obtenerPorIdService(id);
        if (!registro) {
            throw new Error('No se ha podido encontrar el registro de sesión.');
        }
        return NextResponse.json(registro, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Obtener todos los registros
export async function obtenerTodos() {
    try {
        const registros = await obtenerTodosService();
        if (!registros || registros.length === 0) {
            throw new Error('No se han encontrado registros de sesión.');
        }
        return NextResponse.json(registros, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Crear registro
export async function crear(data) {
    try {
        const registro = await crearService(data);
        return NextResponse.json(
            { message: 'Registro de sesión creado exitosamente', registro },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        );
    }
}

// Actualizar registro
export async function actualizar(id, data) {
    try {
        const resultado = await actualizarService(id, data);
        if (resultado === 0) {
            throw new Error('No se ha podido actualizar el registro de sesión.');
        }
        return NextResponse.json(
            { message: 'Registro de sesión actualizado exitosamente', resultado },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Eliminar registro
export async function eliminar(id) {
    try {
        const resultado = await eliminarService(id);
        if (resultado === 0) {
            throw new Error('No se ha podido encontrar el registro de sesión.');
        }
        return NextResponse.json(
            { message: 'Registro de sesión eliminado exitosamente' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}