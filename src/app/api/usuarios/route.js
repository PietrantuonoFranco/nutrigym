import { verifyToken } from '@/lib/utils/checkAuth';
import { 
    getAllUsers, 
    getUsersByKeyword,
    createUser 
} from '@/lib/actions/usuarioActions';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const palabra = searchParams.get('palabra');

    const response = await verifyToken(request);
    if (response.status !== 200) return response;

    return palabra 
        ? getUsersByKeyword(palabra)
        : getAllUsers();
}

export async function POST(request) {
    
    const userData = await request.json();
    return createUser(userData);
}

export const runtime = 'nodejs';
