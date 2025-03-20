import { verifyToken } from '@/lib/utils/checkAuth';
import { verifyRole } from '@/lib/utils/checkRol';
import { 
    obtenerPorId,
    actualizar,
    eliminar 
} from '@/lib/actions/planAlimenticioTienePlatillosActions';

export async function GET(request, { params }) {

    const response = await verifyToken(request);
    if (response.status !== 200) return response;
    const { id } = params;
    return obtenerPorId(id);
}

export async function PUT(request, { params }) {

    const response = await verifyRole(request);
    if (response.status !== 200) return response;
    const { id } = params;
    const datos = await request.json();
    return actualizar(id, datos);
}

export async function DELETE(request, { params }) {
    
    const response = await verifyRole(request);
    if (response.status !== 200) return response;
    const { id } = params;
    return eliminar(id);
}

export const runtime = 'nodejs';
