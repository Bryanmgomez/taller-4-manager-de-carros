import { useState, useEffect } from 'react';

interface GiphyImageProps {
  name: string; // Marca del vehículo para buscar GIF relacionado
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop';

/**
 * Componente GiphyImage
 * Muestra un GIF relacionado con la marca del vehículo usando la API de Giphy.
 * - Usa variable de entorno VITE_GIPHY_API_KEY para la clave API
 * - Si no hay clave o no hay resultados, muestra una imagen alternativa
 * - La aplicación sigue funcionando normalmente sin API Key configurada
 */
const GiphyImage = ({ name }: GiphyImageProps) => {
  const [imageUrl, setImageUrl] = useState<string>(FALLBACK_IMAGE);
  const [loading, setLoading] = useState<boolean>(false);
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

  useEffect(() => {
    const fetchGif = async () => {
      // Si no hay API Key configurada, usar imagen alternativa
      if (!apiKey || apiKey.trim() === '') {
        setImageUrl(FALLBACK_IMAGE);
        return;
      }

      setLoading(true);
      try {
        // Buscar GIF relacionado con la marca del vehículo
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
            name
          )}&limit=1&rating=g`
        );
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          // Usar el GIF encontrado
          setImageUrl(data.data[0].images.fixed_height.url);
        } else {
          // Si no hay resultados, usar imagen alternativa
          setImageUrl(FALLBACK_IMAGE);
        }
      } catch (error) {
        console.error('Error al obtener GIF de Giphy:', error);
        // En caso de error, usar imagen alternativa
        setImageUrl(FALLBACK_IMAGE);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchGif();
    }
  }, [name, apiKey]);

  return (
    <div className="giphy-container">
      {loading ? (
        <div className="giphy-loading">Cargando imagen...</div>
      ) : (
        <img
          src={imageUrl}
          alt={`GIF relacionado con ${name}`}
          className="car-gif"
          onError={() => {
            // Fallback si la imagen falla al cargar
            setImageUrl(FALLBACK_IMAGE);
          }}
        />
      )}
    </div>
  );
};

export default GiphyImage;
