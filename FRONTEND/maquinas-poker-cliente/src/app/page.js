"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

const routesInfo = {
  Inventario: "Consulta su ubicación exacta, estado operativo y necesidades de mantenimiento. Registra entradas, salidas y traslados para una administración eficiente y actualizada.",
  Finanzas: "Registra ingresos diarios, mensuales y anuales por máquina. Obtén reportes precisos con márgenes de ganancia y análisis comparativos.",
  Clientes: "Gestiona información de contacto, historial de servicios, reportes recibidos y solicitudes de asistencia. Mejora la atención y la fidelización de tus clientes.",
  Ayuda: "Nuestro equipo está listo para ayudarte en todo momento.\n •Correo: soporte@techtitan.com\nTeléfono / • WhatsApp: +504 9232-2344\nTambién puedes usar el botón de Contactar Soporte en la parte inferior derecha para escribirnos directamente.",
  Empresa: `Tech Titan es una empresa enfocada en ofrecer soluciones inteligentes para la gestión de máquinas de póker.\n 
  Combinamos innovación tecnológica con atención personalizada para optimizar procesos como inventario, finanzas y mantenimiento. Contamos con un equipo multidisciplinario comprometido con la mejora continua, la seguridad y el crecimiento de nuestros clientes.`
};


export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeInfo, setActiveInfo] = useState(null);


  const modules = [
    "Inventario: Ubicación, estado y control en tiempo real de todas tus máquinas.",
    "Finanzas: Registro y análisis detallado de ingresos y rentabilidad.",
    "Calidad: Mantenimiento preventivo y correctivo para máxima eficiencia.",
    "Informes: Dashboards y reportes inteligentes para tomar decisiones estratégicas.",
    "Servicios de Campo: Órdenes de trabajo y asistencia técnica desde dispositivos móviles.",
  ];

  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-geist-sans)]">
      {/* Navbar */}
      <nav className="bg-neutral-900 shadow-sm py-4 px-6 flex items-center justify-between relative z-20 md:px-8 lg:px-16">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/TT.png"
            alt="Tech Titan Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-2xl font-bold text-blue-400 cursor-pointer">MaquinasPoker</span>
        </Link>


        <div className="hidden md:flex flex-row items-center gap-6 relative">
          {Object.entries(routesInfo).map(([route, description]) => (
            <div
              key={route}
              className="relative"
              onMouseEnter={() => setActiveInfo(route)}
              onMouseLeave={() => setActiveInfo(null)}
            >
              <button className="text-gray-300 hover:text-blue-400 transition-colors">
                {route}
              </button>

              {activeInfo === route && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white text-black text-sm shadow-lg rounded p-3 z-50">
                  {description}
                </div>
              )}
            </div>
          ))}
        </div>





        <div className="hidden md:flex items-center gap-4">
          <span className="text-gray-400">(+504) 9232-2344</span>
          <Link href="/login" className="text-gray-300 hover:text-blue-400">Iniciar sesión</Link>
          <Link href="/login">
            <button className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition-colors shadow">
              Registrarse
            </button>
          </Link>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full bg-neutral-900 shadow-lg py-4 z-10">
          <div className="flex flex-col items-center gap-4">
            {["productos", "sectores", "clientes", "recursos", "ayuda", "empresa"].map((route) => (
              <Link key={route} href={`/${route}`} className="text-gray-300 hover:text-blue-400 py-2">
                {route[0].toUpperCase() + route.slice(1)}
              </Link>
            ))}
            <Link href="/login" className="text-gray-300 hover:text-blue-400">Iniciar sesión</Link>
            <Link href="/login">
              <button className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition-colors shadow">
                Registrarse
              </button>
            </Link>
            <span className="text-gray-400 mt-2">(+34) 800 300 229</span>
          </div>
        </div>
      )}

      {/* Hero */}
      <main className="relative flex flex-col lg:flex-row items-center justify-center p-8 lg:p-16 gap-8 bg-black min-h-[calc(100vh-64px)] overflow-hidden">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl z-10 relative">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-400 leading-tight mb-6">
            Máquinas de Póker
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl">
            Optimiza la operación de tus máquinas de póker con un sistema inteligente, modular y centralizado.
            Esta plataforma fue diseñada para controlar y analizar cada aspecto del negocio, desde el inventario 
            hasta las finanzas, la calidad del servicio y la gestión técnica en campo
          </p>
          <div className="flex justify-center">
            <Link href="/login">
              <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-lg">
                Registrarse
              </button>
            </Link>
          </div>

        </div>

        {/* Imagen */}
        <div className="relative w-full lg:w-1/2 h-80 sm:h-96 lg:h-[450px] rounded-2xl shadow-xl overflow-hidden flex items-center justify-center bg-gray-200">
            <Image
                src="/Poker.jpg" // RUTA DE TU IMAGN
                alt="Máquina de Póker"
                fill 
                className="object-cover" 
                priority 
            />
        </div>
      </main>

      {/* Módulos */}
      <section className="py-16 px-8 lg:px-16 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Módulos del sistema:</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            {modules.map((module, index) => (
              <li key={index} className="flex items-start bg-neutral-800 p-4 rounded-lg shadow-sm">
                <span className="text-green-400 font-bold mr-3 text-xl">✓</span>
                {module}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Soporte flotante */}
      <a
        href="#"
        className="fixed bottom-6 right-6 bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-colors flex items-center gap-2 font-semibold z-30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        Contactar Soporte
      </a>
    </div>
  );
}
