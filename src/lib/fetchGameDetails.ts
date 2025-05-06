// lib/fetchGameDetails.ts
export const fetchGameDetails = async (slug: string) => {
    const apiKey = '5b460f329570497896d199a93ada88bd'; // tu API key
    const response = await fetch(`https://api.rawg.io/api/games/${slug}?key=${apiKey}`);
  
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  };
  