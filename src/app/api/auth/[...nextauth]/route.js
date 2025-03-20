import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import Usuario from '@/db/models/Usuario';



const validateCredentials = async (email, password) => {
  try {
    console.log('Intentando validar credenciales para:', email);

    const usuario = await Usuario.findOne({ 
      where: { email },
      raw: false
    });

    if (!usuario) {
      console.log('Usuario no encontrado:', email);
      return null;
    }

    // Solo usamos bcrypt.compare directamente
    const isValid = await bcrypt.compare(password, usuario.contrasenia);
    console.log('Resultado de la validación:', isValid);

    if (!isValid) {
      console.log('Contraseña inválida para usuario:', email);
      return null;
    }

    return {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.idRol
    };

  } catch (error) {
    console.error('Error en validateCredentials:', error);
    return null;
  }
};

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutos
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await validateCredentials(credentials.email, credentials.password);
          if (!user) return null;
          return user;
        } catch (error) {
          console.error("Error en la autenticación:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Creamos el token por primera vez
      if (user) {
        return {
          ...user,
        };
      }

      // Si el token aún es válido, lo devolvemos sin cambios
      return token;
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions); 
export { handler as GET, handler as POST };