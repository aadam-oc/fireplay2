'use client';

import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { useEffect, useState } from 'react';

export function Footer() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  

    return (
      <footer className="bg-gray-900 text-white p-4 text-center mt-10">
        <p>&copy; {new Date().getFullYear()} Fireplay. Todos los derechos reservados.</p>
        <div className="mt-2 space-x-4">
          <a href="/contact" className="hover:underline">Contacto</a>
          <a href="/info" className="hover:underline">Información</a>
        </div>
        {user ? (
            <>
              <span className="ml-2">Hola, {user.displayName || user.email}</span>
            </>
          ) : (
            <>
              <Link href="/login">Entrar</Link>
              <Link href="/register">Registro</Link>
            </>
          )}
      </footer>
    );
  }
  