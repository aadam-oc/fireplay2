// src/context/CartContext.tsx

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Game } from '@/types/game';

type CartContextType = {
  cartItems: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: number) => void;  // Añadir la función para eliminar juegos
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Game[]>([]);

  // Función para agregar un juego al carrito
  const addToCart = (game: Game) => {
    setCartItems(prev => [...prev, game]); // Agrega el juego al carrito
  };

  // Función para eliminar un juego del carrito
  const removeFromCart = (gameId: number) => {
    setCartItems(prev => prev.filter(game => game.id !== gameId));  // Filtra el juego con el id especificado
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
