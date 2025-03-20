import { verifyToken } from '@/lib/utils/checkAuth';
import { verifyRole } from '@/lib/utils/checkRol';
import { 
    obtenerTodos,
    obtenerTodosPorNombreConPalabra,
    crear 
} from '@/lib/actions/platilloActions';

export async function GET(request) {

    const response = await verifyToken(request);
    if (response.status !== 200) return response;
    const { searchParams } = new URL(request.url);
    const palabra = searchParams.get('palabra');

    return palabra 
        ? obtenerTodosPorNombreConPalabra(palabra)
        : obtenerTodos();
}

export async function POST(request) {

    const response = await verifyRole(request);
    if (response.status !== 200) return response;
    const platilloData = await request.json();
    return crear(platilloData);
}

export const runtime = 'nodejs';
