import { verifyToken } from '@/lib/utils/checkAuth';
import { verifyRole } from '@/lib/utils/checkRol';
import { 
    getUserById, 
    updateUser, 
    deleteUser 
} from '@/lib/actions/usuarioActions';

export async function GET(request, { params }) {
    return getUserById(params.id);
}

export async function PUT(request, { params }) {

    const response = await verifyToken(request);
    if (response.status !== 200) return response;

    const datos = await request.json();
    return updateUser(params.id, datos);
}

export async function DELETE(request, { params }) {
 

    const responseRole = await verifyRole(request);
    if (responseRole.status !== 200) return responseRole;

    return deleteUser(params.id);
}

export const runtime = 'nodejs';
