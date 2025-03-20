import { NextResponse } from 'next/server';
import {
    obtenerPorId,
    obtenerTodos,
    crear,
    actualizar,
    eliminar
} from '../services/rutinaPdfService';

// Obtener PDF por ID
export async function getPdfById(id) {
    try {
        const rutinaPdf = await obtenerPorId(id);
        if (!rutinaPdf) {
            return NextResponse.json({
                success: false,
                message: 'No se ha podido encontrar la rutina PDF.'
            });
        }
        console.log("ENCONTRADO");
        return NextResponse.json({
            success: true,
            data: rutinaPdf
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Error al obtener rutina PDF: ${error.message}`
        });
    }
}

// Obtener todos los PDFs
export async function getAllPdfs() {
    try {
        const rutinasPdf = await obtenerTodos();
        if (!rutinasPdf || rutinasPdf.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'No se han encontrado rutinas PDF.'
            });
        }
        return NextResponse.json({
            success: true,
            data: rutinasPdf
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Error al obtener rutinas PDF: ${error.message}`
        });
    }
}

// Crear nuevo PDF
export async function createPdf(data) {
    try {
        const { pdf, nombre } = data;

        if (!pdf) {
            return NextResponse.json({
                success: false,
                message: 'La URL del PDF es requerida.'
            });
        }

        if (!nombre) {
            return NextResponse.json({
                success: false,
                message: 'El nombre del PDF es requerido.'
            });
        }

        const rutinaPdf = await crear(data);
        
        if (!rutinaPdf) {
            return NextResponse.json({
                success: false,
                message: 'Error al crear la rutina PDF.'
            });
        }

        return NextResponse.json({
            success: true,
            data: {
                id: rutinaPdf.id,
                pdf: rutinaPdf.pdf,
                nombre: rutinaPdf.nombre
            }
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Error al crear rutina PDF: ${error.message}`
        });
    }
}

// Actualizar PDF
export async function updatePdf(id, data) {
    try {
        const resultado = await actualizar(id, data);
        if (resultado === 0) {
            return NextResponse.json({
                success: false,
                message: 'No se ha podido actualizar la rutina PDF.'
            });
        }
        return NextResponse.json({
            success: true,
            data: resultado
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Error al actualizar rutina PDF: ${error.message}`
        });
    }
}

// Eliminar PDF
export async function deletePdf(id) {
    try {
        const resultado = await eliminar(id);
        if (resultado === 0) {
            return NextResponse.json({
                success: false,
                message: 'No se ha podido encontrar la rutina PDF.'
            });
        }
        return NextResponse.json({
            success: true,
            message: 'Rutina PDF eliminada correctamente.'
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Error al eliminar rutina PDF: ${error.message}`
        });
    }
}