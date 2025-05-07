'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function DashboardPage() {
  const { cartItems } = useCart();
  const { favoriteItems } = useFavorites();
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
// Si no usas `error`, elimina la declaración:
const [error, setError] = useState<string | null>(null);

// O si realmente necesitas manejar el error:
if (error) {
  return <p>Ha ocurrido un error: {error}</p>;
}
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const q = query(collection(db, 'messages'), where('email', '==', currentUser.email));
        const snapshot = await getDocs(q);
        const userMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(userMessages);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <p className="text-center py-10">Debes iniciar sesión para ver tu panel.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
          {user.displayName?.[0] || user.email?.[0]}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user.displayName || 'Usuario sin nombre'}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-3">🛒 Carrito</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">No hay juegos en el carrito.</p>
        ) : (
          <ul className="list-disc ml-6 space-y-1">
            {cartItems.map(game => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-3">⭐ Favoritos</h3>
        {favoriteItems.length === 0 ? (
          <p className="text-gray-500">No tienes juegos favoritos.</p>
        ) : (
          <ul className="list-disc ml-6 space-y-1">
            {favoriteItems.map(game => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">📨 Mensajes enviados</h3>
        {messages.length === 0 ? (
          <p className="text-gray-500">No has enviado mensajes.</p>
        ) : (
          <ul className="space-y-3">
            {messages.map(msg => (
              <li key={msg.id} className="border rounded p-3 bg-gray-50">
                <p><strong>Mensaje:</strong> {msg.message}</p>
                <p className="text-sm text-gray-500">
                  Fecha: {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleString() : 'Desconocida'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
