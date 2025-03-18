
import { useRef, useEffect } from 'react';

export const useSound = (soundEnabled: boolean) => {
  const dealSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);
  const loseSound = useRef<HTMLAudioElement | null>(null);
  const cardSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    dealSound.current = new Audio('/sounds/deal.mp3');
    winSound.current = new Audio('/sounds/win.mp3');
    loseSound.current = new Audio('/sounds/lose.mp3');
    cardSound.current = new Audio('/sounds/card.mp3');
    
    return () => {
      dealSound.current = null;
      winSound.current = null;
      loseSound.current = null;
      cardSound.current = null;
    };
  }, []);

  const playSound = (sound: HTMLAudioElement | null) => {
    if (soundEnabled && sound) {
      sound.currentTime = 0;
      sound.play().catch(e => console.error("Error playing sound:", e));
    }
  };

  return {
    dealSound,
    winSound,
    loseSound,
    cardSound,
    playSound
  };
};
