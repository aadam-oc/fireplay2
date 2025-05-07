'use client';

import { useEffect, useState } from 'react';
import { fetchGames } from '@/lib/fetchGames';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

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
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, favoriteItems } = useFavorites();

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGames();
      setGames(data);
      setLoading(false);
    };
    loadGames();
  }, []);

  const isFavorite = (gameId: number) => favoriteItems.some((game) => game.id === gameId);

  const handleFavoriteToggle = (game: Game) => {
    if (isFavorite(game.id)) {
      removeFromFavorites(game.id);
    } else {
      addToFavorites(game);
    }
  };

  return (
    <div className="px-4 md:px-12 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-zinc-900 dark:text-zinc-100">
        Catálogo de Juegos
      </h1>
      {loading ? (
        <div className="text-center text-xl text-zinc-500">Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="relative bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{game.name}</h2>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2">Rating: {game.rating}</p>
                <div className="mt-4 flex gap-4">
                <Link
                      href={`/product-sheet/${game.slug}`}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      Ver detalles
                    </Link>
                  <button
                    onClick={() => addToCart(game)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200"
                  >
                    Añadir al carrito
                  </button>
                </div>
                <button
                  onClick={() => handleFavoriteToggle(game)}
                  className="absolute top-2 right-2 p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition-all duration-300"
                >
                  {isFavorite(game.id) ? (
                    <span className="text-xs">♥</span>
                  ) : (
                    <span className="text-xs">♡</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
