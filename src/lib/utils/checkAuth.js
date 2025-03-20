import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Middleware para verificar el token
export async function verifyToken(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Si el token no es válido, redirigir a la página de cuenta
  if (!token) {
    return Response.json({ message: 'DEBES INICIAR SESION' }, { status: 401 });
  }
  console.log(token);
  return NextResponse.next();
}