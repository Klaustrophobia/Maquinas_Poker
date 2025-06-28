'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"]; // Rutas a tus imágenes

export default function Home() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 font-[family-name:var(--font-geist-sans)] bg-black text-white px-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenido</h1>

      {/* Carrusel */}
      <div className="relative w-full max-w-xl h-64 overflow-hidden rounded-lg shadow-lg">
        <Image
          src={slides[current]}
          alt={`Slide ${current + 1}`}
          fill
          className="object-cover transition duration-500"
          priority
        />
        {/* Botones */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-black/60 hover:bg-black/80 text-white"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-black/60 hover:bg-black/80 text-white"
        >
          ▶
        </button>
      </div>

      <div className="flex gap-4 mt-4">
        <Link href="/login">
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Registrarse
          </button>
        </Link>

      </div>
    </div>
  );
}
