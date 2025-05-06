// src/app/games/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { fetchGames } from '@/lib/fetchGames'; // Esta es una función personalizada para obtener juegos de la API
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; // Aquí estamos importando el contexto

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  slug: string;
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Usamos el hook para acceder a la función addToCart

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGames();
      setGames(data);
      setLoading(false);
    };
    loadGames();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Catálogo de Juegos</h1>
      {loading ? <p>Cargando...</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map(game => (
            <div key={game.id} className="border p-4">
              <h2 className="font-semibold">{game.name}</h2>
              <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover" />
              <p className="mt-2">Rating: {game.rating}</p>
              <Link href={`/game/${game.slug}`} className="text-blue-500">Ver detalles</Link>
              <button
                onClick={() => addToCart(game)} // Llamamos a la función addToCart desde el contexto
                className="mt-2 px-4 py-1 bg-green-600 text-white rounded"
              >
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
