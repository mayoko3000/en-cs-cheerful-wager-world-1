
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GameCardImage from './GameCardImage';
import GameCardInfo from './GameCardInfo';
import { GameCardProps } from './types';

const GameCard = (props: GameCardProps) => {
  const { title, image, players, category, popular = false, gameId } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setLoadingImage(false);
  }, [image]);
  
  // Start animation automatically every 8 seconds
  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;
    
    const interval = setInterval(() => {
      if (!isHovered) {
        setIsAnimating(true);
        
        // Apply slight floating animation
        cardElement.style.transform = 'translateY(-8px) scale(1.03)';
        
        // Reset animation after 1.5 seconds
        setTimeout(() => {
          cardElement.style.transform = 'translateY(0) scale(1)';
          setIsAnimating(false);
        }, 1500);
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isHovered]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isAnimating) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    // Enhanced rotation effect for more pronounced motion
    const rotateY = ((x - 0.5) * 8).toFixed(2); // -4 to 4 degrees
    const rotateX = ((0.5 - y) * 8).toFixed(2); // -4 to 4 degrees
    
    cardRef.current.style.transform = 
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };
  
  const resetStyles = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };
  
  return (
    <div 
      className="casino-card h-full group"
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        resetStyles();
      }}
      style={{ 
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
      }}
    >
      <GameCardImage 
        title={title}
        image={image}
        popular={popular}
        isHovered={isHovered}
        loadingImage={loadingImage}
        gameId={gameId || (title.includes("Texas") ? "texas-holdem" : undefined)}
      />
      
      <GameCardInfo 
        title={title}
        category={category}
        players={players}
      />
    </div>
  );
};

export default GameCard;
