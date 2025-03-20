import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Middleware para verificar el rol
export async function verifyRole(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Si el token no es válido, redirigir al login
  if (!token) {
    return NextResponse.json('NO TIENES PERMISOS', { status: 401 });
  }

  // Verificar el rol del usuario
  const userRole = token.id; // Asumiendo que el rol del usuario está en el token
  if (userRole !== 1) {
    return NextResponse.json('NO TIENES PERMISOS', { status: 403 });
  }
  console.log('PERMISOS DE ADMINISTRADOR', token);
  return NextResponse.next();
}