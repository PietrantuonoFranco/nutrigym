import { NextResponse } from 'next/server';
import {
    obtenerPorId as obtenerPorIdService,
    obtenerTodos as obtenerTodosService,
    crear as crearService,
    actualizar as actualizarService,
    eliminar as eliminarService
} from '../services/rolService';

// Obtener un rol por su ID
export async function obtenerPorId(id) {
    try {
        const rol = await obtenerPorIdService(id);
        if (!rol) {
            throw new Error('No se ha podido encontrar el rol.');
        }
        return NextResponse.json(rol, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Obtener todos los roles
export async function obtenerTodosLosRoles() {
    try {
        const roles = await obtenerTodosService();
        if (!roles || roles.length === 0) {
            throw new Error('No se han encontrado roles.');
        }
        return NextResponse.json(roles, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Crear un rol
export async function crear(data) {
    try {
        const rol = await crearService(data);
        return NextResponse.json(
            { message: 'Rol creado exitosamente', rol },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        );
    }
}

// Actualizar datos de un rol
export async function actualizar(id, data) {
    try {
        const resultado = await actualizarService(id, data);
        if (resultado === 0) {
            throw new Error('No se ha podido actualizar los datos del rol.');
        }
        return NextResponse.json(
            { message: 'Rol actualizado con éxito.' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Eliminar un rol
export async function eliminar(id) {
    try {
        const resultado = await eliminarService(id);
        if (resultado === 0) {
            throw new Error('No se ha podido encontrar el rol.');
        }
        return NextResponse.json(
            { message: 'Rol eliminado con éxito.' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}