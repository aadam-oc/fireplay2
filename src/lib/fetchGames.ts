// lib/fetchGames.ts

export const fetchGames = async () => {
    try {
      const apiKey = '5b460f329570497896d199a93ada88bd'; 
      const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`);
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error al obtener juegos:', error);
      return [];
    }
  };
  