
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlayCircle, Ship } from 'lucide-react';

interface GameCardImageProps {
  title: string;
  image: string;
  popular?: boolean;
  isHovered: boolean;
  loadingImage: boolean;
  gameId?: string;
}

const GameCardImage = ({ title, image, popular = false, isHovered, loadingImage, gameId = "fortune-wheel" }: GameCardImageProps) => {
  const shineRef = useRef<HTMLDivElement>(null);

  if (isHovered && shineRef.current) {
    shineRef.current.style.opacity = '1';
    shineRef.current.style.left = '-100%';
    shineRef.current.animate(
      [
        { left: '-100%', opacity: 0.3 },
        { left: '200%', opacity: 0.6 },
        { left: '200%', opacity: 0 }
      ],
      {
        duration: 1200,
        easing: 'ease-in-out',
        fill: 'forwards'
      }
    );
  }

  const isPirateImage = image.includes('b5d0018a-982e-4a09-afd8-d5af11493e37') || image.includes('6adef3ca-2e71-44d2-bfb9-2e160a04122b');
  const isPokerGame = title.toLowerCase().includes('poker') || gameId === 'texas-holdem';
  const isBlackjackGame = title.toLowerCase().includes('blackjack') || gameId === 'blackjack';
  const isFortuneWheelGame = title.toLowerCase().includes('fortune') || title.toLowerCase().includes('wheel') || gameId === 'fortune-wheel';

  const targetGameId = isPokerGame ? 'texas-holdem' :
    isPirateImage ? 'slots' : 
    isBlackjackGame ? 'blackjack' :
    isFortuneWheelGame ? 'fortune-wheel' :
    gameId || 
    title.toLowerCase().includes('slot') ? 'slots' :
    title.toLowerCase().includes('roulette') ? 'roulette' :
    'fortune-wheel';

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
      {loadingImage ? (
        <div className="w-full h-full bg-slate-200 animate-pulse" />
      ) : (
        <img 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isPirateImage ? 'scale-[1.05]' : ''}`}
          style={{ 
            transform: isHovered ? 'scale(1.08)' : isPirateImage ? 'scale(1.05)' : 'scale(1)',
            objectPosition: isPirateImage ? 'center 20%' : 'center' 
          }}
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-300" 
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      
      {isPirateImage && !isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-100"></div>
      )}
      
      <div 
        ref={shineRef}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 pointer-events-none"
        style={{ 
          transform: 'skewX(-20deg)',
          width: '150%',
          transition: 'opacity 0.3s ease'
        }}
      />
      
      {popular && !isPirateImage && (
        <div className="absolute top-3 left-3 bg-casino-highlight text-white text-xs font-medium px-2 py-1 rounded-full animate-pulse-soft">
          Popular
        </div>
      )}
      
      {isPirateImage && (
        <>
          {popular && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-yellow-400 animate-pulse-soft flex items-center gap-1">
              <Ship className="w-3 h-3" />
              Popular
            </div>
          )}
        </>
      )}
      
      {isPirateImage && !isHovered && (
        <div className="absolute bottom-4 left-4 right-4 text-white text-lg font-bold drop-shadow-lg flex items-center">
          <Ship className="w-5 h-5 mr-2" />
          {title}
        </div>
      )}
      
      <div 
        className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-8 opacity-0 transition-all duration-500"
        style={{ 
          transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
          opacity: isHovered ? 1 : 0
        }}
      >
        <Link to={`/play?game=${targetGameId}`} state={{ gameType: targetGameId }}>
          <Button 
            className={`w-full hover:bg-casino-highlight hover:text-white transition-all duration-500 font-medium group relative overflow-hidden 
              ${isPirateImage ? 'bg-white text-casino-dark border-2 border-yellow-400' : 'bg-white text-casino-dark'} 
              ${isPokerGame ? 'bg-green-600 text-white hover:bg-green-700' : ''}
              ${isBlackjackGame ? 'bg-red-800 text-white hover:bg-red-900' : ''}
              ${isFortuneWheelGame ? 'bg-amber-500 text-white hover:bg-amber-600' : ''}
            `}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-casino-highlight/10 to-casino-highlight/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            {isPirateImage ? (
              <Ship className="mr-2 h-5 w-5 transform group-hover:scale-125 transition-transform duration-300" style={{ transform: 'scaleX(-1)' }} />
            ) : isPokerGame ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 transform group-hover:scale-125 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l2.2 6.27L20 9.46l-4.5 4.1 1.34 6.44L12 17.34 7.16 20l1.34-6.44L4 9.46l5.8-1.19z"/>
              </svg>
            ) : isBlackjackGame ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 transform group-hover:scale-125 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.4 7.8C15.5 5.9 7.4 5.9 5.6 7.8 4.7 8.7 4.7 10.1 5.6 11L12 17.4 18.4 11C19.3 10.1 19.2 8.7 17.4 7.8Z"/>
                <path d="M8.3 12.8C7.4 11.9 7.4 10.5 8.3 9.6 10.2 7.7 18.3 7.7 20.1 9.6 21 10.5 21 11.9 20.1 12.8L13.7 19.2 7.3 12.8C6.4 11.9 6.5 10.5 8.3 9.6"/>
              </svg>
            ) : isFortuneWheelGame ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 transform group-hover:rotate-90 transition-transform duration-500" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
                <line x1="12" y1="8" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="16" x2="12" y2="20" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2"/>
              </svg>
            ) : (
              <PlayCircle className="mr-2 h-4 w-4 transform group-hover:scale-125 transition-transform duration-300 animate-pulse" />
            )}
            <span className="relative z-10">
              {isPirateImage ? 'Board Ship! ☠️' : 
               isPokerGame ? 'Deal Me In!' : 
               isBlackjackGame ? 'Hit the Table!' : 
               isFortuneWheelGame ? 'Spin to Win!' : 
               'Play Now'}
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GameCardImage;
