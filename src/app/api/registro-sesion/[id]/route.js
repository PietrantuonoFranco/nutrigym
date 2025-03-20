import { verifyToken } from '@/lib/utils/checkAuth';
import { 
    obtenerPorId,
    actualizar,
    eliminar 
} from '@/lib/actions/registroDeSesionActions';

export async function GET(request, { params }) {
    const response = await verifyToken(request);
    if (response.status !== 200) return response;

    return obtenerPorId(params.id);
}

export async function PUT(request, { params }) {
    const datos = await request.json();
    return actualizar(params.id, datos);
}

export async function DELETE(request, { params }) {
    return eliminar(params.id);
}

export const runtime = 'nodejs';
