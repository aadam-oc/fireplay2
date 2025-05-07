'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="px-4 md:px-12 py-10 space-y-20">
      {/* Hero */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Bienvenido a <span className="text-blue-600">Fireplay</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
          Tu tienda digital de videojuegos favorita.
        </p>
        <Link
          href="/games"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
        >
          Explorar juegos
        </Link>
      </section>

      {/* ¿Qué es Fireplay? */}
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">¿Qué es Fireplay?</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Es una tienda virtual donde puedes descubrir videojuegos, agregarlos a favoritos o carrito, y llevar un control de tus títulos preferidos.
        </p>
        
      </section>

      {/* ¿Cómo funciona? */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-zinc-800 dark:text-zinc-100 mb-6">¿Cómo funciona?</h2>
        <ol className="list-decimal list-inside text-lg space-y-3 text-zinc-700 dark:text-zinc-300">
          <li>Regístrate o inicia sesión en tu cuenta</li>
          <li>Explora nuestro catálogo de juegos</li>
          <li>Agrega juegos a favoritos o carrito</li>
          <li>Consulta tus datos desde tu panel personal</li>
        </ol>
      </section>

      {/* CTA final */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">¿Listo para comenzar?</h2>
        <p className="text-zinc-600 dark:text-zinc-400">Explora juegos, guarda tus favoritos y vive tu pasión.</p>
        <Link
          href="/games"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
        >
          Ir al catálogo
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white mt-12 p-6 text-center rounded-xl">
        <p className="text-sm">&copy; {new Date().getFullYear()} Fireplay. Todos los derechos reservados.</p>
        <div className="mt-3 flex justify-center gap-6 text-sm">
          <Link href="/contact" className="hover:underline">Contacto</Link>
          <Link href="/info" className="hover:underline">Información</Link>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline">Twitter</a>
        </div>
      </footer>
    </div>
  );
}
