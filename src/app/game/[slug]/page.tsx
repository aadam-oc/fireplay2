'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchGameDetails } from '@/lib/fetchGameDetails';

export default function GameDetailsPage() {
  const { slug } = useParams();
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    // Verificamos si slug es un arreglo o una cadena y lo manejamos como una cadena
    const gameSlug = Array.isArray(slug) ? slug[0] : slug;

    if (gameSlug) {
      const loadGameDetails = async () => {
        const data = await fetchGameDetails(gameSlug);
        setGame(data);
      };
      loadGameDetails();
    }
  }, [slug]);

  if (!game) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold">{game.name}</h1>
      <img src={game.background_image} alt={game.name} className="w-full h-64 object-cover" />
      <p>{game.description}</p>
      <button className="bg-blue-600 text-white p-2 mt-4">Añadir al carrito</button>
    </div>
  );
}
