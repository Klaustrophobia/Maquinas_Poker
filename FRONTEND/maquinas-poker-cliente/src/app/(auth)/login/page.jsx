'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        login(user);

        switch (user.role) {
          case 'admin':
            router.push('/admin');
            break;
          case 'client':
            router.push('/client');
            break;
          case 'technician':
            router.push('/technician');
            break;
          default:
            router.push('/');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error en la autenticación');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md relative">
        {/* Botón Volver al inicio */}
        <Link
          href="/"
          className="absolute top-4 left-4 text-blue-400 hover:text-blue-600 font-semibold"          >
          ← Volver al inicio
        </Link>

        <h1 className="text-2xl font-bold mb-6 text-center">Inicio de Sesión</h1>

        {error && (
          <div className="mb-4 p-2 bg-red-500 text-white rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
