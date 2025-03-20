import { verifyToken } from '@/lib/utils/checkAuth';
import { 
    obtenerTodosLosRoles,
    crear 
} from '@/lib/actions/rolActions';

export async function GET() {
    const response = await verifyToken(request);
    if (response.status !== 200) return response;
    return obtenerTodosLosRoles();
}

export async function POST(request) {
    const rolData = await request.json();
    return crear(rolData);
}

export const runtime = 'nodejs';
