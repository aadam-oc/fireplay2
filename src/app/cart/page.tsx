// src/app/cart/page.tsx

'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(game => (
            <div key={game.id} className="p-4 border rounded">
              <h2 className="text-lg font-semibold">{game.name}</h2>
              <img src={game.background_image} alt={game.name} className="w-64 h-40 object-cover" />
              <p>Rating: {game.rating}</p>
              <button
                onClick={() => removeFromCart(game.id)}  // Llama a removeFromCart con el id del juego
                className="mt-2 text-red-500"
              >
                Quitar del carrito
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
