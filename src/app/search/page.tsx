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

export default function SearchPage() {
  const [games, setGames] = useState<Game[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const { addToCart } = useCart(); 
  const { addToFavorites } = useFavorites();

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGames();
      setGames(data);
      setLoading(false);
    };
    loadGames();
  }, []);

  return (
    <div className="px-4 md:px-12 py-10">
      <h1 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-6">
        Resultados de Búsqueda
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {loading ? (
        <div className="text-center text-xl text-zinc-500">Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.length === 0 ? (
            <div className="col-span-full text-center text-lg text-zinc-500">
              No se encontraron juegos para esa búsqueda.
            </div>
          ) : (
            filteredGames.map((game) => (
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
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {game.name}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-2">Rating: {game.rating}</p>
                  <div className="mt-4 flex flex-col gap-3">
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
                    <button
                      onClick={() => addToFavorites(game)}
                      className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-all duration-200"
                    >
                      Añadir a favoritos
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
