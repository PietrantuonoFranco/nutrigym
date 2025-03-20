import { verifyToken } from '@/lib/utils/checkAuth';
import { 
    obtenerTodos,
    crear 
} from '@/lib/actions/registroDeSesionActions';

export async function GET() {

    const response = await verifyToken(request);
    if (response.status !== 200) return response;

    return obtenerTodos();
}

export async function POST(request) {
    const registroData = await request.json();
    return crear(registroData);
}

export const runtime = 'nodejs';
