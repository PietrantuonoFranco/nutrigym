import { getPdfById, getAllPdfs, createPdf, updatePdf, deletePdf } from '@/lib/actions/rutinaPdfActions';
import { verifyToken } from '@/lib/utils/checkAuth';
import { verifyRole } from '@/lib/utils/checkRol';
// Obtener PDF por ID o todos los PDFs
export async function GET(request) {

    const response = await verifyToken(request);
    if (response.status !== 200) return response;
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        return await getPdfById(id);
    } else {
        return await getAllPdfs();
    }
}

// Crear nuevo PDF
export async function POST(request) {
    const data = await request.json();
    return await createPdf(data);
}

// Actualizar PDF
export async function PUT(request) {

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const data = await request.json();

    if (id) {
        return await updatePdf(id, data);
    } else {
        return NextResponse.json({
            success: false,
            message: 'ID es requerido para actualizar la rutina PDF.'
        });
    }
}

// Eliminar PDF
export async function DELETE(request) {

    const response = await verifyRole(request);
    if (response.status !== 200) return response;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        return await deletePdf(id);
    } else {
        return NextResponse.json({
            success: false,
            message: 'ID es requerido para eliminar la rutina PDF.'
        });
    }
}

export const runtime = 'nodejs';
