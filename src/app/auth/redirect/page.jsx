// src/app/auth/redirect/page.jsx
"use client";
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      switch (session.user?.role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'tecnico':
          router.push('/tecnico');
          break;
        case 'cliente':
          router.push('/cliente');
          break;
        default:
          router.push('/auth/login');
      }
    } else if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, session, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Redirigiendo...</span>
        </div>
        <p className="mt-3">Redirigiendo a tu dashboard...</p>
      </div>
    </div>
  );
}