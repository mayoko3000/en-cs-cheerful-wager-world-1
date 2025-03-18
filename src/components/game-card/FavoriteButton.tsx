
import { useState } from 'react';
import { Heart } from 'lucide-react';

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    // Animate heart
    const heartButton = e.currentTarget as HTMLButtonElement;
    heartButton.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.5)' },
        { transform: 'scale(1)' }
      ],
      {
        duration: 500,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    );
  };

  return (
    <button 
      onClick={toggleFavorite} 
      className={`transition-all duration-300 ${isFavorite ? 'text-red-500 scale-110' : 'text-gray-400'} hover:scale-125`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current animate-ping-once' : ''}`} />
    </button>
  );
};

export default FavoriteButton;
