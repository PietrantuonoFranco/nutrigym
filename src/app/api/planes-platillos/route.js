import { verifyToken } from '@/lib/utils/checkAuth';
import { verifyRole } from '@/lib/utils/checkRol';
import { 
    obtenerTodos,
    obtenerTodosPorIdPlanAlimenticio,
    obtenerTodosPlatillosPorIdPlanAlimenticio,
    crear 
} from '@/lib/actions/planAlimenticioTienePlatillosActions';

export async function GET(request) {

    const response = await verifyToken(request);
    if (response.status !== 200) return response;
    const { searchParams } = new URL(request.url);
    const idPlan = searchParams.get('idPlanAlimenticio');
    const includePlatillos = searchParams.get('includePlatillos') === 'true';

    if (idPlan) {
        return includePlatillos 
            ? obtenerTodosPlatillosPorIdPlanAlimenticio(idPlan)
            : obtenerTodosPorIdPlanAlimenticio(idPlan);
    } else {
        return obtenerTodos();
    }
}

export async function POST(request) {
    
    const response = await verifyRole(request);
    if (response.status !== 200) return response;
    const data = await request.json();
    return crear(data.idPlanAlimenticio, data.idPlatillo);
}

export const runtime = 'nodejs';
