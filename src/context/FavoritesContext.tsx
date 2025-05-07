'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Game } from '@/types/game';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

type FavoritesContextType = {
  favoriteItems: Game[];
  addToFavorites: (game: Game) => void;
  removeFromFavorites: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteItems, setFavoriteItems] = useState<Game[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // 👈

  // Detectar usuario logueado y cargar favoritos
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'favorites', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFavoriteItems(docSnap.data().items || []);
        }
      } else {
        const localData = localStorage.getItem('favorites');
        if (localData) {
          setFavoriteItems(JSON.parse(localData));
        }
      }
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (user) {
      const saveToFirestore = async () => {
        const docRef = doc(db, 'favorites', user.uid);
        await setDoc(docRef, { items: favoriteItems }, { merge: true });
        console.log('Favoritos guardados para:', user.uid);
      };
      saveToFirestore();
    } else {
      localStorage.setItem('favorites', JSON.stringify(favoriteItems));
    }
  }, [favoriteItems, user, loading]); 

  const addToFavorites = (game: Game) => {
    setFavoriteItems(prev => {
      if (!prev.find(item => item.id === game.id)) {
        return [...prev, game];
      }
      return prev;
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavoriteItems(prev => prev.filter(game => game.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favoriteItems, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};
