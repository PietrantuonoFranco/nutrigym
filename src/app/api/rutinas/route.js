import { verifyToken } from '@/lib/utils/checkAuth';
import { 
    obtenerTodasLasRutinas,
    obtenerTodasPorNombreConPalabra,
    crearRutina 
} from '@/lib/actions/rutinaActions';

export async function GET(request) {
 

    const response = await verifyToken(request);
    if (response.status !== 200) return response;

    const { searchParams } = new URL(request.url);
    const palabra = searchParams.get('palabra');

    return palabra 
        ? obtenerTodasPorNombreConPalabra(palabra)
        : obtenerTodasLasRutinas();
}

export async function POST(request) {
    const response = await verifyToken(request);

    if (response.status !== 200) return response;
    
    const rutinaData = await request.json();
    return crearRutina(rutinaData);
}

export const runtime = 'nodejs';
