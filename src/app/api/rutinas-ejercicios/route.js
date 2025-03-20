import { verifyToken } from '@/lib/utils/checkAuth';
import { verifyRole } from '@/lib/utils/checkRol';
import { 
    getAllRelaciones,
    getRelacionesByRutinaId,
    getEjerciciosByRutinaId,
    createRelacion
} from '@/lib/actions/rutinaTieneEjerciciosActions';

export async function GET(request) {

    const response = await verifyToken(request);
    if (response.status !== 200) return response;
    
    const { searchParams } = new URL(request.url);
    const idRutina = searchParams.get('idRutina');
    const idRutinaForEjercicios = searchParams.get('idRutinaForEjercicios');

    if (idRutinaForEjercicios) return getEjerciciosByRutinaId(idRutinaForEjercicios);
    
    return idRutina 
        ? getRelacionesByRutinaId(idRutina)
        : getAllRelaciones();
}

export async function POST(request) {
    
    const response = await verifyRole(request);
    if (response.status !== 200) return response;
    const data = await request.json();
    return await createRelacion(data);
}
export const runtime = 'nodejs';
