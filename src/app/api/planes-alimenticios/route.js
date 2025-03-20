import { verifyToken } from '@/lib/utils/checkAuth';
import { verifyRole } from '@/lib/utils/checkRol';
import { 
    obtenerTodos,
    obtenerPorNombre,
    obtenerTodosPorNombreConPalabra,
    crear 
} from '@/lib/actions/planAlimenticioActions';
//import { obtenerTodosPorNombreConPalabra } from '@/lib/services/planAlimenticioService';

export async function GET(request) {

    const response = await verifyToken(request);
    if (response.status !== 200) return response;
    const { searchParams } = new URL(request.url);
    const palabra = searchParams.get('palabra');
    const nombre = searchParams.get('nombre');

    if (nombre) return obtenerPorNombre(nombre);

    return palabra 
        ? obtenerTodosPorNombreConPalabra(palabra)
        : obtenerTodos();
}

export async function POST(request) {

    const response = await verifyRole(request);
    if (response.status !== 200) return response;
    const planData = await request.json();
    return crear(planData);
}

export const runtime = 'nodejs';
