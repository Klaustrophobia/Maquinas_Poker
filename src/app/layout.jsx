// app/layout.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Providers } from './providers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth'; // Cambiado para apuntar a src/auth.js

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="es">
      <body>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}