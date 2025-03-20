import { verifyToken } from '@/lib/utils/checkAuth';
import { verifyRole } from '@/lib/utils/checkRol';
import { 
    getRelacionById,
    updateRelacion,
    deleteRelacion,
    getEjerciciosByRutinaId
} from '@/lib/actions/rutinaTieneEjerciciosActions';

export async function GET(request, { params }) {

    const response = await verifyToken(request);
    if (response.status !== 200) return response;
    const { searchParams } = new URL(request.url);
    const rutinaId = searchParams.get('rutinaId');

    if (rutinaId) {
        return getEjerciciosByRutinaId(rutinaId);
    } else {
        return getRelacionById(params.id);
    }
}

export async function PUT(request, { params }) {

    const response = await verifyRole(request);
    if (response.status !== 200) return response;
    const datos = await request.json();
    return updateRelacion(params.id, datos);
}

export async function DELETE(request, { params }) {
    
    const response = await verifyRole(request);
    if (response.status !== 200) return response;
    return deleteRelacion(params.id);
}

export const runtime = 'nodejs';
