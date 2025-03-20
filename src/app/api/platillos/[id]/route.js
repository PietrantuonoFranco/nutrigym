import { verifyToken } from '@/lib/utils/checkAuth';
import { verifyRole } from '@/lib/utils/checkRol';
import { 
    obtenerPorId,
    actualizar,
    eliminar 
} from '@/lib/actions/platilloActions';

export async function GET(request, { params }) {

    const response = await verifyToken(request);
    if (response.status !== 200) return response;
    return obtenerPorId(params.id);
}

export async function PUT(request, { params }) {

    const response = await verifyRole(request);
    if (response.status !== 200) return response;
    const datos = await request.json();
    return actualizar(params.id, datos);
}

export async function DELETE(request, { params }) {

    const response = await verifyRole(request);
    if (response.status !== 200) return response;
    return eliminar(params.id);
}

export const runtime = 'nodejs';
