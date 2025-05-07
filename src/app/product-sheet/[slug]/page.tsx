'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchGameDetails } from '@/lib/fetchGameDetails';
import { useCart } from '@/context/CartContext';

export default function ProductSheetPage() {
  const { slug } = useParams();
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchGameDetails(slug as string);
        setGame(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) loadDetails();
  }, [slug]);

  if (loading) return <p className="p-6">Cargando...</p>;
  if (!game) return <p className="p-6 text-red-600">No se encontró el juego.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-3xl font-bold">{game.name}</h1>

      <img
        src={game.background_image}
        alt={game.name}
        className="w-full rounded-lg object-cover h-64"
      />

      <section>
        <h2 className="text-xl font-semibold mb-2">Descripción</h2>
        <div dangerouslySetInnerHTML={{ __html: game.description }} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Requisitos</h2>
        <p>{game.platforms?.map((p: any) => p.platform.name).join(', ')}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Etiquetas</h2>
        <div className="flex flex-wrap gap-2">
          {game.tags?.slice(0, 10).map((tag: any) => (
            <span key={tag.id} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              {tag.name}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Opiniones</h2>
        <ul className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <li key={i} className="text-sm text-gray-700">
              ⭐⭐⭐⭐☆ — “Juego muy entretenido y bien optimizado.”
            </li>
          ))}
        </ul>
      </section>

      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-green-600">${(game.rating * 10 + 20).toFixed(2)}</p>
        <button
          onClick={() => addToCart(game)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
