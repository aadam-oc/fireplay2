// src/components/Header.tsx

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Fireplay
        </Link>
        <nav className="space-x-4">
          <Link href="/games" className={pathname === '/games' ? 'underline' : ''}>Todos los juegos</Link>
          <Link href="/search" className={pathname === '/search' ? 'underline' : ''}>Buscar Juegos</Link> {/* Nuevo enlace */}
          <Link href="/favorites" className={pathname === '/favorites' ? 'underline' : ''}>Favoritos</Link>
          <Link href="/contact" className={pathname === '/contact' ? 'underline' : ''}>Contacto</Link>
          <Link href="/cart" className={pathname === '/cart' ? 'underline' : ''}>Carrito</Link>
          {user ? (
            <>
              <Link href="/dashboard" className={pathname === '/dashboard' ? 'underline' : ''}>

              <span className="ml-2">Hola, {user.displayName || user.email}</span></Link>
              <button onClick={handleLogout} className="ml-4 underline">Salir</button>
            </>
          ) : (
            <>
              <Link href="/login">Entrar</Link>
              <Link href="/register">Registro</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
