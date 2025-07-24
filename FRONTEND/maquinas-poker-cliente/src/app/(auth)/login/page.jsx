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
        console.log('user', user);
        switch (user.rol) {
          case 'admin':
            router.push('/admin');
            break;
          case 'cliente':
            router.push('/cliente');
            break;
          case 'tecnico':
            router.push('/tecnico');
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
  <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
    <div className="bg-gray-50 p-8 pt-16 rounded-lg shadow-lg w-full max-w-md relative border border-gray-200">
      {/* Botón para volver al inicio */}
      <Link
        href="/"
        className="absolute top-4 left-4 text-blue-600 hover:text-blue-700 font-semibold"
      >
        ← Volver al inicio
      </Link>

      {/* Título principal */}
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Inicio de Sesión
      </h1>

      {/* Mensaje de error si las credenciales son inválidas */}
      {error && (
        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Campo para el correo electrónico */}
        <div className="mb-5">
          <label className="block mb-2 text-gray-700" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200"
            required
          />
        </div>

        {/* Campo para la contraseña */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-700" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200"
            required
          />
        </div>

        {/* Botón para enviar el formulario */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  </div>
);
}
