import { verifyToken } from '@/lib/utils/checkAuth';
import { verifyRole } from '@/lib/utils/checkRol';
import { 
    obtenerRutinaPorId,
    actualizarRutina,
    eliminarRutina 
} from '@/lib/actions/rutinaActions';

export async function GET(request, { params }) {

    const response = await verifyToken(request);
    if (response.status !== 200) return response;
    return obtenerRutinaPorId(params.id);
}

export async function PUT(request, { params }) {

    const response = await verifyRole(request);

    if (response.status !== 200) return response;

    const datos = await request.json();
    
    return actualizarRutina(params.id, datos);
}

export async function DELETE(request, { params }) {
        
    const response = await verifyRole(request);
    if (response.status !== 200) return response;
    return eliminarRutina(params.id);
}

export const runtime = 'nodejs';
