'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Game } from '@/types/game';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

type CartContextType = {
  cartItems: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Game[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'carts', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const firestoreCart = docSnap.data().items || [];
          if (JSON.stringify(cartItems) !== JSON.stringify(firestoreCart)) {
            setCartItems(firestoreCart);
          }
        }
      } else {
        const localData = localStorage.getItem('cart');
        if (localData) {
          setCartItems(JSON.parse(localData));
        }
      }
    });

    return () => unsubscribe();
  }, []);

useEffect(() => {
    if (user) {
      const saveToFirestore = async () => {
        const docRef = doc(db, 'carts', user.uid);
        const docSnap = await getDoc(docRef);
        const firestoreCart = docSnap.exists() ? docSnap.data().items : [];

        if (JSON.stringify(cartItems) !== JSON.stringify(firestoreCart)) {
          console.log('Guardando carrito en Firestore...');
          await setDoc(docRef, { items: cartItems });
          console.log('Carrito guardado en Firestore con éxito');
        } else {
          console.log('No se guardaron cambios en Firestore, el carrito es el mismo');
        }
      };
      saveToFirestore();
    } else {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = (game: Game) => {
    setCartItems(prev => {
      if (!prev.find(item => item.id === game.id)) {
        return [...prev, game];
      }
      return prev;
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(game => game.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};