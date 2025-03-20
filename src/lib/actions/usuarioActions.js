import { NextResponse } from 'next/server';
import {
    obtenerTodos as obtenerTodosService,
    obtenerTodosPorNombreConPalabra as obtenerTodosPorNombreConPalabraService,
    obtenerPorId as obtenerPorIdService,
    crear as crearService,
    actualizar as actualizarService,
    eliminar as eliminarService
} from '../services/usuarioService';

// Obtener todos los usuarios
export async function getAllUsers() {
    try {
        const usuarios = await obtenerTodosService();
        if (!usuarios || usuarios.length === 0) {
            throw new Error('No se han encontrado usuarios.');
        }
        return NextResponse.json(usuarios, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: `Error al obtener usuarios: ${error.message}` },
            { status: 500 }
        );
    }
}

// Obtener usuarios por palabra clave
export async function getUsersByKeyword(palabra) {
    try {
        const usuarios = await obtenerTodosPorNombreConPalabraService(palabra);
        if (!usuarios || usuarios.length === 0) {
            throw new Error('No se han encontrado usuarios con la palabra clave proporcionada.');
        }
        return NextResponse.json(usuarios, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: `Error al obtener usuarios: ${error.message}` },
            { status: 500 }
        );
    }
}

// Obtener usuario por ID
export async function getUserById(id) {
    try {
        const usuario = await obtenerPorIdService(id);
        if (!usuario) {
            throw new Error('No se ha podido encontrar el usuario.');
        }
        return NextResponse.json(usuario, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: `Error al obtener usuario: ${error.message}` },
            { status: 500 }
        );
    }
}

// Crear usuario
export async function createUser(data) {
    try {
        const usuario = await crearService(data);
        return NextResponse.json(
            { message: 'Usuario registrado exitosamente', usuario },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: `Error al crear usuario: ${error.message}` },
            { status: 400 }
        );
    }
}

// Actualizar usuario
export async function updateUser(id, data) {
    try {
        const resultado = await actualizarService(id, data);
        if (resultado === 0) {
            throw new Error('No se ha podido actualizar el usuario.');
        }
        return NextResponse.json(
            { message: 'Usuario actualizado exitosamente', resultado },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: `Error al actualizar usuario: ${error.message}` },
            { status: 500 }
        );
    }
}

// Eliminar usuario
export async function deleteUser(id) {
    try {
        const resultado = await eliminarService(id);
        if (resultado === 0) {
            throw new Error('No se ha podido encontrar el usuario.');
        }
        return NextResponse.json(
            { message: 'Usuario eliminado exitosamente' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: `Error al eliminar usuario: ${error.message}` },
            { status: 500 }
        );
    }
}