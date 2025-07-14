import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/libs/db';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  useSecureCookies: process.env.NODE_ENV === 'production',
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas
    updateAge: 60 * 60 // 1 hora
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email y contraseña son requeridos');
          }

          const user = db.prepare(`
            SELECT id, name, email, password, role 
            FROM users 
            WHERE email = ?
          `).get(credentials.email.toLowerCase().trim());

          if (!user) {
            throw new Error('Usuario no encontrado');
          }

          // Comparación directa (en producción usar bcrypt)
          if (credentials.password !== user.password) {
            throw new Error('Contraseña incorrecta');
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
          };
        } catch (error) {
          console.error('Error en autenticación:', error.message);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login?error=',
    signOut: '/auth/login'
  }
};

export const handlers = {
  GET: async (req, ctx) => {
    return NextAuth(req, ctx, authOptions);
  },
  POST: async (req, ctx) => {
    return NextAuth(req, ctx, authOptions);
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, handler as default };