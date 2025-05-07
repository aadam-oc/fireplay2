'use client';

import { useCart } from '@/context/CartContext';
import { Game } from '@/types/game';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const total = cartItems.reduce((sum, game) => sum + (game.rating * 10 + 20), 0);
  const [error] = useState<string | null>(null);

  if (error) {
    return <p>Ha ocurrido un error: {error}</p>;
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-8 text-zinc-900 dark:text-zinc-100">Tu carrito</h1>

      {!cartItems || cartItems.length === 0 ? (
        <p className="text-center text-lg text-zinc-700 dark:text-zinc-300">No hay juegos en el carrito.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((game: Game) => (
            <div key={game.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <div>
                  <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">{game.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Precio: ${(game.rating * 10 + 20).toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(game.id)}
                className="text-red-600 hover:text-red-800 transition duration-300"
              >
                Eliminar
              </button>
            </div>
          ))}

          {/* Total y botones */}
          <div className="text-right mt-6">
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Total: ${total.toFixed(2)}</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={clearCart}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 transition duration-300"
              >
                Vaciar carrito
              </button>
              <button
                onClick={() => alert('Compra simulada')}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-300"
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function useState<T>(arg0: null): [any, any] {
  throw new Error('Function not implemented.');
}

