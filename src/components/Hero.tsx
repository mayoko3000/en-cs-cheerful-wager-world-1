
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      
      // Increased parallax effect strength for more noticeable motion
      const strength = 40;
      
      // Apply movement to background
      heroRef.current.style.setProperty('--x', `${(x - 0.5) * strength}px`);
      heroRef.current.style.setProperty('--y', `${(y - 0.5) * strength}px`);
    };
    
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden cyberpunk-grid bg-gray-900"
      style={{ 
        backgroundPosition: 'calc(50% + var(--x, 0px)) calc(50% + var(--y, 0px))',
      }}
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.15),transparent_70%)]" />
      
      {/* Cyberpunk grid lines */}
      <div className="absolute inset-0 cyberpunk-grid" />
      
      {/* Animated neon particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 12 + 4}px`,
              height: `${Math.random() * 12 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#0EA5E9' : i % 3 === 1 ? '#8B5CF6' : '#F97316',
              boxShadow: i % 3 === 0 ? '0 0 10px #0EA5E9' : i % 3 === 1 ? '0 0 10px #8B5CF6' : '0 0 10px #F97316',
              animation: `float ${Math.random() * 8 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-casino-dark text-casino-highlight text-sm font-bold mb-6 neon-border animate-pulse">
            NETRUNNER GAMING PROTOCOL V2.0
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="neon-text">ENTER</span> THE
            </span> 
            <span className="relative block glitch" data-text="CYBER CASINO">
              <span className="bg-gradient-to-r from-casino-neon via-casino-blue to-casino-purple bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                CYBER CASINO
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-casino-neon to-casino-purple rounded-full transform scale-x-0 animate-[scale-in_0.8s_0.7s_forwards]"></span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Experience future gaming in our digital playground. No credits required, just pure neon-drenched entertainment.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <Button
              size="lg"
              className="bg-casino-blue hover:bg-casino-highlight text-white transition-all duration-300 transform hover:scale-105 neon-border group animate-pulse-soft"
            >
              JACK IN NOW
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-casino-purple hover:border-casino-neon text-casino-purple hover:text-casino-neon transition-all duration-300 hover:-rotate-1"
              asChild
            >
              <Link to="/games">
                BROWSE GAMES
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent z-10" />
    </div>
  );
};

export default Hero;

