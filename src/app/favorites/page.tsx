'use client';

import { useFavorites } from '@/context/FavoritesContext';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favoriteItems, removeFromFavorites } = useFavorites();
// Si no usas `error`, elimina la declaración:
const [error] = useState<string | null>(null);

// O si realmente necesitas manejar el error:
if (error) {
  return <p>Ha ocurrido un error: {error}</p>;
}
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-8">Tus juegos favoritos</h1>

      {favoriteItems.length === 0 ? (
        <div className="text-center text-lg text-zinc-600 dark:text-zinc-400">
          <p>No tienes juegos en tus favoritos.</p>
          <Link href="/games" className="text-blue-600 hover:text-blue-800 transition-colors">
            Explora juegos
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {favoriteItems.map((game) => (
            <div
              key={game.id}
              className="flex items-center justify-between bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center gap-6">
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{game.name}</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Rating: {game.rating}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromFavorites(game.id)}
                className="text-red-600 hover:text-red-800 transition-colors text-sm font-medium"
              >
                Eliminar de favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function useState<T>(arg0: null): [any, any] {
  throw new Error('Function not implemented.');
}

